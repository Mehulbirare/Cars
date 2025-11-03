import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {StoreProvider} from './src/store/RootStore';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const {isDarkMode} = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
        animated
      />
      <AppNavigator />
    </>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
