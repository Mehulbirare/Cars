import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';
import favoritesStore from '../../store/FavoritesStore';

const productsData = {
  MRF: [
    {
      id: 'p1',
      name: 'MRF ZVTV',
      price: '₹3,500',
      image: 'https://via.placeholder.com/150/FF5733/FFFFFF?Text=MRF+ZVTV',
    },
    {
      id: 'p2',
      name: 'MRF Wanderer',
      price: '₹5,200',
      image: 'https://via.placeholder.com/150/FF5733/FFFFFF?Text=MRF+Wanderer',
    },
  ],
  CEAT: [
    {
      id: 'p3',
      name: 'CEAT Milaze',
      price: '₹3,200',
      image: 'https://via.placeholder.com/150/33FF57/FFFFFF?Text=CEAT+Milaze',
    },
  ],
  Castrol: [
    {
      id: 'p4',
      name: 'Castrol MAGNATEC',
      price: '₹1,200',
      image:
        'https://via.placeholder.com/150/3357FF/FFFFFF?Text=Castrol+Magnatec',
    },
    {
      id: 'p5',
      name: 'Castrol POWER1',
      price: '₹1,500',
      image:
        'https://via.placeholder.com/150/3357FF/FFFFFF?Text=Castrol+Power1',
    },
  ],
};

const ProductListScreen = observer(() => {
  const route = useRoute();
  const {theme, isDarkMode} = useTheme();
  const styles = getStyles(theme, isDarkMode);
  const {brand} = route.params;

  const data = productsData[brand] || [];

  const renderProductItem = ({item}) => {
    const isSaved = favoritesStore.isFavorite(item.id);

    return (
      <View style={styles.productItem}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            isSaved
              ? favoritesStore.removeFavorite(item.id)
              : favoritesStore.addFavorite(item)
          }>
          <Icon
            name={isSaved ? 'favorite' : 'favorite-border'}
            size={28}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found for {brand}.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
});

const getStyles = (theme, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    listContainer: {
      padding: 16,
    },
    productItem: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    productPrice: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.primary,
      marginTop: 8,
    },
    emptyContainer: {
      flex: 1,
      marginTop: 50,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.subtleText,
    },
  });

export default ProductListScreen;
