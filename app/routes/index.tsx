import * as React from "react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await context.trpc.listApps.prefetch({ userId: context.userId });
  },
  component: Home,
});

function Home() {
  const userId = useLoaderData({
    from: "__root__",
    select: (data) => data.userId,
  });
  const [apps] = trpc.listApps.useSuspenseQuery({ userId });
  const [newAppModalOpen, setNewAppModalOpen] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center p-16">
      <div className="flex flex-col items-center justify-center"></div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2"></div>
    </div>
  );
}
