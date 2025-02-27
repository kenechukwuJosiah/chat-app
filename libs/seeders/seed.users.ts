import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../src/user/entities';

export class UserSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const userCount = await userRepository.count();
    if (userCount > 0) {
      console.log('⚠️ Users already exist, skipping seeding.');
      return;
    }

    // Generate 10 random users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: faker.internet.userName(),
        password: await bcrypt.hash('password123', 10),
      });
    }
    await userRepository.save(users);

    console.log('✅ Users seeded successfully!');
  }
}
