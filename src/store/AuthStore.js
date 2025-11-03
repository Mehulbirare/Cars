import {makeObservable, observable, action} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favoritesStore from './FavoritesStore';

class AuthStore {
  isLoggedIn = false;
  userEmail = null;
  isHydrated = false;

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      userEmail: observable,
      isHydrated: observable,
      login: action,
      logout: action,
      setHydrated: action,
    });

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['isLoggedIn', 'userEmail'],
      storage: AsyncStorage,
    }).then(this.setHydrated);
  }

  login = email => {
    this.isLoggedIn = true;
    this.userEmail = email;
  };

  logout = () => {
    this.isLoggedIn = false;
    this.userEmail = null;
    favoritesStore.clearFavorites();
  };

  setHydrated = () => {
    this.isHydrated = true;
  };
}

const authStore = new AuthStore();
export default authStore;