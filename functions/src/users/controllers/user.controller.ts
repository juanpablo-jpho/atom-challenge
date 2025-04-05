import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { TokenService } from '../../auth/token.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService,
            private readonly tokenService: TokenService
  ) {}

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    console.log('findByEmail email -> ', email);
    const user = await this.service.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  async login(@Body('email') email: string) {
    const user = await this.service.createUser(email); // ya crea o retorna
    const token = this.tokenService.sign({ id: user.id, email: user.email });
    return { token };
  }
}