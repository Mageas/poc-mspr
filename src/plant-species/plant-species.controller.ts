import { Controller, Get } from '@nestjs/common';
import { PlantSpeciesService } from './plant-species.service';

@Controller('plant-species')
export class PlantSpeciesController {
  constructor(private readonly plantSpeciesService: PlantSpeciesService) {}

  @Get()
  async findAll() {
    return await this.plantSpeciesService.findAll();
  }
}
