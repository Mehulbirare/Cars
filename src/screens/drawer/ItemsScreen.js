import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';

const bannerData = [
  {
    id: '1',
    image:
      'https://static.vecteezy.com/system/resources/previews/028/295/170/non_2x/sport-car-logo-template-illustration-of-sport-car-icon-on-black-background-free-vector.jpg',
  },
  {
    id: '2',
    image:
      'https://www.shutterstock.com/image-vector/vector-illustration-car-parts-background-600nw-2196942823.jpg',
  },
];

const categorySectionsData = [
  {
    title: 'Popular Tire Brands',
    layout: 'scroll',
    items: [
      {
        id: 't1',
        name: 'MRF',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-mrf-3442111-2875323.png',
      },
      {
        id: 't2',
        name: 'CEAT',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-ceat-3442089-2875299.png',
      },
      {
        id: 't3',
        name: 'Apollo',
        logo: 'https://companieslogo.com/img/orig/APOLLOTYRE.NS-63b71e16.png?t=1672945174',
      },
      {
        id: 't4',
        name: 'Bridgestone',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-bridgestone-3442086-2875296.png',
      },
      {
        id: 't5',
        name: 'Michelin',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-michelin-7-202739.png',
      },
    ],
  },
  {
    title: 'Top Engine Oil Brands',
    layout: 'grid',
    items: [
      {
        id: 'e1',
        name: 'Castrol',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-castrol-1-202850.png',
      },
      {
        id: 'e2',
        name: 'Mobil',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-mobil-1-202863.png',
      },
      {
        id: 'e3',
        name: 'Shell',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-shell-5-202882.png',
      },
      {
        id: 'e4',
        name: 'Motul',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-motul-1-202865.png',
      },
    ],
  },
];

const {width} = Dimensions.get('window');

const SearchBar = ({theme}) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={24}
        color={theme.subtleText}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search for Parts and Brands..."
        style={styles.searchInput}
        placeholderTextColor={theme.subtleText}
      />
    </View>
  );
};

const BannerCarousel = ({data, theme}) => {
  const styles = getStyles(theme);
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <Image source={{uri: item.image}} style={styles.bannerImage} />
      )}
    />
  );
};

const BrandScroller = ({data, theme}) => {
  const styles = getStyles(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{data.title}</Text>
      <FlatList
        data={data.items}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 16}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() =>
              navigation.navigate('ProductList', {
                brand: item.name,
                categoryTitle: data.title,
              })
            }>
            <Image
              source={{uri: item.logo}}
              style={styles.categoryImage}
              resizeMode="contain"
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const BrandGrid = ({data, theme}) => {
  const styles = getStyles(theme);
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{data.title}</Text>
      <FlatList
        data={data.items}
        keyExtractor={item => item.id}
        numColumns={4}
        scrollEnabled={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.brandGridItem}
            onPress={() =>
              navigation.navigate('ProductList', {
                brand: item.name,
                categoryTitle: data.title,
              })
            }>
            <Image
              source={{uri: item.logo}}
              style={styles.brandGridImage}
              resizeMode="contain"
            />
            <Text style={styles.brandGridName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const QuickLinks = ({title, theme}) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.quickLinksContainer}>
        <TouchableOpacity style={styles.quickLinkItem}>
          <Icon name="directions-car" size={24} color={theme.primary} />
          <Text style={styles.quickLinkText}>New Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLinkItem}>
          <Icon name="favorite" size={24} color={theme.primary} />
          <Text style={styles.quickLinkText}>Saved Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLinkItem}>
          <Icon name="compare" size={24} color={theme.primary} />
          <Text style={styles.quickLinkText}>Compare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLinkItem}>
          <Icon name="local-offer" size={24} color={theme.primary} />
          <Text style={styles.quickLinkText}>Deals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemsScreen = () => {
  const {theme} = useTheme();

  return (
    <SafeAreaView style={getStyles(theme).container}>
      <ScrollView contentContainerStyle={getStyles(theme).scrollContainer}>
        <View style={getStyles(theme).header}>
          <Text style={getStyles(theme).welcomeText}>
            Items and Accessories
          </Text>
          <Text style={getStyles(theme).subHeaderText}>
            Find parts for your car
          </Text>
        </View>

        <SearchBar theme={theme} />

        <BannerCarousel data={bannerData} theme={theme} />

        {categorySectionsData.map(section => {
          if (section.layout === 'grid') {
            return (
              <BrandGrid key={section.title} data={section} theme={theme} />
            );
          }
          return (
            <BrandScroller key={section.title} data={section} theme={theme} />
          );
        })}

        <QuickLinks title="Quick Links" theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    scrollContainer: {
      paddingBottom: 20,
    },
    header: {padding: 20, backgroundColor: theme.primary},
    welcomeText: {fontSize: 24, fontWeight: 'bold', color: '#000'},
    subHeaderText: {fontSize: 16, color: 'rgba(0,0,0,0.8)', marginTop: 5},
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: 8,
      margin: 16,
      paddingHorizontal: 10,
      elevation: 3,
    },
    searchIcon: {marginRight: 10},
    searchInput: {flex: 1, height: 45, color: theme.text, fontSize: 16},
    bannerImage: {width: width, height: 180, resizeMode: 'cover'},
    section: {marginVertical: 15},
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    categorySection: {
      backgroundColor: theme.card,
      paddingVertical: 16,
      marginVertical: 4,
    },
    categoryItem: {width: 100, marginRight: 16, alignItems: 'center'},
    categoryImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: theme.background,
      padding: 5,
    },
    categoryName: {
      color: theme.text,
      marginTop: 8,
      textAlign: 'center',
      fontSize: 12,
    },
    gridSection: {
      backgroundColor: theme.card,
      paddingVertical: 16,
      marginVertical: 4,
    },
    brandGridItem: {flex: 1, alignItems: 'center', margin: 4, padding: 8},
    brandGridImage: {width: 60, height: 60, borderRadius: 8},
    brandGridName: {
      color: theme.text,
      marginTop: 8,
      textAlign: 'center',
      fontSize: 12,
      height: 30,
    },
    quickLinksSection: {
      paddingVertical: 16,
      marginVertical: 4,
    },
    quickLinksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 15,
      marginTop: 5,
    },
    quickLinkItem: {
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.card,
      borderRadius: 10,
      width: '22%',
      elevation: 2,
    },
    quickLinkText: {
      marginTop: 8,
      fontSize: 12,
      color: theme.text,
      textAlign: 'center',
    },
  });

export default ItemsScreen;
