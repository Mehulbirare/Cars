import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const FontsScreen = () => {
  const fontSamples = [
    { name: 'Roboto-Regular', style: { fontFamily: 'Roboto-Regular' } },
    { name: 'Roboto-Bold', style: { fontFamily: 'Roboto-Bold' } },
    { name: 'Roboto-Italic', style: { fontFamily: 'Roboto-Italic' } },
    { name: 'OpenSans-Regular', style: { fontFamily: 'OpenSans-Regular' } },
    { name: 'OpenSans-Bold', style: { fontFamily: 'OpenSans-Bold' } },
    { name: 'Montserrat-Regular', style: { fontFamily: 'Montserrat-Regular' } },
    { name: 'Montserrat-Bold', style: { fontFamily: 'Montserrat-Bold' } },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Custom Fonts Demo</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Fonts</Text>
        <Text style={styles.description}>
          This screen demonstrates various custom fonts integrated into the app.
          Tap on any font to see a larger preview.
        </Text>
      </View>

      {fontSamples.map((font, index) => (
        <TouchableOpacity key={index} style={styles.fontCard}>
          <Text style={styles.fontName}>{font.name}</Text>
          <Text style={[styles.sampleText, font.style]}>
            The quick brown fox jumps over the lazy dog
          </Text>
          <Text style={[styles.sampleNumbers, font.style]}>
            0123456789
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Use Custom Fonts</Text>
        <Text style={styles.description}>
          1. Add font files to assets/fonts folder{'\n'}
          2. Link fonts in react-native.config.js{'\n'}
          3. Run npx react-native link{'\n'}
          4. Use fontFamily in your styles
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#0ee5e9',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d0202',
  },
  section: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  fontCard: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
  },
  fontName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0ee5e9',
  },
  sampleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  sampleNumbers: {
    fontSize: 16,
  },
});

export default FontsScreen;