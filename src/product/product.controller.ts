import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { CreateProductDto, EditProductDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(@GetUser('id') userId: number) {
    return this.productService.getProducts(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.getProductById(userId, productId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@GetUser('id') userId: number, @Body() dto: CreateProductDto) {
    return this.productService.createProduct(userId, dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  editProductById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: EditProductDto,
  ) {
    return this.productService.editProductById(userId, productId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProductById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.deleteProductById(userId, productId);
  }
}
