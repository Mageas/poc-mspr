import { Module } from '@nestjs/common';
import { PlantStatusController } from './plant-status.controller';
import { PlantStatusService } from './plant-status.service';

@Module({
  controllers: [PlantStatusController],
  providers: [PlantStatusService],
})
export class PlantStatusModule {}
