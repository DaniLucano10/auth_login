import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ActiveToken } from './entities/active-token';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedToken } from './entities/blacklisted-token';
import { LogInDto } from './dto/log-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(ActiveToken)
    private activeTokenRepository: Repository<ActiveToken>,
    @InjectRepository(BlacklistedToken)
    private blacklistTokenRepository: Repository<BlacklistedToken>,
  ) {}

  async LogIn({ email, password }: LogInDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email incorrecto');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password incorrecto');
    }

    const payload = { sub: user.id, username: user.name, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    // Guardar el token activo en la base de datos
    const activeToken = this.activeTokenRepository.create({
      email: user.email,
      token: access_token,
    });
    await this.activeTokenRepository.save(activeToken);

    return {
      access_token,
    };
  }
}
