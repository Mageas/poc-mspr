import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto, ReturnAddressDto } from './dto';
import { GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return await this.addressesService.create(userId, createAddressDto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return await this.addressesService.update(userId, +id, createAddressDto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
  ): Promise<void> {
    await this.addressesService.delete(userId, +id);
  }
}
