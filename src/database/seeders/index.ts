import ProductSeeder from './products';
import UserSeeder from './users';

(async () => {
  await ProductSeeder();
  await UserSeeder();

  process.exit();
})();
