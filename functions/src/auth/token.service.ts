import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret';

@Injectable()
export class TokenService {
  sign(payload: { id: string; email: string }): string {
    console.log('JWT_SECRET -> ', JWT_SECRET);
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }

  verify(token: string): { id: string; email: string } {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  }
}

