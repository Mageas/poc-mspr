import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './createPlantDto';

export class UpdatePlantDto extends PartialType(CreatePlantDto) {}
