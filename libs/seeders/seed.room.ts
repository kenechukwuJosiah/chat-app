import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Room } from '../../src/chat/entities/room.entity';

export class RoomSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const roomRepository = dataSource.getRepository(Room);

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const roomCount = await roomRepository.count();
    if (roomCount > 0) {
      console.log('⚠️ Rooms already exist, skipping seeding.');
      return;
    }

    // Generate 10 random rooms
    const rooms = [];
    for (let i = 0; i < 10; i++) {
      rooms.push({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
      });
    }
    await roomRepository.save(rooms);

    console.log('✅ Rooms seeded successfully!');
  }
}
