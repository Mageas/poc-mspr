import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CreatePlantDto, ReturnPlantDto } from './dto';
import { UpdatePlantDto } from './dto/updatePlantDto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() createPlantDto: CreatePlantDto,
  ): Promise<ReturnPlantDto> {
    return this.plantsService.create(userId, createPlantDto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body() updatePlantDto: UpdatePlantDto,
  ): Promise<ReturnPlantDto> {
    return this.plantsService.update(userId, +id, updatePlantDto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
  ): Promise<void> {
    return this.plantsService.delete(userId, +id);
  }
}
