import { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";

export class AuthMiddleware {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  run(): MiddlewareHandler {
    return jwt({
      secret: this.secret,
      cookie: "token",
    });
  }
}
