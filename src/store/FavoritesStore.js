import { makeObservable, observable, action, computed } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FavoritesStore {
  favorites = [];

  constructor() {
    makeObservable(this, {
      favorites: observable,
      addFavorite: action,
      removeFavorite: action,
      clearFavorites: action,
      isFavorite: computed,
      favoriteCount: computed,
    });

    makePersistable(this, {
      name: 'FavoritesStore',
      properties: ['favorites'],
      storage: AsyncStorage,
    });
  }

  addFavorite = (item) => {
    if (!this.favorites.some(fav => fav.id === item.id)) {
      this.favorites.push(item);
    }
  };

  removeFavorite = (itemId) => {
    this.favorites = this.favorites.filter(item => item.id !== itemId);
  };
  clearFavorites = () => {
    this.favorites = [];
  };

  get isFavorite() {
    return (itemId) => this.favorites.some(item => item.id === itemId);
  }

  get favoriteCount() {
    return this.favorites.length;
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;