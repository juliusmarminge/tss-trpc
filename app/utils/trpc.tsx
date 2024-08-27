import type { HTTPBatchLinkOptions } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";

// Hosted elsewhere, real type is imported from a monorepo
type MyTRPCRouter = import("@trpc/server/unstable-core-do-not-import").Router<
  {
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
  },
  {
    listApps: import("@trpc/server/unstable-core-do-not-import").QueryProcedure<{
      input: {
        userId: string;
        orgId?: string | undefined;
      };
      output: { createdAt: string; id: string; name: string }[];
    }>;
  }
>;

export const trpc = createTRPCReact<MyTRPCRouter>();

export const createAuthenticatedTRPCClient = (
  url: string,
  headers: HTTPBatchLinkOptions<any>["headers"],
) =>
  trpc.createClient({
    links: [
      httpBatchLink({
        headers,
        transformer: superjson,
        url,
      }),
    ],
  });
