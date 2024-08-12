import { hc } from "hono/client";
import { type apiRoutes } from "@server/app";

const client = hc<apiRoutes>("/");

export const api = client.api;
