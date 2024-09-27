// "use client"

import { showEvent, destroyEvent } from "@/app/controllers/events/actions";
import StartTime from "@/components/events/StartTime";
// import { useState, useEffect } from "react";


interface Params {
  id: string;
}


export default async function OneEventIDPage({ params }: { params: Params }) {
  const event = await showEvent(params.id);
  // console.log(event);


  // const [event, setEvent] = useState(null);

  // useEffect(() => {
  //   showEvent(params.id).then((event) => {
  //     setEvent(event);
  //   });
  // }, [params.id]);

  return (
    <div>
      <h1 className="font-sans text-2xl text-center my-4">
        {event?.title} par {event?.creator?.name}
      </h1>

      <section className="container container-infoEvent px-2 mx-auto mb-4">
        <div>
          <table className="w-full text-center bg-green-800 rounded-lg">
            <tbody>
              <tr className="bg-green-700">
                <td className="border">Date</td>
                <td className="border">{event?.startTime ? StartTime({ startTime: event.startTime }) : "N/A"}</td>
              </tr>
              <tr>
                <td className="border">Lieu</td>
                <td className="border">{event?.location || "Veuillez contacter l'organisateur pour avoir l'adresse"} <br />
                voir l&apos;adresse</td>
              </tr>
              <tr className="bg-green-700">
                <td className="border">Joueurs</td>
                <td className="border">{event?.players.length} sur {event?.numberOfPlayers}</td>
              </tr>
              <tr>
                <td className="border">Prix</td>
                <td className="border">{event?.price} € par personne</td>
              </tr>
              <tr className="bg-green-700">
                <td className="border">Statut</td>
                <td className="border">{event?.privacy}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      <section className="container-teams grid grid-cols-4 gap-x-2 gap-y-4 px-2">

        <div className="team-1 bg-blue-800 border-2 border-blue-600 rounded-lg col-span-2">
          <h2 className="text-center text-xl my-1">
            {event?.teams[0].name}
          </h2>


          <ul className="text-center p-4 space-y-1">
            {event?.teams[0].players.map((player) => (
              <li className="bg-blue-600 rounded-md" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="text-center mb-1">
            <button className="btn-join-team px-2 py-1 bg-yellow-600 border-yellow-800 border-2">
              Rejoindre l&apos;équipe
            </button>
          </div>
        </div>

        <div className="team-2 bg-red-800 border-2 border-red-600 rounded-lg col-span-2">
          <h2 className="text-center text-xl my-1">{event?.teams[1].name}</h2>
          <ul className="text-center p-4 space-y-1">
            {event?.teams[1].players.map((player) => (
              <li className="bg-red-600 rounded-md" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="text-center mb-1">
            <button className="btn-join-team px-2 py-1 bg-yellow-600 border-yellow-800 border-2">
              Rejoindre l&apos;équipe
            </button>
          </div>
        </div>

        <div className="team-le-banc bg-gray-800 border-2 border-gray-600 rounded-lg col-start-2 col-span-2">

          <h2 className="text-center text-xl my-1">{event?.teams[2].name}</h2>

          <ul className="text-center p-4 space-y-1">
            {event?.teams[2].players.map((player) => (
              <li className="bg-gray-600 rounded-md" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="text-center mb-1">
            <button className="btn-join-team px-2 py-1 bg-yellow-600 border-yellow-800 border-2">
              Rejoindre l&apos;équipe
            </button>
          </div>

        </div>

      </section>

      <form className="text-center my-4"
      action={async () => {
        "use server";
        if (event?.id) {
          await destroyEvent(event.id);
        }
      }}
    >
      <button type="submit" className="bg-red-700 py-2 px-4 rounded-md hover:bg-red-600 transition duration-150">Supprimer l&apos;événement</button>
    </form>


    </div>
  );
}
