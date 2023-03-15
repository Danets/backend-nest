import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsOptional()
    dsc?: string;
  
    @IsString()
    @IsNotEmpty()
    src: string;
  }