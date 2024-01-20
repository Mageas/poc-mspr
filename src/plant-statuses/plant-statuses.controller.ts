import { Controller, Get } from '@nestjs/common';
import { PlantStatusService } from './plant-statuses.service';

@Controller('plant-statuses')
export class PlantStatusController {
  constructor(private readonly plantStatusService: PlantStatusService) {}

  @Get()
  async findAll() {
    return await this.plantStatusService.findAll();
  }
}
