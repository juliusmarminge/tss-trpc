import { getRouterManifest } from "@tanstack/start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";
import { eventHandler, updateSession } from "vinxi/http";

import { createRouter } from "./router";
import { sessionConfig } from "./utils/auth";

const tsrHandler = createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);

export default eventHandler(async (event) => {
  /**
   * TODO: Set from reverse proxy
   */
  await updateSession(event, sessionConfig, {
    userId: "user_123",
    rootKey: process.env.INTERNAL_ENDPOINTS_ROOT_SECRET ?? "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return tsrHandler(event);
});
