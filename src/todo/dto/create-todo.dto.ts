import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @ApiProperty()
  task: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  completed: boolean;
}
