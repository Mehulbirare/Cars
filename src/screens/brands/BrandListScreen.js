// src/screens/brands/BrandListScreen.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

const brandsData = {
  'Wheels': [
    {id: 't1', name: 'MRF', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-mrf-3442111-2875323.png'},
    {id: 't2', name: 'CEAT', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-ceat-3442089-2875299.png'},
    {id: 't3', name: 'Apollo', logo: 'https://companieslogo.com/img/orig/APOLLOTYRE.NS-63b71e16.png?t=1672945174'},
    {id: 't4', name: 'Bridgestone', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-bridgestone-3442086-2875296.png'},
    {id: 't5', name: 'Michelin', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-michelin-7-202739.png'},
    {id: 't6', name: 'Goodyear', logo: 'https://cdn.worldvectorlogo.com/logos/goodyear-2.svg'},
    {id: 't7', name: 'Pirelli', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-pirelli-2-202758.png'},
    {id: 't8', name: 'Yokohama', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-yokohama-1-202798.png'},
    {id: 't9', name: 'JK Tyre', logo: 'https://seeklogo.com/images/J/jk-tyre-logo-4B87555E09-seeklogo.com.png'},
    {id: 't10', name: 'Continental', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-continental-2-202700.png'},
  ],
  'Engine Parts': [
    {id: 'e1', name: 'Castrol', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-castrol-1-202850.png'},
    {id: 'e2', name: 'Mobil', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-mobil-1-202863.png'},
    {id: 'e3', name: 'Shell', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-shell-5-202882.png'},
    {id: 'e4', name: 'Motul', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-motul-1-202865.png'},
    {id: 'e5', name: 'Valvoline', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-valvoline-1-202890.png'},
    {id: 'e6', name: 'Gulf', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-gulf-1-202857.png'},
    {id: 'e7', name: 'Liqui Moly', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-liqui-moly-1-202861.png'},
    {id: 'e8', name: 'HP', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-hp-3-202821.png'},
    {id: 'e9', name: 'Elf', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-elf-2-202853.png'},
    {id: 'e10', name: 'Servo', logo: 'https://seeklogo.com/images/S/servo-logo-71325D342C-seeklogo.com.png'},
  ],
  'Brakes': [
    {id: 'b1', name: 'Brembo', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-brembo-2-202848.png'},
    {id: 'b2', name: 'Bosch', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-bosch-3-202847.png'},
    {id: 'b3', name: 'TVS Girling', logo: 'https://www.tvsgirling.com/wp-content/uploads/2019/07/logo.png'},
    {id: 'b4', name: 'Nissin', logo: 'https://www.nissin-brake.com/en/common/images/logo.png'},
    {id: 'b5', name: 'EBC Brakes', logo: 'https://seeklogo.com/images/E/ebc-brakes-logo-B3475960F1-seeklogo.com.png'},
    {id: 'b6', name: 'Akebono', logo: 'https://akebonobrakes.com/images/default-source/default-album/akebono-logo-black.png'},
    {id: 'b7', name: 'StopTech', logo: 'https://seeklogo.com/images/S/stoptech-logo-9952E84A95-seeklogo.com.png'},
    {id: 'b8', name: 'Hawk', logo: 'https://seeklogo.com/images/H/hawk-performance-logo-5D19DC25D7-seeklogo.com.png'},
    {id: 'b9', name: 'Ferodo', logo: 'https://seeklogo.com/images/F/ferodo-logo-66155985A9-seeklogo.com.png'},
    {id: 'b10', name: 'Mintex', logo: 'https://mintex.com/wp-content/uploads/2021/08/Mintex-Logo.png'},
  ],
  'Suspension': [
      {id: 'su1', name: 'Monroe', logo: 'https://seeklogo.com/images/M/monroe-logo-A27E6A0F49-seeklogo.com.png'},
      {id: 'su2', name: 'Bilstein', logo: 'https://seeklogo.com/images/B/bilstein-logo-B05F4155B7-seeklogo.com.png'},
      {id: 'su3', name: 'Koni', logo: 'https://seeklogo.com/images/K/koni-logo-6B9E31A26D-seeklogo.com.png'},
      {id: 'su4', name: 'Sachs', logo: 'https://seeklogo.com/images/S/sachs-logo-4E381E1925-seeklogo.com.png'},
      {id: 'su5', name: 'Gabriel', logo: 'https://seeklogo.com/images/G/gabriel-logo-9051834241-seeklogo.com.png'},
      {id: 'su6', name: 'KYB', logo: 'https://seeklogo.com/images/K/kyb-logo-725F9AF609-seeklogo.com.png'},
      {id: 'su7', name: 'TRW', logo: 'https://seeklogo.com/images/T/trw-logo-B136C01062-seeklogo.com.png'},
      {id: 'su8', name: 'Fox Racing', logo: 'https://seeklogo.com/images/F/fox-racing-logo-A946D65749-seeklogo.com.png'},
      {id: 'su9', name: 'Öhlins', logo: 'https://seeklogo.com/images/O/ohlins-logo-65922338A9-seeklogo.com.png'},
      {id: 'su10', name: 'Eibach', logo: 'https://seeklogo.com/images/E/eibach-logo-4B07D3E21A-seeklogo.com.png'},
  ],
};

const BrandListScreen = () => {
    const route = useRoute();
    const { theme, isDarkMode } = useTheme();
    const styles = getStyles(theme, isDarkMode);
    const { category } = route.params;

    const data = brandsData[category] || [];

    const renderBrandItem = ({ item }) => (
        <TouchableOpacity style={styles.brandItem}>
            <Image source={{ uri: item.logo }} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.brandName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderBrandItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const getStyles = (theme, isDarkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    listContainer: {
        padding: 16,
    },
    brandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.card,
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        borderWidth: isDarkMode ? 1 : 0,
        borderColor: theme.border,
    },
    brandLogo: {
        width: 60,
        height: 60,
        marginRight: 16,
    },
    brandName: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
    },
});

export default BrandListScreen;