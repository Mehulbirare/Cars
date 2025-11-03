import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {useTheme} from '../../context/ThemeContext';

const tireData = [
  { id: '1', name: 'All-Season Tires', image: 'https://via.placeholder.com/150/FF5733/FFFFFF?Text=All-Season' },
  { id: '2', name: 'Summer Tires', image: 'https://via.placeholder.com/150/33FF57/FFFFFF?Text=Summer' },
  { id: '3', name: 'Winter Tires', image: 'https://via.placeholder.com/150/3357FF/FFFFFF?Text=Winter' },
  { id: '4', name: 'All-Terrain Tires', image: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?Text=All-Terrain' },
  { id: '5', name: 'Mud-Terrain Tires', image: 'https://via.placeholder.com/150/A52A2A/FFFFFF?Text=Mud-Terrain' },
  { id: '6', name: 'Performance Tires', image: 'https://via.placeholder.com/150/DC143C/FFFFFF?Text=Performance' },
  { id: '7', name: 'Touring Tires', image: 'https://via.placeholder.com/150/008080/FFFFFF?Text=Touring' },
  { id: '8', name: 'Run-Flat Tires', image: 'https://via.placeholder.com/150/4682B4/FFFFFF?Text=Run-Flat' },
];

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 2;

const WheelsScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [dataProvider] = useState(
    new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(tireData),
  );

  const [layoutProvider] = useState(
    new LayoutProvider(
      (index) => 'GRID',
      (type, dim) => {
        dim.width = width / NUM_COLUMNS;
        dim.height = width / NUM_COLUMNS + 40;
      },
    ),
  );

  const rowRenderer = (type, item) => {
    return (
      <TouchableOpacity style={styles.gridItem}>
        <Image source={{uri: item.image}} style={styles.gridImage} />
        <Text style={styles.gridItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    gridItem: {
      flex: 1,
      margin: 8,
      backgroundColor: theme.card,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      alignItems: 'center',
    },
    gridImage: {
      width: '100%',
      height: '80%',
      resizeMode: 'cover',
    },
    gridItemText: {
      flex: 1,
      padding: 10,
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
  });

export default WheelsScreen;