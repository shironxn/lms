import { PrismaClient } from "@prisma/client";
import { Context, Hono } from "hono";
import { Bcrypt } from "./utils/bcrypt";
import {
  IUserRepository,
  UserRepository,
} from "./repositories/user.repository";
import { IUserService, UserService } from "./services/user.service";
import { IUserController, UserController } from "./controllers/user.controller";
import { UserRoutes } from "./routes/user.route";
import { serve } from "@hono/node-server";

export class App {
  private readonly port: number;
  private readonly app: Hono;
  private readonly prisma: PrismaClient;

  constructor(port: number) {
    this.port = port;
    this.app = new Hono().basePath("/api");
    this.prisma = new PrismaClient();
  }

  public async start() {
    try {
      this.initApp();
      this.initRoutes();
      this.startServer();
    } catch (error) {
      console.error("Error starting the application:", error);
    }
  }

  private initApp() {
    this.app.onError((error: any, c: Context): Response => {
      return c.json({ error: error.message }, error.status);
    });
  }

  private initRoutes() {
    const bcrypt = new Bcrypt();
    const userRepository: IUserRepository = new UserRepository(this.prisma);
    const userService: IUserService = new UserService(userRepository, bcrypt);
    const userController: IUserController = new UserController(userService);
    const userRoutes = new UserRoutes(this.app, userController);

    userRoutes.run();
  }

  private startServer() {
    serve(
      {
        fetch: this.app.fetch,
        port: this.port,
      },
      (info) => {
        console.log(`Server is running on port ${info.port}`);
      },
    );
  }
}
