import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB CONNECT');
  } catch (error) {
    console.error(`DB ERROR :${error}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { connectDB, disconnectDB };
