import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findUserByUsername(username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser(username, hashedPassword);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findUserByUsername(username);
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) return false;

    return await bcrypt.compare(password, user.password);
  }

  async updateUser(
    id: number,
    newData: Partial<{ username: string; password: string }>,
  ) {
    if (newData.password) {
      newData.password = await bcrypt.hash(newData.password, 10);
    }
    return await this.userRepository.updateUser(id, newData);
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
