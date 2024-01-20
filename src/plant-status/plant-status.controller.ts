import { Controller, Get } from '@nestjs/common';
import { PlantStatusService } from './plant-status.service';

@Controller('plant-status')
export class PlantStatusController {
  constructor(private readonly plantStatusService: PlantStatusService) {}

  @Get()
  async findAll() {
    return await this.plantStatusService.findAll();
  }
}
