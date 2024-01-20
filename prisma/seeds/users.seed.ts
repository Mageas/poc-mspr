import { UserRole } from '../userRole';

export const users = [
  {
    email: 'owner@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: UserRole.Owner,
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
          name: UserRole.Owner,
        },
        {
          name: UserRole.Botanist,
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
          name: UserRole.Owner,
        },
        {
          name: UserRole.Gardian,
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
          name: UserRole.Owner,
        },
        {
          name: UserRole.Admin,
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
          name: UserRole.Owner,
        },
        {
          name: UserRole.Botanist,
        },
        {
          name: UserRole.Gardian,
        },
        {
          name: UserRole.Admin,
        },
      ],
    },
  },
];
