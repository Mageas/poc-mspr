import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(AuthDto) {}
