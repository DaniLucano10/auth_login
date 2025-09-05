import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsString({ message: "El campo 'email' debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El campo 'email' es requerido" })
  @ApiProperty({
    example: 'juan@example.com',
  })
  email: string;

  @IsString({ message: "El campo 'password' debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El campo 'password' es requerido" })
  @ApiProperty({
    example: '1#34df678',
  })
  password: string;
}
