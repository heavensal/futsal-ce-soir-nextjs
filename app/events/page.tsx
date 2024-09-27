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
              <label htmlFor="title" className="block mb-2 font-medium text-gray-900 dark:text-white">
                Titre
              </label>
              <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Futsal ce soir par Moi" required />
            </div>

            {/* Lieu de l'événement */}
            <div className="w-full">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lieu de l&apos;événement
              </label>
              <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="13 By Puma" required />
            </div>

            {/* Date de l'événement */}
            <div className="w-full">
              <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heure de l'événement</label>
              <input type="datetime-local" name="startTime" id="startTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={Date.now().toString()} required />
            </div>

            {/* Nombre de joueurs maximum */}
            <div className="w-full">
              <label htmlFor="numberOfPlayers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de joueurs maximum</label>
              <input type="number" name="numberOfPlayers" id="numberOfPlayers" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10" required />
            </div>

            {/* Prix par joueur */}
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix par joueur</label>
              <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10.00 €" required />
            </div>

            {/* Privé ou Public */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confidentialit&eacute; de l&apos;&eacute;v&eacute;nement
              </label>
              <div className="flex gap-4">
                <div>
                  <input type="radio" id="private" name="privacy" value="private" className="accent-primary-600" required />
                  <label htmlFor="private" className="ml-2 text-sm text-gray-900 dark:text-white">Privé</label>
                </div>
                <div>
                  <input type="radio" id="public" name="privacy" value="public" className="accent-primary-600" required />
                  <label htmlFor="public" className="ml-2 text-sm text-gray-900 dark:text-white">Public</label>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-950 rounded-lg hover:bg-blue-800">
                Créer l&apos;événement
            </button>
          </div>

        </form>

      </main>
    </>

  );
}
