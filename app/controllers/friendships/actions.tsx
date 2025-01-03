"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


// return true ou false si une requete d'ami existe
export async function isFriendShip(userId: string, friendId: string) {
 const session = await auth();

    if (!session) {
      throw new Error("You must be authenticated to check if a friendship exists");
    }

    // Vérifiez si la demande d'ami existe déjà
    const existingFriendship = await prisma.friendship.findUnique({
      where: {
        friendId_friendOfId: {
          friendId: friendId,
          friendOfId: userId
        }
      }
    });

    return !!existingFriendship;
  }




// Fonction pour envoyer une demande d'ami
export async function sendFriendRequest(userId: string, friendId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be authenticated to send a friend request");
  }

  // Vérifiez si la demande d'ami existe déjà
  const existingFriendship = await prisma.friendship.findUnique({
    where: {
      friendId_friendOfId: {
        friendId: friendId,
        friendOfId: userId
      }
    }
  });

  if (existingFriendship) {
    throw new Error("Friend request already sent");
  }

  // Créez une nouvelle demande d'ami
  await prisma.friendship.create({
    data: {
      friendId: friendId,
      friendOfId: userId,
      status: 'pending'
    }
  });

  redirect("/friends");
}
