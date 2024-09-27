// Action: Create an event
import {createEvent} from "../controllers/events/actions";

// UI Components
import HOne from "@/components/title/H1";


export default async function CreateEventPage( ) {

  return (
    <>
      <main>
        <HOne title="Créer un événement Futsal"></HOne>

        <form action={createEvent} className="px-2 pb-4">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Titre de l'événement */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="mb-2 block font-medium text-gray-900 dark:text-white">
                Titre
              </label>
              <input type="text" name="title" id="title" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="Futsal ce soir par Moi" required />
            </div>

            {/* Lieu de l'événement */}
            <div className="w-full">
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Lieu de l&apos;événement
              </label>
              <input type="text" name="location" id="location" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="13 By Puma" required />
            </div>

            {/* Date de l'événement */}
            <div className="w-full">
              <label htmlFor="startTime" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Heure de l'événement</label>
              <input type="datetime-local" name="startTime" id="startTime" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder={Date.now().toString()} required />
            </div>

            {/* Nombre de joueurs maximum */}
            <div className="w-full">
              <label htmlFor="numberOfPlayers" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Nombre de joueurs maximum</label>
              <input type="number" name="numberOfPlayers" id="numberOfPlayers" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="10" required />
            </div>

            {/* Prix par joueur */}
            <div className="w-full">
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Prix par joueur</label>
              <input type="number" name="price" id="price" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="10.00 €" required />
            </div>

            {/* Privé ou Public */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Confidentialit&eacute; de l&apos;&eacute;v&eacute;nement
              </label>
              <div className="flex gap-4">
                <div>
                  <input type="radio" id="private" name="privacy" value="private" className="accent-yellow-600" required />
                  <label htmlFor="private" className="ml-2 text-sm text-gray-900 dark:text-white">Privé</label>
                </div>
                <div>
                  <input type="radio" id="public" name="privacy" value="public" className="accent-yellow-600" required />
                  <label htmlFor="public" className="ml-2 text-sm text-gray-900 dark:text-white">Public</label>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <button type="submit" className="mt-4 rounded-lg bg-green-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 sm:mt-6">
                Créer l&apos;événement
            </button>
          </div>

        </form>

      </main>
    </>

  );
}
