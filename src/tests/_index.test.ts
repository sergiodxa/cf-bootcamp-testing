import { expect, test } from "vitest";
import { loader } from "../routes/_index";
import { listServers } from "../models/servers";

test(loader, async () => {
  let response = await loader();
  let [server] = await listServers();

  expect(response.status).toBe(302);
  expect(response.headers.get("location")).toBe(`/${server.id}`);
});
