"use client"

import { showEvent, destroyEvent } from "@/app/controllers/events/actions";
import { createOrUpdateEventPlayer, destroyEventPlayer } from "@/app/controllers/events/eventPlayers/actions";
import StartTime from "@/components/events/StartTime";
import { useState, useEffect } from "react";

interface Params {
  id: string;
}

export default function OneEventIDPage({ params }: { params: Params }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const eventData = await showEvent(params.id);
      setEvent(eventData);
      setLoading(false);
    }
    fetchEvent();
  }, [params.id]);

  async function handleJoinTeam(teamId) {
    await createOrUpdateEventPlayer(params.id, new FormData().append("teamId", teamId));
    const updatedEvent = await showEvent(params.id);
    setEvent(updatedEvent);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="my-4 text-center font-sans text-2xl">
        {event?.title} par {event?.creator?.name}
      </h1>

      <section className="container mx-auto mb-4 px-2" id="container-infoEvent">
        <div>
          <table className="w-full rounded-lg bg-green-800 text-center">
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

      <section className="grid grid-cols-4 gap-x-2 gap-y-4 px-2" id="container-teams">
        <div className="col-span-2 rounded-lg border-2 border-blue-600 bg-blue-800" id="team-1">
          <h2 className="my-1 text-center text-xl">
            {event?.teams[0].name}
          </h2>

          <ul className="space-y-1 p-4 text-center">
            {event?.teams[0].players.map((player) => (
              <li className="rounded-md bg-blue-600" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="mb-1 text-center">
            <button onClick={() => handleJoinTeam(event?.teams[0].id)} className="border-2 border-yellow-800 bg-yellow-600 px-2 py-1" id="btn-join-team-1">
              Rejoindre l&apos;équipe
            </button>
          </div>
        </div>

        <div className="col-span-2 rounded-lg border-2 border-red-600 bg-red-800" id="team-2">
          <h2 className="my-1 text-center text-xl">{event?.teams[1].name}</h2>
          <ul className="space-y-1 p-4 text-center">
            {event?.teams[1].players.map((player) => (
              <li className="rounded-md bg-red-600" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="mb-1 text-center">
            <button onClick={() => handleJoinTeam(event?.teams[1].id)} className="border-2 border-yellow-800 bg-yellow-600 px-2 py-1" id="btn-join-team-2">
              Rejoindre l&apos;équipe
            </button>
          </div>
        </div>

        <div className="col-span-2 col-start-2 rounded-lg border-2 border-gray-600 bg-gray-800" id="team-le-banc">
          <h2 className="my-1 text-center text-xl">{event?.teams[2].name}</h2>
          <ul className="space-y-1 p-4 text-center">
            {event?.teams[2].players.map((player) => (
              <li className="rounded-md bg-gray-600" key={player.id}>
                <p>{player.player.name}</p>
              </li>
            ))}
          </ul>

          <div className="mb-1 text-center">
            <button onClick={() => handleJoinTeam(event?.teams[2].id)} className="border-2 border-yellow-800 bg-yellow-600 px-2 py-1" id="btn-join-le-banc">
              Rejoindre l&apos;équipe
            </button>
          </div>
        </div>
      </section>

      <form className="my-4 text-center"
      onSubmit={async (e) => {
        e.preventDefault();
        if (event?.id) {
          await destroyEvent(event.id);
        }
      }}>
        <button type="submit" className="rounded-md bg-red-700 px-4 py-2 transition duration-150 hover:bg-red-600">Supprimer l&apos;événement</button>
      </form>
    </div>
  );
}