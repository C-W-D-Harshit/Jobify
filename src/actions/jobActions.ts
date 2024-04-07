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

    if (filters.savedByUser) {
      where.savedByUsers = {
        some: { id: filters.savedByUser },
      };
    }

    // Conditionally add employmentType filter
    if (filters.employmentType) {
      where.employmentType = {
        in: filters.employmentType,
      };
    }

    if (filters.user) {
      where.users = {
        some: { id: filters.user },
      };
    }

    if (filters.userId) {
      where.userId = filters.userId;
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

export const applyJob = async (jobId: string, userId: string) => {
  try {
    // Check if the user has already applied for this job
    const existingApplication = await prisma.job.findUnique({
      where: {
        id: jobId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (existingApplication) {
      throw new Error("You have already applied for this job");
    }

    // Add the user to the list of users who applied for this job
    await prisma.job.update({
      where: { id: jobId },
      data: { users: { connect: { id: userId } } },
    });

    // Save the job application details (resume path, cover letter, etc.)
    // You can save this information in the same job record or in a separate table if needed

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const saveJob = async (jobId: string, userId: string) => {
  try {
    // Check if the job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
      throw new Error("Job not found");
    }

    // Check if the user has already saved this job
    const existingSavedJob = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    if (existingSavedJob) {
      throw new Error("You have already saved this job");
    }

    // Save the job for the user
    await prisma.savedJob.create({
      data: {
        userId,
        jobId,
      },
    });
    // asdad

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
