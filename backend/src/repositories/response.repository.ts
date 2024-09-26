import { Response, Prisma, PrismaClient } from "@prisma/client";

export interface IResponseRepository {
  findAll(): Promise<Response[] | null>;
  findById(id: string): Promise<Response | null>;
  create(data: Prisma.ResponseCreateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class ResponseRepository implements IResponseRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Response[] | null> {
    try {
      return this.prisma.response.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Response | null> {
    try {
      return this.prisma.response.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.ResponseCreateInput): Promise<void> {
    try {
      this.prisma.response.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.response.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
