import * as migration_20250511_131525 from './20250511_131525';

export const migrations = [
  {
    up: migration_20250511_131525.up,
    down: migration_20250511_131525.down,
    name: '20250511_131525'
  },
];
