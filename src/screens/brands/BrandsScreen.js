import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getBrands } from '../../services/api';

const BrandsScreen = ({ navigation }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // For demo purposes, using mock data
        const mockBrands = [
          { id: 1, name: 'Toyota', logo: 'https://example.com/toyota.png' },
          { id: 2, name: 'Honda', logo: 'https://example.com/honda.png' },
          { id: 3, name: 'BMW', logo: 'https://example.com/bmw.png' },
          { id: 4, name: 'Mercedes', logo: 'https://example.com/mercedes.png' },
          { id: 5, name: 'Audi', logo: 'https://example.com/audi.png' },
        ];
        setBrands(mockBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.brandItem, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('Models', { brandId: item.id, brandName: item.name })}
    >
      <View style={styles.brandContent}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: item.logo }}
            style={styles.logo}
            defaultSource={require('../../assets/images/qw.jpg')}
          />
        </View>
        <Text style={[styles.brandName, { color: theme.text }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading brands...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={brands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  brandItem: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  brandContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BrandsScreen;