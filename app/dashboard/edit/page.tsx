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
              <label htmlFor="firstName" className="block mb-2 font-medium text-gray-900 dark:text-white">
                Prénom
              </label>
              <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Prénom" defaultValue={session?.user.firstName} required />
            </div>

            {/* Nom de l'utilisateur */}
            <div className="w-full">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom
              </label>
              <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom" defaultValue={session?.user.lastName} required />
            </div>


            {/* Privé ou Public */}
            {/* <div className="w-full">
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
            </div> */}

          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-950 rounded-lg hover:bg-blue-800">
                Modifier mon profil
            </button>
          </div>

        </form>
    </>

  );
}
