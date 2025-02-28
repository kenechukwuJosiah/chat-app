import { AppDataSource } from './data-source';
import { RoomSeeder } from './seed.room';
import { UserSeeder } from './seed.users';

AppDataSource.initialize()
  .then(async () => {
    console.log('🌱 Running user seeder...');
    await UserSeeder.run(AppDataSource);
    await RoomSeeder.run(AppDataSource);
    console.log('✅ Seeding complete!');
    process.exit();
  })
  .catch((error) => {
    console.error('❌ Error running seeder:', error);
    process.exit(1);
  });
