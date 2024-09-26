import { Prisma, PrismaClient, Token } from "@prisma/client";

export interface ITokenRepository {
  findAll(): Promise<Token[] | null>;
  create(data: Prisma.TokenCreateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class TokenRepository implements ITokenRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Token[] | null> {
    try {
      return this.prisma.token.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.TokenCreateInput): Promise<void> {
    try {
      this.prisma.token.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.token.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
