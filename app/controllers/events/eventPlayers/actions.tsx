"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';



// prisma
// model EventPlayer {
//   id          String    @id @default(cuid())
//   event       Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
//   eventId     String
//   player      User      @relation(fields: [playerId], references: [id], onDelete: Cascade)
//   playerId    String
//   team        EventTeam @relation(fields: [teamId], references: [id])
//   teamId      String

//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
// }

// sur l'event, tu peux choisir une équipe et Tu peux switch d'équipe à tout moment
// une méthode create or update pour choisir une équipe est pertinente
// CRUD


// CREATE UPDATE
export async function createOrUpdateEventPlayer(eventId: string, formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être authentifié pour rejoindre un événement ou changer d'équipe");
  }

  const playerId = session.user?.id as string;
  const teamId = formData.get("teamId") as string;

  // Vérifiez si le joueur est déjà inscrit à l'événement
  const existingEventPlayer = await prisma.eventPlayer.findFirst({
    where: {
      eventId: eventId,
      playerId: playerId
    }
  });

  if (existingEventPlayer) {
    // Mettre à jour l'équipe du joueur
    await prisma.eventPlayer.update({
      where: { id: existingEventPlayer.id },
      data: {
        teamId: teamId
      }
    });
  } else {
    // Créer un nouvel EventPlayer
    await prisma.eventPlayer.create({
      data: {
        eventId: eventId,
        playerId: playerId,
        teamId: teamId
      }
    });
  }

  revalidatePath(`/events/${eventId}`);
}

// DESTROY
export async function destroyEventPlayer(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être authentifié pour quitter un événement");
  }

  await prisma.eventPlayer.delete({
    where: { id: id }
  });

  revalidatePath(`/events`);
}
