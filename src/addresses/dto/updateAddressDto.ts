import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './createAddressDto';

export class UpdateUserDto extends PartialType(CreateAddressDto) {}
