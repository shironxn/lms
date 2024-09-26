import { Prisma, PrismaClient, User } from "@prisma/client";

export interface IUserRepository {
  findAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<void>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<User[] | null> {
    try {
      return await this.prisma.user.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({ where: { email } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    try {
      this.prisma.user.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<void> {
    try {
      this.prisma.user.update({ where: { id }, data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.user.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
