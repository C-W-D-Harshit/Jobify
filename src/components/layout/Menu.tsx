import Link from "next/link";
import React from "react";

const menuItems = [
  {
    label: "Find job",
    href: "/",
  },
  {
    label: "Messages",
    href: "/messages",
  },
  {
    label: "Upload Job",
    href: "/upload-job",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

export default function Menu() {
  return (
    <div className="lg:flex hidden items-center gap-10 -ml-12 mr-8">
      {menuItems.map((item, index) => {
        if (item.href === "/") {
          return (
            <Link href={item.href} key={index}>
              <div>
                <p className="font-medium">{item.label}</p>
              </div>
            </Link>
          );
        } else {
          return (
            <Link href={item.href} key={index}>
              <div>
                <p className="font-medium">{item.label}</p>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
