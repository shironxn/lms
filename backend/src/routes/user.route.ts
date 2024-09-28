import { Hono } from "hono";
import { IUserController } from "../controllers/user.controller";

export class UserRoutes {
  private readonly app: Hono;
  private readonly controller: IUserController;

  constructor(app: Hono, controller: IUserController) {
    this.app = app.basePath("/users");
    this.controller = controller;
  }

  run(): Hono {
    this.app.post("/login", this.controller.login.bind(this.controller));
    this.app.post("/register", this.controller.register.bind(this.controller));
    this.app.get("/", this.controller.findAll.bind(this.controller));
    this.app.get("/:id", this.controller.findById.bind(this.controller));
    this.app.put("/:id", this.controller.update.bind(this.controller));
    this.app.delete("/:id", this.controller.delete.bind(this.controller));

    return this.app;
  }
}
