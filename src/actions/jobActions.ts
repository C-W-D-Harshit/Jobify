"use server";

import { prisma } from "@/lib/prisma/prisma";

export async function getJobs(
  filters: any = {},
  sortBy?: any,
  orderBy: any = {}
) {
  try {
    const where: any = {};

    if (filters.title) {
      where.title = {
        contains: filters.title,
        mode: "insensitive",
      };
    }

    if (filters.salary) {
      where.salary = filters.salary;
    }

    if (filters.experience) {
      where.experience = {
        contains: filters.experience,
        mode: "insensitive",
      };
    }

    if (filters.location) {
      where.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    // Conditionally add employmentType filter
    if (filters.employmentType) {
      where.employmentType = {
        in: filters.employmentType,
      };
    }

    // Conditionally add workingSchedule filter
    if (filters.workingSchedule) {
      where.workingSchedule = {
        in: filters.workingSchedule,
      };
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        [sortBy || "createdAt"]: orderBy[sortBy] || "desc",
      },
      include: {},
    });

    return jobs;
  } catch (error: any) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}

export async function getJobById(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
      include: {},
    });

    return job;
  } catch (error: any) {
    throw new Error(`Error fetching job: ${error.message}`);
  }
}

export const createJob = async (job: any) => {
  try {
    const newJob = await prisma.job.create({
      data: job,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Error creating job: ${error.message}`);
  }
};
