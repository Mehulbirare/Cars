import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

const SpecItem = ({icon, label, value, theme}) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.specItem}>
      <Icon name={icon} size={24} color={theme.primary} />
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
};

const CarDetailScreen = () => {
  const route = useRoute();
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const car = route.params;

  if (!car) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.model}>Car data not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{uri: car.image}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.brand}>{car.brand}</Text>
            <Text style={styles.model}>{car.model}</Text>
          </View>
        </View>
        <Text style={styles.price}>{car.price}</Text>

        {car.specs && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsContainer}>
              <SpecItem
                icon="engineering"
                label="Engine"
                value={car.specs.engine || 'N/A'}
                theme={theme}
              />
              <SpecItem
                icon="bolt"
                label="Power"
                value={car.specs.power || 'N/A'}
                theme={theme}
              />
              <SpecItem
                icon="local-gas-station"
                label="Mileage"
                value={car.specs.mileage || 'N/A'}
                theme={theme}
              />
              <SpecItem
                icon="settings"
                label="Transmission"
                value={car.specs.transmission || 'N/A'}
                theme={theme}
              />
            </View>
          </View>
        )}

        {car.features && car.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {car.features.map(feature => (
              <View key={feature} style={styles.featureItem}>
                <Icon name="check-circle" size={20} color={theme.primary} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    image: {
      width: '100%',
      height: 250,
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    titleContainer: {
      flex: 1,
    },
    brand: {
      fontSize: 18,
      color: theme.subtleText,
    },
    model: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
    },
    price: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.primary,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    section: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
    },
    specsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    specItem: {
      alignItems: 'center',
      width: '48%',
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
    },
    specLabel: {
      fontSize: 14,
      color: theme.subtleText,
      marginTop: 5,
    },
    specValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    featureText: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 10,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CarDetailScreen;
