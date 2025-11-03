import React from 'react';
import authStore from './AuthStore';
import favoritesStore from './FavoritesStore';
import carStore from './CarStore';

export const stores = {
  authStore,
  favoritesStore,
  carStore
};

export const StoreContext = React.createContext(stores);

export const useStores = () => React.useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};