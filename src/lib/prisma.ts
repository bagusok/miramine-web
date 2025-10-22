// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export interface IMalData {
  year?: number;
  score?: null;
  rating?: string;
  studios?: Producer[];
  trailer?: string;
  synopsis?: string;
  broadcast?: Broadcast;
  producers?: Producer[];
}

export interface Broadcast {
  day?: string;
  time?: string;
  timezone?: string;
}

export interface Producer {
  url?: string;
  name?: string;
  type?: string;
  mal_id?: number;
}
