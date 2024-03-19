import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Spinner } from "./spinner";

test(Spinner, async () => {
  render(<Spinner data-testid="1" />);
  let svg = await screen.findByTestId("1");
  expect(svg).toBeDefined();
});
