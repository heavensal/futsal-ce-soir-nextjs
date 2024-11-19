"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PrivacyEvent } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

// prisma

// CRUD

// INDEX
export async function indexEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        creator: true,
        players: true,
      }
    });
    console.log("Les événements ont bien été récupérés");
    return events;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements", error);
  }
}

// SHOW
export async function showEvent(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id
      },
      include: {
        creator: true,
        teams: {
          include: {
            players: {
              include: {
                player: true
              }
            }
          }
        },
        players: true,
      }
    });
    return event;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements", error);
  }
}

// CREATE
export async function createEvent(formData: FormData) {
    const session = await auth();

    if (!session) {
      throw new Error("You must be authenticated to create an event");
    }

    if (session?.user?.id) {
      const event = await prisma.event.create({
        data: {
          title: formData.get("title") as string || "",
          location: formData.get("location") as string | null,
          startTime: new Date(formData.get("startTime") as string),
          numberOfPlayers: parseInt(formData.get("numberOfPlayers") as string),
          price: parseFloat(formData.get("price") as string) || 0,
          privacy: formData.get("privacy") as PrivacyEvent,
          creator: {
            connect: {
              id: session.user.id
            }
          },
        }
      });

      await prisma.eventTeam.createMany({
        data: [
          {
            name: "Equipe 1",
            eventId: event.id
          },
          {
            name: "Equipe 2",
            eventId: event.id
          },
          {
            name: "Sur le banc",
            eventId: event.id
          }
        ]
      });

      await prisma.eventPlayer.create({
        data: {
          playerId: session.user.id,
          eventId: event.id,
          teamId: (await prisma.eventTeam.findFirst({
            where: { name: "Equipe 1", eventId: event.id }
          }))?.id || ""
        }
      });

      revalidatePath("/events")
      redirect(`/events/${event.id}`);
    }
}

// UPDATE
export async function updateEvent(id: string, formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être authentifié ou être l'auteur pour mettre à jour un événement");
  }

  if (session?.user?.id) {
    await prisma.event.update({
      where: {
        id: id
      },
      data: {
        title: formData.get("title") as string || "",
        location: formData.get("location") as string | null,
        startTime: new Date(formData.get("startTime") as string),
        numberOfPlayers: parseInt(formData.get("numberOfPlayers") as string),
        price: parseFloat(formData.get("price") as string) || 0,
        privacy: formData.get("privacy") as PrivacyEvent,
      }
    });

    console.log("L'événement a bien été mis à jour");

    revalidatePath(`/events/${id}`)
    redirect(`/events/${id}`);
  }
}

// DESTROY
export async function destroyEvent(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be authenticated to delete an event");
  }

  if (session?.user?.id) {
    await prisma.event.delete({
      where: {
        id: id
      }
    });

    console.log("L'événement a bien été supprimé");

    revalidatePath("/")
    redirect(`/`);
  }
}
