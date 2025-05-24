import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/Users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    //console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync({
      ...payload,
      tokenType: 'access',
    }, {
      expiresIn: '15m',
    });

    /*   const refreshToken = await this.jwtService.signAsync({
         ...payload,
         tokenType: 'refresh',
       }, {
         expiresIn: '7d',
       });*/
    return { access_token: accessToken };

  }
}
