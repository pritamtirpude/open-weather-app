import type { FavoriteLocation } from '..';
import { db } from './db';

export const addToFavorites = async (location: FavoriteLocation) => {
  try {
    await db.favorites.add(location);
  } catch (error) {
    console.error('Failed to add location to favorites:', error);
  }
};
