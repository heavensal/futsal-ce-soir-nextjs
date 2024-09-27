
import Link from "next/link";
import { indexEvents } from "./controllers/events/actions";

// UI Components
import StartTime from "@/components/events/StartTime";
import HOne from "@/components/title/H1";




export default async function HomePage() {
  const events = await indexEvents();


  return (
    <div>
      <HOne title="Tous les événements de futsal"></HOne>

      <section className="container container-allEvent px-2 mx-auto">
        <ul className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {events?.map((event) => (
            <li key={event.id}>
              <Link href={`/events/${event.id}`}>
                <div className="border-2 border-white bg-green-800 rounded-md p-2 shadow-lg">
                  <h2>{event.title}</h2>
                  <p>{StartTime({ startTime: event.startTime })}</p>
                  <p>{event.location}</p>
                  <p>Nombre de participants : {event.players.length}/{event.numberOfPlayers}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </section>
    </div>
  );
}
