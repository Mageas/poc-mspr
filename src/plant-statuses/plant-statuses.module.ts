import { Module } from '@nestjs/common';
import { PlantStatusController } from './plant-statuses.controller';
import { PlantStatusService } from './plant-statuses.service';

@Module({
  controllers: [PlantStatusController],
  providers: [PlantStatusService],
})
export class PlantStatusModule {}
