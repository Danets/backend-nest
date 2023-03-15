import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getProducts(userId: number) {
    return this.prisma.product.findMany({
      where: {
        userId,
      },
    });
  }

  getProductById(userId: number, productId: number) {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
        userId,
      },
    });
  }

  async createProduct(userId: number, dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        userId,
        ...dto,
      },
    });

    return product;
  }

  async editProductById(
    userId: number,
    productId: number,
    dto: EditProductDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources is forbidden');

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProductById(userId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== userId)
      throw new ForbiddenException('Access to resources is forbidden');

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
