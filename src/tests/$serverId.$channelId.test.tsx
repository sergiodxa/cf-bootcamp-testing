import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Component, loader, action } from "../routes/$serverId.$channelId";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { listServers } from "../models/servers";
import { listChannels } from "../models/channels";
import { listMessages } from "../models/messages";
import { render, screen } from "@testing-library/react";
import * as users from "../models/users";

describe(loader, () => {
  test("redirects to the home page if no serverId is provided", async () => {
    let request = new Request("/123");
    let response = await loader({ request, params: {} });
    expect(response.status).toBe(302);
  });
});

describe(Component, () => {
  let router = createMemoryRouter([
    { path: "/:serverId/:channelId", Component, loader, action },
  ]);

  test("renders a list of messages", async () => {
    let userList = await users.listUsers();

    let mock = vi.spyOn(users, "listUsers").mockImplementationOnce(async () => {
      return userList.filter((user) => user.name === "sergiodxa");
    });

    let [server] = await listServers();
    let [channel] = await listChannels(server.id);
    let [message] = await listMessages(channel.id);

    await router.navigate(`/${server.id}/${channel.id}`);

    let { unmount } = render(<RouterProvider router={router} />);

    await screen.findByText(message.content);

    mock.mockRestore();
    unmount();
  });

  test("can create a new message", async () => {
    let user = userEvent.setup();

    let [server] = await listServers();
    let [channel] = await listChannels(server.id);

    await router.navigate(`/${server.id}/${channel.id}`);

    let { unmount } = render(<RouterProvider router={router} />);

    let $textarea: HTMLTextAreaElement = await screen.findByLabelText(
      "Message content",
    );

    let text = "Hello, world!";

    await user.type($textarea, text);

    expect($textarea.value).toBe(text);

    let $button: HTMLButtonElement = await screen.findByRole("button", {
      name: "Send",
    });

    await user.click($button);

    expect($button.disabled).toBe(true);

    let $message = await screen.findByText(text);

    expect($message.textContent).toBe(text);

    unmount();
  });
});
