import { Module } from '@nestjs/common';
import { PlantSpeciesController } from './plant-species.controller';
import { PlantSpeciesService } from './plant-species.service';

@Module({
  controllers: [PlantSpeciesController],
  providers: [PlantSpeciesService],
})
export class PlantSpeciesModule {}
