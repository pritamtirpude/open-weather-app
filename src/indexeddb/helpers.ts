import type { FavoriteLocation } from '..';
import { db } from './db';

export const addToFavorites = async (location: FavoriteLocation) => {
  try {
    await db.favorites.add(location);
    console.log('Location added to favorites:', location);
  } catch (error) {
    console.error('Failed to add location to favorites:', error);
  }
};
