import { Module } from '@nestjs/common';
import { AddressService } from './addresses.service';
import { AddressController } from './addresses.controller';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
