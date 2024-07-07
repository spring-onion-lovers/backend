import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
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
    try {
      const data = await this.getUserInfoFromTikTok(body.tiktok_access_token);

      if (!data) {
        throw new BadRequestException(
          'Invalid access token',
          'Error logging in user',
        );
      }

      const tiktokUserId = data.open_id;

      const user = await this.authService.getUserByTiktokUserId(tiktokUserId);

      // Generate token
      const token = this.jwtService.generateToken({
        id: user.user_id,
      });

      return new OKResponse(token, 'User logged in');
    } catch (error) {
      throw new BadRequestException(error, 'Error logging in user');
    }
  }

  private async getUserInfoFromTikTok(
    access_token: string,
  ): Promise<{ avatar_url; display_name; open_id; union_id }> {
    const res = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const data = await res.json();

    return data.data.user || undefined;
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

  @Post('/tiktok/token')
  async getTiktokToken(@Body() body: TokenExchangeDto) {
    // https://developers.tiktok.com/doc/oauth-user-access-token-management

    const { code, redirect_uri } = body;

    try {
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
          }),
        },
      );

      const data = await response.json();

      if (data.error)
        throw new BadRequestException(
          data,
          'There was an error exchanging the code for a token',
        );

      const { access_token } = data;

      // Get user info
      const userInfo = await this.getUserInfoFromTikTok(access_token);

      return new OKResponse(
        {
          ...userInfo,
          ...data,
        },
        `Token generated for ${userInfo.open_id}`,
      );
    } catch (error) {
      // console.error(error);
      throw new BadRequestException(error);
    }
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
