import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import OKResponse from '../../utilities/OKResponse';
import { JwtService } from '../jwt/jwt.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginAuthDto, TokenExchangeDto } from './dto/auth.dto';

@UsePipes(ZodValidationPipe)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async loginUser(@Body() body: LoginAuthDto) {
    const user = await this.authService.getUser(body);

    // Generate token
    const token = this.jwtService.generateToken({
      id: user.user_id,
    });
    return new OKResponse(token, 'User logged in');
  }

  // @Get('/callback')
  // async oauthCallback(
  //   @Res() res,
  //   @Query('code') code,
  //   @Query('scope') scope,
  //   @Query('state') state,
  // ) {
  //   return new OKResponse({ code, scope, state }, 'Callback received');
  // }

  /**
   *
   * @param body {TokenExchangeDto}
   * @returns {Promise<{open_id: string, scope: string, access_token: string, expires_in: number, refresh_token: string, refresh_expires_in: number, token_type: string}>}
   */
  @Post('/tiktok/token')
  async getTiktokToken(@Body() body: TokenExchangeDto): Promise<{
    open_id: string;
    scope: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_expires_in: number;
    token_type: string;
  }> {
    // https://developers.tiktok.com/doc/oauth-user-access-token-management

    const { code, code_verifier, redirect_uri } = body;
    const response = await fetch(
      'https://open.tiktokapis.com/v2/oauth/token/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_DEV_CLIENT_KEY!,
          client_secret: process.env.TIKTOK_DEV_CLIENT_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri,
          code_verifier,
        }),
      },
    );

    const data = await response.json();
    return data;
  }

  // https://developers.tiktok.com/doc/login-kit-web/
  // @Get('/oauth')
  // async oauth(@Res() res: Response) {
  //   const CODE_VERIFIER = this.generateCodeVerifier();
  //   const csrfState = Math.random().toString(36).substring(2);
  //   res.cookie('csrfState', csrfState, { maxAge: 60000 });
  //
  //   let url = 'https://www.tiktok.com/v2/auth/authorize/';
  //
  //   // the following params need to be in `application/x-www-form-urlencoded` format.
  //   url += `?client_key=${process.env.TIKTOK_DEV_CLIENT_KEY}`;
  //   url += '&scope=user.info.basic';
  //   url += '&response_type=code';
  //   url += '&redirect_uri=' + process.env.TIKTOK_DEV_REDIRECT_URI!;
  //   url += '&state=' + csrfState;
  //   url += `&code_challenge=${CODE_VERIFIER}`;
  //   url += '&code_challenge_method=S256';
  //
  //   console.log(url);
  //
  //   res.redirect(url);
  // }

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Methods below are for PKCE for TikTok OAuth Desktop
  // private generateCodeVerifier() {
  //   const LENGTH = 128;
  //   let result = '';
  //   let characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  //   let charactersLength = characters.length;
  //   for (let i = 0; i < LENGTH; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
  //
  // private base64URLEncode(str: Buffer): string {
  //   return str
  //     .toString('base64')
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=+$/, '');
  // }
  //
  // private sha256(buffer: Buffer): Buffer {
  //   return crypto.createHash('sha256').update(buffer).digest();
  // }
  //
  // private generateCodeChallenge(codeVerifier: string): string {
  //   const hashed = this.sha256(Buffer.from(codeVerifier));
  //   return this.base64URLEncode(hashed);
  // }
}
