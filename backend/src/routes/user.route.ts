import { Hono } from "hono";
import { IUserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class UserRoutes {
  private readonly app: Hono;
  private readonly controller: IUserController;
  private readonly authMiddleware: AuthMiddleware;

  constructor(
    app: Hono,
    controller: IUserController,
    authMiddleware: AuthMiddleware,
  ) {
    this.app = app;
    this.controller = controller;
    this.authMiddleware = authMiddleware;
  }

  run(): Hono {
    this.app.use("/users/*", this.authMiddleware.run());

    this.app.post("/auth/login", this.controller.login.bind(this.controller));
    this.app.post(
      "/auth/register",
      this.controller.register.bind(this.controller),
    );
    this.app.get("/users", this.controller.findAll.bind(this.controller));
    this.app.get("/users/:id", this.controller.findById.bind(this.controller));
    this.app.put("/users/:id", this.controller.update.bind(this.controller));
    this.app.delete("/users/:id", this.controller.delete.bind(this.controller));

    return this.app;
  }
}
