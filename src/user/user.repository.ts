import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = this.userRepo.create({ username, password });
    return await this.userRepo.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async updateUser(id: number, newData: Partial<User>): Promise<User> {
    await this.userRepo.update(id, newData);
    return await this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
