import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { TokenService } from './token.service';
  
@Injectable()
export class JwtAuthGuard implements CanActivate {
constructor(private readonly tokenService: TokenService) {}

canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
    const payload = this.tokenService.verify(token);
    request.user = payload;
    return true;
    } catch {
    throw new UnauthorizedException('Invalid or expired token');
    }
}
}