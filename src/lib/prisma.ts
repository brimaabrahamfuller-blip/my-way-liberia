import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" 
      ? ["query", "error", "warn"] 
      : ["error"],
    errorFormat: "pretty",
  });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// In serverless environments like Vercel, we shouldn't call $connect() manually 
// or exit the process on connection failure, as Prisma handles lazy connection.
// We just log the error if it happens during a request.
if (process.env.NODE_ENV === "development") {
  prisma.$connect().catch((error) => {
    console.error("Prisma connection error:", error);
  });
}
