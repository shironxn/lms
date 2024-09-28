import { Context } from "hono";
import { IUserService } from "../services/user.service";

export interface IUserController {
  login(c: Context): Promise<Response>;
  register(c: Context): Promise<Response>;
  findAll(c: Context): Promise<Response>;
  findById(c: Context): Promise<Response>;
  update(c: Context): Promise<Response>;
  delete(c: Context): Promise<Response>;
}

export class UserController implements IUserController {
  private readonly service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  async login(c: Context): Promise<Response> {
    const body = await c.req.json();
    const data = await this.service.login(body);
    return c.json({ message: "Login successful", data });
  }

  async register(c: Context): Promise<Response> {
    const body = await c.req.json();
    await this.service.register(body);
    return c.json({ message: "User registered successfully" });
  }

  async findAll(c: Context): Promise<Response> {
    const data = await this.service.findAll();
    return c.json({ message: "Users retrieved successfully", data });
  }

  async findById(c: Context): Promise<Response> {
    const id = c.req.param("id");
    const data = await this.service.findById(id);
    return c.json({ message: "User retrieved successfully", data });
  }

  async update(c: Context): Promise<Response> {
    const id = c.req.param("id");
    const body = await c.req.json();
    await this.service.update(id, body);
    return c.json({ message: "User updated successfully" });
  }

  async delete(c: Context): Promise<Response> {
    const id = c.req.param("id");
    await this.service.delete(id);
    return c.json({ message: "User deleted successfully" });
  }
}
