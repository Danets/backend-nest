import {
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class EditProductDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    dsc?: string;
  
    @IsString()
    @IsOptional()
    src?: string;
  }