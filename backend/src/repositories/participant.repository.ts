import { Participant, Prisma, PrismaClient } from "@prisma/client";

export interface IParticipantRepository {
  findAll(): Promise<Participant[] | null>;
  findById(id: string): Promise<Participant | null>;
  create(data: Prisma.ParticipantCreateInput): Promise<void>;
  delete(id: string): Promise<void>;
}

export class ParticipantRepository implements IParticipantRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(): Promise<Participant[] | null> {
    try {
      return this.prisma.participant.findMany();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Participant | null> {
    try {
      return this.prisma.participant.findUnique({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async create(data: Prisma.ParticipantCreateInput): Promise<void> {
    try {
      this.prisma.participant.create({ data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.prisma.participant.delete({ where: { id } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
