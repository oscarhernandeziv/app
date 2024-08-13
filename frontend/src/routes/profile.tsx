import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading...";
  if (error) return "not logged in";

  return (
    <div className="p-2">
      Hello from Profile!
      <p>Hello {data.user.family_name}</p>
    </div>
  );
}
