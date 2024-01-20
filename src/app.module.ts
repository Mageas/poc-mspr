import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    AddressesModule,
    SessionsModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
