import { expect, test } from "vitest";
import { createServer, getServer, listServers } from "./servers";

const LOGO =
  "https://pbs.twimg.com/profile_images/1425897037602586625/ID6pueIo_400x400.png";

test(createServer, async () => {
  let server = await createServer("general", LOGO);

  expect(server).toHaveProperty("id");
  expect(server).toHaveProperty("name");
  expect(server).toHaveProperty("logo");
  expect(server).toHaveProperty("createdAt");

  expect(server.logo).toBe(LOGO);
});

test(listServers, async () => {
  let servers = await listServers();

  expect(servers).toBeInstanceOf(Array);

  expect(servers[0]).toHaveProperty("id");
  expect(servers[0]).toHaveProperty("name");
  expect(servers[0]).toHaveProperty("logo");
  expect(servers[0]).toHaveProperty("createdAt");
});

test(getServer, async () => {
  let servers = await listServers();
  let server = await getServer(servers[0].id);

  expect(server).toHaveProperty("id");
  expect(server).toHaveProperty("name");
  expect(server).toHaveProperty("logo");
  expect(server).toHaveProperty("createdAt");
});
