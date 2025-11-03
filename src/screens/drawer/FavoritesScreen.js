import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import favoritesStore from '../../store/FavoritesStore';
import {useTheme} from '../../context/ThemeContext';

const FavoritesScreen = observer(() => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const renderSavedItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => favoritesStore.removeFavorite(item.id)}>
        <Icon name="delete" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          You have {favoritesStore.favoriteCount} favorite items
        </Text>
      </View>
      <FlatList
        data={favoritesStore.favorites.slice()}
        keyExtractor={item => item.id}
        renderItem={renderSavedItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="favorite-border" size={50} color={theme.subtleText} />
            <Text style={styles.emptyText}>
              You haven't saved any items yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
});

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerText: {
      fontSize: 16,
      color: theme.subtleText,
      textAlign: 'center',
    },
    listContainer: {
      padding: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 12,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    itemPrice: {
      fontSize: 14,
      color: theme.subtleText,
      marginTop: 4,
    },
    emptyContainer: {
      flex: 1,
      marginTop: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.subtleText,
    },
  });

export default FavoritesScreen;
