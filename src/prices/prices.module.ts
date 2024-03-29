import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Price, PriceScheme } from './schemes/price.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceScheme }]),
  ],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
