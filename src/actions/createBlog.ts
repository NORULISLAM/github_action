"use server";

import { Blog } from "@/types";

export const createBlog = async (data: Blog) => {
  const res = await fetch("http://localhost:5001/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const blogInfo = await res.json();
  return blogInfo;
};
