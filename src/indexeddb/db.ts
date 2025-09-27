import Dexie, { type EntityTable } from 'dexie';
import type { FavoriteLocation } from '..';

export const db = new Dexie('SkyWatchDB') as Dexie & {
  favorites: EntityTable<FavoriteLocation, 'id'>;
};

db.version(1).stores({
  favorites: 'id, name, latitude, longitude, country, country_code, admin1, timezone',
});
