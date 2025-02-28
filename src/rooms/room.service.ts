import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../chat/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async createRoom(name: string) {
    const existingRoom = await this.roomRepository.findOne({ where: { name } });
    if (existingRoom) throw new Error('Room already exists');

    const room = this.roomRepository.create({ name });
    return this.roomRepository.save(room);
  }

  async getRooms() {
    return this.roomRepository.find();
  }
}
