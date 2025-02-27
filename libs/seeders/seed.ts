import { AppDataSource } from './data-source';
import { UserSeeder } from './seed.users';

AppDataSource.initialize()
  .then(async () => {
    console.log('🌱 Running user seeder...');
    await UserSeeder.run(AppDataSource);
    console.log('✅ Seeding complete!');
    process.exit();
  })
  .catch((error) => {
    console.error('❌ Error running seeder:', error);
    process.exit(1);
  });
