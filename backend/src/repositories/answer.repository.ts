import { AnswerOption, Prisma, PrismaClient } from "@prisma/client";

export interface IAnswerOptionRepository {
  findAll(): Promise<AnswerOption[] | null>;
  findById(id: string): Promise<AnswerOption | null>;
  create(data: Prisma.AnswerOptionCreateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class AnswerOptionRepository implements IAnswerOptionRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<AnswerOption[] | null> {
    try {
      return this.prisma.answerOption.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<AnswerOption | null> {
    try {
      return this.prisma.answerOption.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.AnswerOptionCreateInput): Promise<void> {
    try {
      this.prisma.answerOption.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.answerOption.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
