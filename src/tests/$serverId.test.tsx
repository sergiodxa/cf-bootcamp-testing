import { describe, expect, test } from "vitest";
import { Component, loader } from "../routes/$serverId";
import { listServers } from "../models/servers";
import { listChannels } from "../models/channels";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe(loader, () => {
  test("redirects to the home page if no serverId is provided", async () => {
    let request = new Request("/123");
    let response = await loader({ request, params: {} });
    expect(response.status).toBe(302);
  });
});

describe(Component, () => {
  let router = createMemoryRouter([{ path: "/:serverId", Component, loader }]);

  test("renders a list of channels", async () => {
    let [server] = await listServers();
    let [channel] = await listChannels(server.id);
    await router.navigate(`/${server.id}`);

    let { unmount } = render(<RouterProvider router={router} />);

    let $link = await screen.findByRole("link", { name: channel.name });

    expect($link.getAttribute("href")).toBe(`/${server.id}/${channel.id}`);

    unmount();
  });
});
