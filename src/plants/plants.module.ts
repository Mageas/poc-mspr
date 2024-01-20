import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { AddressesService } from 'src/addresses/addresses.service';
import { PlantStatusService } from 'src/plant-statuses/plant-statuses.service';
import { PlantSpeciesService } from 'src/plant-species/plant-species.service';

@Module({
  providers: [
    PlantsService,
    AddressesService,
    PlantStatusService,
    PlantSpeciesService,
  ],
  controllers: [PlantsController],
})
export class PlantsModule {}
