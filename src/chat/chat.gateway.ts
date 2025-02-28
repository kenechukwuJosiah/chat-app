import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';

interface User {
  socketId: string;
  username: string;
  room: string;
}

@WebSocketGateway({ cors: true })
@Injectable()
export class ChatGateway {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  @WebSocketServer() server: Server;
  private users: User[] = [];

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { username: string; room: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { username, room } = data;

    const existingRoom = await this.roomRepository.findOne({
      where: { name: room },
    });
    if (!existingRoom) {
      client.emit('error', { message: `Room "${room}" does not exist.` });
      return;
    }

    this.users.push({ socketId: client.id, username, room });
    client.join(room);

    this.server.to(room).emit('message', {
      event: 'message',
      data: `${username} joined the room`,
    });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { sender: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.users.find((u) => u.socketId === client.id);
    if (!user) return;

    const room = await this.roomRepository.findOne({
      where: { name: user.room },
    });
    if (!room) return;

    const newMessage = this.messageRepository.create({
      sender: data.sender,
      text: data.text,
      room,
    });

    await this.messageRepository.save(newMessage);

    this.server.to(user.room).emit('message', {
      event: 'message',
      data: {
        sender: data.sender,
        text: data.text,
        timestamp: new Date(),
      },
    });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { username: string; room: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { username, room } = data;
    this.users = this.users.filter((u) => u.socketId !== client.id);
    client.leave(room);

    this.server.to(room).emit('message', {
      event: 'message',
      data: `${username} left the room`,
    });
  }

  @SubscribeMessage('getActiveUsers')
  handleGetActiveUsers(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    const usersInRoom = this.users
      .filter((u) => u.room === room)
      .map((u) => u.username);
    client.emit('activeUsers', usersInRoom);
  }
}
