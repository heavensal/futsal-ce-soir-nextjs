import { auth } from "@/lib/auth";

// UI Components
import HOne from "@/components/title/H1";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <HOne title="Mon Profil" />

      <div className="flex justify-center">
        <Image
          src={session.user.image}
          alt={session.user.name}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>

      <p className="text-center">Bienvenue {session.user.name}</p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <p className="text-right">Email</p>
        <p className="text-left">{session.user.email}</p>

        <p className="text-right">Prénom</p>
        <p className="text-left">{session.user.firstName ? session.user.firstName : "Non renseigné"}</p>

        <p className="text-right">Nom</p>
        <p className="text-left">{session.user.lastName ? session.user.lastName : "Non renseigné"}</p>

        <p className="text-right">Pseudo</p>
        <p className="text-left">{session.user.username ? session.user.username : "Non renseigné"}</p>
      </div>

      <div className="my-8">
        <h2 className="text-center">Mes événements</h2>
        <ul className="flex justify-center space-x-2">
          <li>
            <Link href="/events/create" className="btn px-2 py-1 bg-yellow-600 border-yellow-800 border-2">
              Créer un événement
            </Link>
          </li>
          <li>
            <Link href="/events" className="btn px-2 py-1 bg-blue-600 border-blue-800 border-2">
              Voir Mes événements
            </Link>
          </li>
        </ul>
      </div>



    </div>
  );
}
