import { Role } from '../role';

export const users = [
  {
    email: 'owner@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Role.Owner,
        },
      ],
    },
  },
  {
    email: 'botanist@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Role.Owner,
        },
        {
          name: Role.Botanist,
        },
      ],
    },
  },
  {
    email: 'gardian@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Role.Owner,
        },
        {
          name: Role.Gardian,
        },
      ],
    },
  },
  {
    email: 'admin@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Role.Owner,
        },
        {
          name: Role.Admin,
        },
      ],
    },
  },
  {
    email: 'test@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Role.Owner,
        },
        {
          name: Role.Botanist,
        },
        {
          name: Role.Gardian,
        },
        {
          name: Role.Admin,
        },
      ],
    },
  },
];
