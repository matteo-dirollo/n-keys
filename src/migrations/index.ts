import * as migration_20250511_131525 from './20250511_131525';
import * as migration_20250513_055305 from './20250513_055305';

export const migrations = [
  {
    up: migration_20250511_131525.up,
    down: migration_20250511_131525.down,
    name: '20250511_131525',
  },
  {
    up: migration_20250513_055305.up,
    down: migration_20250513_055305.down,
    name: '20250513_055305'
  },
];
