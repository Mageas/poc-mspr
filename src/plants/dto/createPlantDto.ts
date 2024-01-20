import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  addressId: string;

  @IsNotEmpty()
  @IsString()
  statusId: string;

  @IsNotEmpty()
  @IsString()
  speciesId: string;
}
