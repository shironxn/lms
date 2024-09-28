import { Prisma } from "@prisma/client";
import { IUserRepository } from "../repositories/user.repository";
import { IBcrypt } from "../utils/bcrypt";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

type User = {
  id: string;
  token?: string;
  created_at: Date;
  updated_at: Date;
};

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
};

export interface IUserService {
  login(data: Login): Promise<User>;
  register(data: Register): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class UserService implements IUserService {
  private readonly repository: IUserRepository;
  private readonly bcyrpt: IBcrypt;

  constructor(repository: IUserRepository, bcyrpt: IBcrypt) {
    this.repository = repository;
    this.bcyrpt = bcyrpt;
  }

  async login(data: Login): Promise<User> {
    const user = await this.repository.findByEmail(data.email);

    if (!(await this.bcyrpt.comparePassword(data.password, user.password))) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    const payload = {
      id: user.id,
      role: user.email === process.env.ADMIN_EMAIL ? "admin" : "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };
    const secret = process.env.JWT_SECRET!;
    const token = await sign(payload, secret);

    return {
      id: user.id,
      token: token,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async register(data: Register): Promise<void> {
    const hashedPassword = await this.bcyrpt.hashPassword(data.password);
    if (!hashedPassword) {
      return;
    }

    await this.repository.create({
      email: data.email,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    const data = await this.repository.findAll();

    const users: User[] = data.map((value) => ({
      id: value.id,
      email: value.email,
      created_at: value.created_at,
      updated_at: value.updated_at,
    }));

    return users;
  }

  async findById(id: string): Promise<User> {
    const data = await this.repository.findById(id);

    return {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
