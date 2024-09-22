import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());
app.basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/home", (c) => {
  return c.json({ message: "hello world" });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
