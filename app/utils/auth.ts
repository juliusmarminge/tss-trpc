import { getSession } from "vinxi/http";
import type { SessionConfig } from "vinxi/http";

export interface SessionData {
  rootKey: string;
  userId: string;
}

export const sessionConfig = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, turbo/no-undeclared-env-vars
  password:
    process.env.COOKIE_SECRET ?? "oCnWs1/ceQz1jBUO3F7QonGphsZ/Cx1/9m0nUFnSvA0=",
} satisfies SessionConfig;

export const getSessionData = async () => {
  const session = await getSession<SessionData>(sessionConfig);
  return session.data;
};
