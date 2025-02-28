import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body('name') name: string) {
    return this.roomService.createRoom(name);
  }

  @Get()
  async getRooms() {
    return this.roomService.getRooms();
  }
}
