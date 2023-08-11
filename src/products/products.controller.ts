import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParamData,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  IProductRO,
  IProductsBySlugRO,
  IProductsRO,
} from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private productsService: ProductsService) {}

  @Post('create')
  create(@Body() data: CreateProductDto) {
    this.logger.log('Handling create() request...');
    return this.productsService.create(data);
  }

  @Get('list')
  getAll(@Query() query): Promise<IProductsRO> {
    this.logger.log('Handling getAll() request...');
    // TODO: add transform query to indeed formats (number, string)
    return this.productsService.getAll(query);
  }

  @Get('list-by-slug')
  getAllBySlug(@Query() query): Promise<IProductsBySlugRO> {
    this.logger.log('Handling getAllByName() request...');
    return this.productsService.getAllBySlug(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: ParamData): Promise<IProductRO> {
    this.logger.log('Handling findOne() request...');
    return this.productsService.findOne({ slug });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    this.logger.log('Handling update() request with id=' + id + '...');
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log('Handling delete() request with id=' + id + '...');
    return this.productsService.delete(id);
  }
}
