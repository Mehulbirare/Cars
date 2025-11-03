import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

const MoreScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const styles = getStyles(theme, isDarkMode);

  const menuItems = [
    { id: '1', title: 'Settings', icon: 'settings' },
    { id: '2', title: 'Notifications', icon: 'notifications' },
    { id: '3', title: 'Saved Cars', icon: 'favorite' },
    { id: '4', title: 'Recent Searches', icon: 'history' },
    { id: '5', title: 'Compare Cars', icon: 'compare' },
    { id: '6', title: 'Dealerships', icon: 'location-on' },
    { id: '7', title: 'Help & Support', icon: 'help' },
    { id: '8', title: 'About Us', icon: 'info' },
    { id: '9', title: 'Privacy Policy', icon: 'privacy-tip' },
    { id: '10', title: 'Terms of Service', icon: 'description' },
  ];

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }, [navigation]);

  const renderMenuItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <View style={styles.menuIconContainer}>
        <Icon name={item.icon} size={24} color={theme.primary} />
      </View>
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Icon name="chevron-right" size={24} color={theme.subtleText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.text}
          />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>More Options</Text>
          <Text style={styles.subHeaderText}>Explore additional features and settings</Text>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
  },
  subHeaderText: {
    fontSize: 14,
    color: theme.subtleText,
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: theme.card,
    borderRadius: 10,
    margin: 16,
    elevation: isDarkMode ? 0 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: theme.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    marginLeft: 10,
  },
  versionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: theme.subtleText,
  },
});

export default MoreScreen;