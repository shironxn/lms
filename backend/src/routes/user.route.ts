import { Hono } from "hono";
import { Bcrypt } from "../utils/bcyrpt";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { PrismaClient } from "@prisma/client";

export class UserRoute {
  private readonly app: Hono;
  private readonly prisma: PrismaClient;

  constructor(app: Hono, prisma: PrismaClient) {
    this.app = app.basePath("/user");
    this.prisma = prisma;
  }

  run(): Hono {
    const bcrypt = new Bcrypt();
    const userRepository = new UserRepository(this.prisma);
    const userService = new UserService(userRepository, bcrypt);
    const userController = new UserController(userService);

    this.app.post("/login", userController.login);
    this.app.post("/register", userController.register);
    this.app.get("/", userController.findAll);
    this.app.get("/:id", userController.findById);
    this.app.put("/:id", userController.update);
    this.app.delete("/:id", userController.delete);

    return this.app;
  }
}
