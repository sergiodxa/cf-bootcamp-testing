import { mock } from "./src/mock";
import { beforeAll } from "vitest";

beforeAll(async () => {
  await mock();
});
