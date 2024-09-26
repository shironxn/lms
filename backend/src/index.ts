import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { UserRoute } from "./routes/user.route";

const prisma = new PrismaClient();
const app = new Hono();
app.use(logger());

const userRoute = new UserRoute(app, prisma);

userRoute.run();

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
