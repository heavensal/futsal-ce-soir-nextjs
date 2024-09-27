export default function StartTime({ startTime } : { startTime: Date }) {

  const dateTime = new Date(startTime).toLocaleString('fr-FR', {
    weekday: 'long', // "lundi"
    year: 'numeric', // "2024"
    month: 'long', // "septembre"
    day: 'numeric', // "19"
    hour: '2-digit', // "05"
    minute: '2-digit' // "07"
  });

  const date = new Date(startTime).toLocaleString('fr-FR', {
    weekday: 'long', // "lundi"
    year: 'numeric', // "2024"
    month: 'long', // "septembre"
    day: 'numeric', // "19"
  });

  const hour = new Date(startTime).toLocaleString('fr-FR', {
    hour: '2-digit', // "05"
    minute: '2-digit' // "07"
  });

  return (
    <span>
      {date} <br /> {hour}
    </span>
  );
}
