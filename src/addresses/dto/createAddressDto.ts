import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsNumberString()
  zip: string;

  @IsNotEmpty()
  @IsString()
  city: string;
}
