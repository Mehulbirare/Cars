import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, ActivityIndicator, Text, Platform} from 'react-native';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme, darkTheme} from '../context/ThemeContext';
import authStore from '../store/AuthStore';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import BrandsScreen from '../screens/brands/BrandsScreen';
import ModelsScreen from '../screens/models/ModelsScreen';
import CarDetailScreen from '../screens/details/CarDetailScreen';
import ProfileScreen from '../screens/drawer/ProfileScreen';
import MoreScreen from '../screens/drawer/MoreScreen';
import HomeScreen from '../screens/drawer/HomeScreen';
import ItemsScreen from '../screens/drawer/ItemsScreen';
import BrandListScreen from '../screens/brands/BrandListScreen';
import ProductListScreen from '../screens/products/ProductListScreen';
import FavoritesScreen from '../screens/drawer/FavoritesScreen';
import NewBrandsScreen from '../screens/brands/NewBrandsScreen';
import FontsScreen from '../screens/drawer/FontsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const SplashScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
);

const DrawerNavigator = () => {
  const {theme} = useTheme();
  
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          letterSpacing: 0.5,
        },
        drawerStyle: {
          backgroundColor: theme.card,
          width: 280,
        },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.subtleText,
        drawerLabelStyle: {
          marginLeft: 0,
          fontSize: 16,
          fontWeight: '500',
        },
        drawerIconStyle: {
          marginRight: 0,
        },
        drawerItemStyle: {
          marginVertical: 4,
          paddingHorizontal: 16,
          borderRadius: 8,
        },
        drawerType: 'front',
        overlayColor: theme.overlay,
        drawerActiveBackgroundColor: theme.background,
        animationType: 'slide',
      }}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="directions-car" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="NewBrands"
        component={NewBrandsScreen}
        options={{
          title: 'New Brands (API)',
          drawerIcon: ({color, size}) => (
            <Icon name="api" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="category" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="favorite" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="person" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="More"
        component={MoreScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="more-horiz" size={size || 24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Fonts"
        component={FontsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="text-format" size={size || 24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = observer(() => {
  const {theme} = useTheme();

  if (!authStore.isHydrated) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      theme={{
        dark: theme.background === darkTheme.background,
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.card,
          text: theme.text,
          border: theme.border,
          notification: theme.accent,
        },
        fonts: {
          regular: {
            fontFamily: Platform.select({
              ios: 'System',
              android: 'sans-serif',
              default: 'System',
            }),
            fontWeight: '400',
          },
          medium: {
            fontFamily: Platform.select({
              ios: 'System',
              android: 'sans-serif-medium',
              default: 'System',
            }),
            fontWeight: '500',
          },
          bold: {
            fontFamily: Platform.select({
              ios: 'System',
              android: 'sans-serif',
              default: 'System',
            }),
            fontWeight: '700',
          },
          heavy: {
            fontFamily: Platform.select({
              ios: 'System',
              android: 'sans-serif',
              default: 'System',
            }),
            fontWeight: '800',
          },
        },
      }}>
      <Stack.Navigator
        initialRouteName={authStore.isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.card,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            letterSpacing: 0.5,
          },
          headerBackTitleVisible: false,
          animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
          animationDuration: 300,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Models"
          component={ModelsScreen}
          options={({route}) => ({title: `${route.params.brand} Models`})}
        />
        <Stack.Screen
          name="CarDetail"
          component={CarDetailScreen}
          options={({route}) => ({title: route.params.model})}
        />
        <Stack.Screen
          name="BrandList"
          component={BrandListScreen}
          options={({route}) => ({title: `${route.params.category}`})}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({route}) => ({title: route.params.brand})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;