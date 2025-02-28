import { Module } from '@nestjs/common';
// import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Room, Message])],
  providers: [ChatGateway],
})
export class ChatModule {}
