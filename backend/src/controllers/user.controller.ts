import { Context } from "hono";
import { IUserService } from "../services/user.service";
import { HTTPException } from "hono/http-exception";

export interface IUserController {
  login(c: Context): Promise<Response>;
  register(c: Context): Promise<void>;
  findAll(c: Context): Promise<Response>;
  findById(c: Context): Promise<Response>;
  update(c: Context): Promise<void>;
  delete(c: Context): Promise<void>;
}

export class UserController implements IUserController {
  private readonly service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  async login(c: Context): Promise<Response> {
    const body = await c.req.json();
    const data = await this.service.login(body);
    return c.json({ data });
  }

  async register(c: Context): Promise<void> {
    const body = await c.req.json();
    await this.service.register(body);
    return c.status(201);
  }

  async findAll(c: Context): Promise<Response> {
    try {
      const data = await this.service.findAll();
      return c.json({ data });
    } catch (error: any) {
      console.log(error);
      throw new HTTPException(500, { message: error.message });
    }
  }

  async findById(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      const data = await this.service.findById(id);
      return c.json({ data });
    } catch (error: any) {
      console.log(error);
      throw new HTTPException(500, { message: error.message });
    }
  }

  async update(c: Context): Promise<void> {
    const id = c.req.param("id");
    const body = await c.req.json();
    await this.service.update(id, body);
    return c.status(200);
  }

  async delete(c: Context): Promise<void> {
    const id = c.req.param("id");
    await this.service.delete(id);
    return c.status(200);
  }
}
