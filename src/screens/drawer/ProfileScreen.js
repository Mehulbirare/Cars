import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';
import {observer} from 'mobx-react-lite';
import authStore from '../../store/AuthStore';
import axios from 'axios';

const ProfileScreen = observer(() => {
  const {isDarkMode, toggleTheme, theme} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        'https://api.yourapp.com/v1/users/profile',
      );
      console.log('User Profile Data:', response.data);
    } catch (error) {
      console.error(
        'Failed to fetch profile:',
        error.response?.data || error.message,
      );
    }
  };

  const handleSignOut = () => {
    authStore.logout();
    navigation.replace('Login');
  };

  const getInitial = email => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.headerBackground}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {getInitial(authStore.userEmail)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>
                Hi, {authStore.userEmail?.split('@')[0]}!
              </Text>
              <Text style={styles.email}>{authStore.userEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={fetchUserProfile}>
            <Text style={styles.manageButtonText}>Fetch Profile Data</Text>
          </TouchableOpacity>

          <View style={styles.settingsContainer}>
            <View style={styles.actionButton}>
              <Icon name="brightness-6" size={24} color={theme.subtleText} />
              <Text style={styles.actionText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: theme.primary}}
              thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="person-add" size={24} color={theme.subtleText} />
              <Text style={styles.actionText}>Add account</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSignOut}>
              <Icon name="logout" size={24} color={theme.subtleText} />
              <Text style={styles.actionText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const getStyles = theme =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    headerBackground: {
      width: '100%',
      backgroundColor: theme.primary,
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    profileContainer: {flex: 1, padding: 20},
    profileHeader: {flexDirection: 'row', alignItems: 'center'},
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {fontSize: 28, fontWeight: 'bold', color: theme.primary},
    profileInfo: {flex: 1, marginLeft: 16},
    greeting: {fontSize: 20, fontWeight: 'bold', color: 'white'},
    email: {fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 4},
    manageButton: {
      backgroundColor: theme.card,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignSelf: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    manageButtonText: {color: theme.text, fontWeight: 'bold', fontSize: 14},
    settingsContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: theme.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    actionContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    actionText: {marginLeft: 15, color: theme.text, fontSize: 16},
    divider: {height: 1, backgroundColor: theme.border, marginHorizontal: 10},
  });

export default ProfileScreen;