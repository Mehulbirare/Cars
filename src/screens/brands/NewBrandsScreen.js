import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';

const NewBrandsScreen = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {theme} = useTheme();

  // Sample brands data
  const sampleBrands = [
    {id: '1', name: 'BMW', models: 12},
    {id: '2', name: 'Mercedes', models: 15},
    {id: '3', name: 'Audi', models: 10},
    {id: '4', name: 'Toyota', models: 20},
    {id: '5', name: 'Honda', models: 18},
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBrands(sampleBrands);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.brandItem, {backgroundColor: theme.card}]}
      onPress={() => navigation.navigate('Models', {brand: item.name})}>
      <Text style={[styles.brandName, {color: theme.text}]}>{item.name}</Text>
      <Text style={[styles.modelCount, {color: theme.subtleText}]}>
        {item.models} models
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.header, {color: theme.text}]}>
        New Car Brands (API)
      </Text>
      <FlatList
        data={brands}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  brandItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modelCount: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default NewBrandsScreen;