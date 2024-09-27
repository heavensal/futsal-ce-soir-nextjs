import { updateUser } from "@/app/controllers/users/actions";
import HOne from "@/components/title/H1";
import { auth } from "@/lib/auth";

export default async function DashboardEditPage( ) {
  const session = await auth();
  const updateUserId = updateUser.bind(null, session.user.id);

  return (
    <>
      <HOne title="Modifier mon profil" />

      <form action={updateUserId} className="px-2 pb-4">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Prénom de l'utilisateur */}
            <div className="sm:col-span-2">
              <label htmlFor="firstName" className="mb-2 block font-medium text-gray-900 dark:text-white">
                Prénom
              </label>
              <input type="text" name="firstName" id="firstName" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="Prénom" defaultValue={session?.user.firstName} required />
            </div>

            {/* Nom de l'utilisateur */}
            <div className="w-full">
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Nom
              </label>
              <input type="text" name="lastName" id="lastName" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-600 focus:ring-yellow-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500" placeholder="Nom" defaultValue={session?.user.lastName} required />
            </div>


            {/* Privé ou Public */}
            {/* <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            </div> */}

          </div>

          <div className="flex justify-center">
            <button type="submit" className="mt-4 rounded-lg bg-green-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 sm:mt-6">
                Modifier mon profil
            </button>
          </div>

        </form>
    </>

  );
}
