import { describe, expect, test } from "vitest";
import { loader } from "../routes/$serverId._index";
import { listServers } from "../models/servers";
import { listChannels } from "../models/channels";

describe(loader, async () => {
  test("redirects to the home page if no serverId is provided", async () => {
    let request = new Request("/123");
    let response = await loader({ request, params: {} });
    expect(response.status).toBe(302);
  });

  test("redirects to the first channel of the server", async () => {
    let [server] = await listServers();
    let [channel] = await listChannels(server.id);

    let request = new Request(`/${server.id}`);
    let response = await loader({ request, params: { serverId: server.id } });

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      `/${server.id}/${channel.id}`,
    );
  });
});
