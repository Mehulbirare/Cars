import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '../../context/ThemeContext';

const sparePartsData = [
  {id: '1', name: 'Brake Pads', type: 'Braking System', price: '₹3,500'},
  {id: '2', name: 'Oil Filter', type: 'Engine Components', price: '₹800'},
  {id: '3', name: 'Air Filter', type: 'Engine Components', price: '₹1,200'},
  {id: '4', name: 'Spark Plugs', type: 'Ignition System', price: '₹2,000'},
  {id: '5', name: 'Car Battery', type: 'Electrical System', price: '₹5,500'},
  {id: '6', name: 'Alternator', type: 'Electrical System', price: '₹12,000'},
  {id: '7', name: 'Radiator', type: 'Cooling System', price: '₹9,000'},
];

const SparePartsScreen = () => {
  const {theme, isDarkMode} = useTheme();
  const styles = getStyles(theme, isDarkMode);

  const renderSparePartItem = ({item}) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={sparePartsData}
        renderItem={renderSparePartItem}
        keyExtractor={item => item.id}
        estimatedItemSize={75}
        ListHeaderComponent={() => <Text style={styles.headerText}>All Spare Parts</Text>}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme, isDarkMode) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      padding: 16,
      textAlign: 'center',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.card,
    },
    itemTextContainer: {flex: 1},
    itemName: {fontSize: 16, fontWeight: '600', color: theme.text},
    itemType: {fontSize: 14, color: theme.subtleText, marginTop: 4},
    itemPrice: {fontSize: 16, fontWeight: 'bold', color: theme.primary},
  });

export default SparePartsScreen;