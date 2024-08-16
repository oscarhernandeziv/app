import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      Welcome to my first full-stack app! Built with React components from
      Tanstack and Zod, Bun, Hono, Postgres with Drizzle ORM, Auth with Kinde,
      and Tailwind CSS.
    </div>
  );
}
