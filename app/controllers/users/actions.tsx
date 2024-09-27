"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateUser(id, formData) {
  const num = Math.floor(Math.random() * 9999)
  await prisma.user.update({
    where: { id : id },
    data: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: `${formData.get("firstName")}#${num}` || `user${num}`,
    }
  });

  redirect("/dashboard");
}
