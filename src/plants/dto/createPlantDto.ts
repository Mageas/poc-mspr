import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  addressId: string;
}
