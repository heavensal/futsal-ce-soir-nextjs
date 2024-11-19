"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

// prisma
// eventTeams
// model EventTeam {
//   id          String    @id @default(cuid())
//   name        String
//   event       Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
//   eventId     String
//   players     EventPlayer[]

//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
// }
// les eventTeams sont créés lors de la création d'un événement
// la team est déjà destroy lors de la suppression d'un événement

// CRUD

// UPDATE
export async function updateEventTeam(id: string, formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être authentifié ou être l'auteur pour mettre à jour une équipe");
  }

  const name = formData.get("name") as string;
  if (!name) {
    throw new Error("Le nom de l'équipe ne peut pas être vide");
  }

  await prisma.eventTeam.update({
    where: { id: id },
    data: {
      name: name,
    }
  });

  revalidatePath(`/events/${id}`);
}
