import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/:id')
  async user(@Param() params: { id: number }) {
    const user = await this.userService.findOne(params.id);

    if (!user) {
      return {
        status: 401,
        data: null,
      };
    }

    return {
      data: { user },
      status: 200,
    };
  }
}
