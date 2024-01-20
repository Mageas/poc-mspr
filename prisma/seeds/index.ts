import { PrismaClient } from '@prisma/client';
import { users } from './users.seed';
import { statuses } from './statuses.seed';
import * as bcrypt from 'bcrypt';
import { species } from './species.seed';

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

    statuses.forEach(async (status) => {
      await prisma.plantStatus.create({
        data: status,
      });
    });

    species.forEach(async (specie) => {
      await prisma.plantSpecies.create({
        data: specie,
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
