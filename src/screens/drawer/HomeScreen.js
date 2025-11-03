import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';
import {useFadeIn, useSlideIn} from '../../utils/animations';

const featuredCars = [
  {
    id: '1',
    brand: 'BMW',
    model: 'X5',
    image: 'https://images.pexels.com/photos/7762700/pexels-photo-7762700.jpeg',
    price: '₹99.90 Lakh - ₹1.13 Crore',
    specs: {
      engine: '2998 cc',
      power: '335 bhp',
      mileage: '11.2 kmpl',
      transmission: 'Automatic',
    },
    features: [
      'Panoramic Sunroof',
      'Touchscreen Infotainment',
      '3D Surround View',
    ],
    description:
      'The BMW X5 is a mid-size luxury SUV known for its powerful performance and premium interior.',
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'E-Class',
    image:
      'https://images.pexels.com/photos/12170317/pexels-photo-12170317.jpeg',
    price: '₹76 Lakh - ₹89 Lakh',
    specs: {
      engine: '1991 cc',
      power: '194 bhp',
      mileage: '16.1 kmpl',
      transmission: 'Automatic',
    },
    features: [
      'Widescreen Cockpit',
      'Burmester Surround Sound',
      'Air Body Control',
    ],
    description:
      'The Mercedes-Benz E-Class is the epitome of modern luxury and sophisticated design.',
  },
];

const popularBrands = [
  {
    id: '1',
    name: 'BMW',
    logo: 'https://www.carlogos.org/car-logos/bmw-logo.png',
  },
  {
    id: '2',
    name: 'Mercedes',
    logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png',
  },
  {
    id: '3',
    name: 'Audi',
    logo: 'https://www.carlogos.org/car-logos/audi-logo.png',
  },
  {
    id: '4',
    name: 'Toyota',
    logo: 'https://www.carlogos.org/car-logos/toyota-logo.png',
  },
  {
    id: '5',
    name: 'Honda',
    logo: 'https://www.carlogos.org/car-logos/honda-logo.png',
  },
];

const HomeScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);
  const headerOpacity = useFadeIn(400);
  const {translateY: sectionTranslateY, opacity: sectionOpacity} = useSlideIn(500, 'top');
  const brandTranslateX = useRef(new Animated.Value(50)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(brandTranslateX, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{marginRight: 15}}>
          <Icon name="person" size={28} color={theme.text} />
        </TouchableOpacity>
      ),
      title: 'Home',
    });
  }, [navigation, theme]);

  const featuredCarAnims = featuredCars.map(() => ({
    translateX: new Animated.Value(50),
    opacity: new Animated.Value(0),
  }));

  const brandAnims = popularBrands.map(() => ({
    scale: new Animated.Value(0.8),
    opacity: new Animated.Value(0),
  }));

  useEffect(() => {
    // Animate featured cars
    featuredCarAnims.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.translateX, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Animate brands
    brandAnims.forEach((anim, index) => {
      Animated.parallel([
        Animated.spring(anim.scale, {
          toValue: 1,
          delay: index * 50,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 400,
          delay: index * 50,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const renderFeaturedCar = ({item, index}) => {
    const anim = featuredCarAnims[index];
    return (
      <Animated.View
        style={{
          transform: [{translateX: anim.translateX}],
          opacity: anim.opacity,
        }}>
    <TouchableOpacity
      style={styles.featuredCarItem}
          activeOpacity={0.8}
      onPress={() => navigation.navigate('CarDetail', item)}>
      <Image source={{uri: item.image}} style={styles.featuredCarImage} />
      <View style={styles.featuredCarInfo}>
        <Text style={styles.featuredCarBrand}>{item.brand}</Text>
        <Text style={styles.featuredCarModel}>{item.model}</Text>
        <Text style={styles.featuredCarPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
      </Animated.View>
  );
  };

  const renderBrandItem = ({item, index}) => {
    const anim = brandAnims[index];
    return (
      <Animated.View
        style={{
          transform: [{scale: anim.scale}],
          opacity: anim.opacity,
        }}>
    <TouchableOpacity
      style={styles.brandItem}
          activeOpacity={0.7}
      onPress={() => navigation.navigate('Models', {brand: item.name})}>
      <Image source={{uri: item.logo}} style={styles.brandLogo} />
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
      </Animated.View>
  );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: headerOpacity,
            },
          ]}>
          <Text style={styles.welcomeText}>Welcome to Car Catalog</Text>
          <Text style={styles.subHeaderText}>Find your dream car</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              transform: [{translateY: sectionTranslateY}],
              opacity: sectionOpacity,
            },
          ]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Cars</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredCars}
            renderItem={renderFeaturedCar}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredCarsList}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              transform: [{translateX: brandTranslateX}],
              opacity: brandOpacity,
            },
          ]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Brands</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularBrands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsList}
          />
        </Animated.View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Links</Text>
          </View>
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
    header: {
      padding: 24,
      backgroundColor: theme.primary,
      ...theme.elevation.medium,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: 0.5,
    },
    subHeaderText: {
      fontSize: 16,
      color: theme.subtleText,
      marginTop: 8,
      fontWeight: '500',
    },
    section: {
      marginVertical: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      letterSpacing: 0.3,
    },
    seeAllText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: '600',
    },
    featuredCarsList: {paddingLeft: 16, paddingRight: 8},
    featuredCarItem: {
      width: 300,
      marginRight: 16,
      borderRadius: 16,
      backgroundColor: theme.card,
      overflow: 'hidden',
      ...theme.elevation.medium,
    },
    featuredCarImage: {
      width: '100%',
      height: 180,
      backgroundColor: theme.border,
    },
    featuredCarInfo: {padding: 16},
    featuredCarBrand: {
      fontSize: 12,
      color: theme.subtleText,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    featuredCarModel: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      marginVertical: 6,
      letterSpacing: 0.3,
    },
    featuredCarPrice: {
      fontSize: 16,
      color: theme.primary,
      fontWeight: '700',
    },
    brandsList: {paddingLeft: 16, paddingRight: 8},
    brandItem: {
      alignItems: 'center',
      marginRight: 24,
      width: 90,
      padding: 12,
      backgroundColor: theme.card,
      borderRadius: 12,
      ...theme.elevation.small,
    },
    brandLogo: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
    },
    brandName: {
      marginTop: 10,
      fontSize: 13,
      color: theme.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    quickLinksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      marginTop: 8,
    },
    quickLinkItem: {
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.card,
      borderRadius: 12,
      width: '22%',
      ...theme.elevation.small,
    },
    quickLinkText: {
      marginTop: 10,
      fontSize: 11,
      color: theme.text,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

export default HomeScreen;
