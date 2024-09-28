import { Prisma, PrismaClient, User } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: Prisma.UserCreateInput): Promise<void>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<User[]> {
    try {
      const data = await this.prisma.user.findMany();
      if (!data) {
        throw new HTTPException(404, { message: "No users found" });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const data = await this.prisma.user.findUnique({ where: { id } });
      if (!data) {
        throw new HTTPException(404, {
          message: `User with ID ${id} not found`,
        });
      }

      return data;
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const data = await this.prisma.user.findUnique({ where: { email } });
      if (!data) {
        throw new HTTPException(404, {
          message: `User with email ${email} not found`,
        });
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    try {
      await this.prisma.user.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HTTPException(409, {
            message: "Email is already registered",
          });
        }
      }
      throw error;
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<void> {
    try {
      await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HTTPException(404, {
            message: `User with ID ${id} not found`,
          });
        }
        if (error.code === "P2002") {
          throw new HTTPException(409, {
            message: "Email is already registered",
          });
        }
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HTTPException(404, {
            message: `User with ID ${id} not found`,
          });
        }
      }
      throw error;
    }
  }
}
