import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    dsc: string;
  
    @IsString()
    @IsNotEmpty()
    src: string;
  }