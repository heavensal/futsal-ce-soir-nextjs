interface HOneProps {
  title: string;
}

export default function HOne({ title: title }: HOneProps) {
  return (
    <h1 className="text-2xl text-center my-4">
      {title}
    </h1>
  );
}
