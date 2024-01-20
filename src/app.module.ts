import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { SessionsModule } from './sessions/sessions.module';
import { PlantsModule } from './plants/plants.module';
import { PlantStatusModule } from './plant-status/plant-status.module';
import { PlantSpeciesModule } from './plant-species/plant-species.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    AddressesModule,
    SessionsModule,
    PlantsModule,
    PlantStatusModule,
    PlantSpeciesModule,
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
