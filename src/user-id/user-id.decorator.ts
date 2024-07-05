import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const UserId = createParamDecorator<boolean>(
  async (required = true, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userId = request.user_id;
    if (!userId && required) {
      throw new UnauthorizedException('Invalid token');
    }

    return userId ?? null;
  },
);
