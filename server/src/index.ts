import { startServer } from './app';

try {
  (async () => startServer())();
} catch (err) {
  if (err) console.error(err);
}
