import * as migration_20250511_131525 from './20250511_131525';
import * as migration_20250513_055305 from './20250513_055305';
import * as migration_20250517_164021 from './20250517_164021';
import * as migration_20250517_175604 from './20250517_175604';
import * as migration_20250517_195703 from './20250517_195703';
import * as migration_20250518_162242 from './20250518_162242';
import * as migration_20250523_083657 from './20250523_083657';

export const migrations = [
  {
    up: migration_20250511_131525.up,
    down: migration_20250511_131525.down,
    name: '20250511_131525',
  },
  {
    up: migration_20250513_055305.up,
    down: migration_20250513_055305.down,
    name: '20250513_055305',
  },
  {
    up: migration_20250517_164021.up,
    down: migration_20250517_164021.down,
    name: '20250517_164021',
  },
  {
    up: migration_20250517_175604.up,
    down: migration_20250517_175604.down,
    name: '20250517_175604',
  },
  {
    up: migration_20250517_195703.up,
    down: migration_20250517_195703.down,
    name: '20250517_195703',
  },
  {
    up: migration_20250518_162242.up,
    down: migration_20250518_162242.down,
    name: '20250518_162242',
  },
  {
    up: migration_20250523_083657.up,
    down: migration_20250523_083657.down,
    name: '20250523_083657'
  },
];
