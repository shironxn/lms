import { Prisma } from "@prisma/client";
import { IUserRepository } from "../repositories/user.repository";
import { IBcrypt } from "../utils/bcyrpt";

type User = {
  id: string;
  email: string;
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
  login(data: Login): Promise<User | null>;
  register(data: Register): Promise<void>;
  findAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
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

  async login(data: Login): Promise<User | null> {
    try {
      const user = await this.repository.findByEmail(data.email);
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await this.bcyrpt.comparePassword(
        data.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      return {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async register(data: Register): Promise<void> {
    try {
      const hashedPassword = await this.bcyrpt.hashPassword(data.password);
      if (!hashedPassword) {
        return;
      }

      await this.repository.create({
        email: data.email,
        password: hashedPassword,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      const data = await this.repository.findAll();
      if (!data) {
        throw new Error("user not found");
      }

      const users: User[] = data.map((value) => ({
        id: value.id,
        email: value.email,
        created_at: value.created_at,
        updated_at: value.updated_at,
      }));

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const data = await this.repository.findById(id);
      if (!data) {
        throw new Error("user not found");
      }

      return {
        id: data.id,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<void> {
    try {
      await this.repository.update(id, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
