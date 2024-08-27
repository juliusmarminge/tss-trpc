import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  Body,
  createServerFn,
  Head,
  Html,
  Meta,
  Scripts,
} from "@tanstack/start";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { DefaultCatchBoundary } from "../components/default-catch-boundary";
import { NotFound } from "../components/not-found";
import appCss from "../styles/app.css?url";
import { getSessionData } from "../utils/auth";

import { createAuthenticatedTRPCClient, trpc } from "../utils/trpc";

/** Get trpc server url from SSR pass? */
const getTRPCClientOptions = createServerFn("GET", async () => {
  const session = await getSessionData();
  const url = `${process.env.API_URL}/trpc`;
  return {
    clientHeaders: {
      "x-root-key": session.rootKey,
    },
    clientUrl: url,
  };
});

const getCurrentUser = createServerFn("GET", async () => {
  const session = await getSessionData();
  return session.userId;
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  links: () => [
    { rel: "preconnect", href: "https://rsms.me/" },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
    { rel: "stylesheet", href: appCss },
  ],
  beforeLoad: async () => {
    const [userId, trpcClientOptions] = await Promise.all([
      getCurrentUser(),
      getTRPCClientOptions(),
    ]);

    const trpc = createServerSideHelpers({
      client: createAuthenticatedTRPCClient(
        trpcClientOptions.clientUrl,
        trpcClientOptions.clientHeaders,
      ),
    });

    return { trpc, trpcClientOptions, userId };
  },
  loader: async ({ context }) => {
    await context.trpc.listApps.prefetch({ userId: context.userId });

    return {
      userId: context.userId,
      trpcClientOptions: context.trpcClientOptions,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});

function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { clientHeaders, clientUrl } = Route.useLoaderData({
    select: (data) => data.trpcClientOptions,
  });
  const trpcClient = createAuthenticatedTRPCClient(clientUrl, clientHeaders);
  const queryClient = useQueryClient();

  console.log("rendering outer trpc provider");
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {props.children}
    </trpc.Provider>
  );
}

function RootDocument(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <TRPCProvider>{props.children}</TRPCProvider>

        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  );
}
