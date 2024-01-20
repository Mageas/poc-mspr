import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { AddressesService } from 'src/addresses/addresses.service';

@Module({
  providers: [PlantsService, AddressesService],
  controllers: [PlantsController],
})
export class PlantsModule {}
