import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString({ message: "El campo 'name' debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El campo 'name' es requerido" })
  name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail({}, { message: "El campo 'email' debe ser un correo válido" })
  @IsNotEmpty({ message: "El campo 'email' es requerido" })
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
  })
  @IsString({ message: "El campo 'password' debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El campo 'password' es requerido" })
  @MinLength(8, {
    message: "El campo 'password' debe tener al menos 8 caracteres",
  })
  password: string;
}
