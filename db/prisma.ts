// prisma.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Use Omit to extend the type of globalThis, excluding 'prisma' to avoid potential conflicts
interface CustomNodeJsGlobal extends Omit<typeof globalThis, 'prisma'> {
  prisma?: PrismaClientSingleton;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;