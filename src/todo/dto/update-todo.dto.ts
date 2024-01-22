import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  task: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  completed: boolean;
}
