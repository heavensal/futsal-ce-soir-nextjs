"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Fonction pour vérifier les collisions de username
async function generateUniqueUsername(firstName: string | null): Promise<string> {
  let username: string = "";
  let isUnique = false;

  while (!isUnique) {
    const num = Math.floor(Math.random() * 9999);
    username = `${firstName}#${num}`;

    // Vérifiez si le username existe déjà dans la base de données
    const existingUser = await prisma.user.findFirst({
      where: { username: username }
    });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return username;
}

export async function updateUser(id: string, formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be authenticated to update a user");
  }

  const firstName = formData.get("firstName") as string | null;
  if (!firstName) {
    throw new Error("First name is required");
  }
  const lastName = formData.get("lastName") as string;

  // Générer un username unique
  const username = await generateUniqueUsername(firstName);

  await prisma.user.update({
    where: { id: id },
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username,
    }
  });

  redirect("/dashboard");
}
