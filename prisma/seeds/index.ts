import { PrismaClient } from '@prisma/client';
import { users } from './users.seed';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

load();

async function load() {
  try {
    users.forEach(async (user) => {
      await prisma.user.create({
        data: {
          ...user,
          password: await bcrypt.hash(user.password, 10),
        },
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
