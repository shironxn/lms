import { Prisma, PrismaClient, Quiz } from "@prisma/client";

export interface IQuizRepository {
  findAll(): Promise<Quiz[] | null>;
  findById(id: string): Promise<Quiz | null>;
  create(data: Prisma.QuizCreateInput): Promise<void>;
  update(id: string, data: Prisma.QuizUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class QuizRepository implements IQuizRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Quiz[] | null> {
    try {
      return this.prisma.quiz.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Quiz | null> {
    try {
      return this.prisma.quiz.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.QuizCreateInput): Promise<void> {
    try {
      this.prisma.quiz.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(id: string, data: Prisma.QuizUpdateInput): Promise<void> {
    try {
      this.prisma.quiz.update({ where: { id }, data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.quiz.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
