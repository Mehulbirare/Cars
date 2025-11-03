import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

const BRANDS_API_URL =
  'https://68e9d6c9f1eeb3f856e51df8.mockapi.io/api/v1/brands';

const NewBrandsScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [brandNameInput, setBrandNameInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [logoUrlInput, setLogoUrlInput] = useState('');
  const [localLogoUri, setLocalLogoUri] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [editNameInput, setEditNameInput] = useState('');
  const [editCountryInput, setEditCountryInput] = useState('');
  const [editLogoUrlInput, setEditLogoUrlInput] = useState('');
  const [editLocalLogoUri, setEditLocalLogoUri] = useState(null);

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(BRANDS_API_URL);
      const data = response.data;
      setBrands(data);
      setFilteredBrands(data);
    } catch (e) {
      Alert.alert('Error', 'Failed to fetch brands.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredBrands(brands);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = brands.filter(
        b =>
          b.name.toLowerCase().includes(lower) ||
          (b.country && b.country.toLowerCase().includes(lower)),
      );
      setFilteredBrands(filtered);
    }
  }, [searchText, brands]);

  const pickLocalImage = async onPick => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (result.didCancel) {
        return;
      }
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        onPick(asset.uri);
      }
    } catch (err) {
      console.warn('Image pick error:', err);
    }
  };

  const handleAddBrand = async () => {
    if (brandNameInput.trim() === '') {
      Alert.alert('Validation', 'Brand name is required');
      return;
    }

    let logoToSend = '';
    if (localLogoUri) {
      logoToSend = localLogoUri;
    } else if (logoUrlInput.trim() !== '') {
      logoToSend = logoUrlInput.trim();
    } else {
      logoToSend = 'https://via.placeholder.com/60/cccccc/000000?Text=New';
    }

    const newBrand = {
      name: brandNameInput.trim(),
      country: countryInput.trim() || 'Unknown',
      logo: logoToSend,
    };

    try {
      await axios.post(BRANDS_API_URL, newBrand);
      fetchBrands();
      setModalVisible(false);
      setBrandNameInput('');
      setCountryInput('');
      setLogoUrlInput('');
      setLocalLogoUri(null);
      Alert.alert('Success', 'Brand added successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to add brand.');
    }
  };

  const openEditModal = item => {
    setBrandToEdit(item);
    setEditNameInput(item.name || '');
    setEditCountryInput(item.country || '');
    setEditLogoUrlInput(item.logo || '');
    setEditLocalLogoUri(null);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    if (!brandToEdit) return;

    if (editNameInput.trim() === '') {
      Alert.alert('Validation', 'Brand name is required');
      return;
    }

    let logoToSend = '';
    if (editLocalLogoUri) {
      logoToSend = editLocalLogoUri;
    } else if (editLogoUrlInput.trim() !== '') {
      logoToSend = editLogoUrlInput.trim();
    } else {
      logoToSend = brandToEdit.logo;
    }

    const updatedBrand = {
      name: editNameInput.trim(),
      country: editCountryInput.trim() || 'Unknown',
      logo: logoToSend,
    };

    try {
      await axios.put(`${BRANDS_API_URL}/${brandToEdit.id}`, updatedBrand);
      fetchBrands();
      setEditModalVisible(false);
      setBrandToEdit(null);
      setEditNameInput('');
      setEditCountryInput('');
      setEditLogoUrlInput('');
      setEditLocalLogoUri(null);
      Alert.alert('Success', 'Brand updated successfully!');
    } catch (err) {
      Alert.alert('Error', 'Failed to update brand.');
    }
  };

  const deleteBrand = async id => {
    Alert.alert(
      'Delete Brand',
      'Are you sure you want to delete this brand?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BRANDS_API_URL}/${id}`);
              fetchBrands();
              Alert.alert('Success', 'Brand deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete brand.');
            }
          },
        },
      ],
    );
  };

  const renderBrandItem = ({item}) => (
    <View style={styles.brandItem}>
      <TouchableOpacity
        style={styles.brandInfo}
        onPress={() => navigation.navigate('Models', {brand: item.name})}>
        <Image
          source={{uri: item.logo}}
          style={styles.brandLogo}
          resizeMode="contain"
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandName}>{item.name}</Text>
          {item.country && (
            <Text style={styles.brandCountry}>{item.country}</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButtonUpdate}
          onPress={() => openEditModal(item)}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButtonDelete}
          onPress={() => deleteBrand(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && brands.length === 0 ? (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={filteredBrands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={
              <Header
                theme={theme}
                searchText={searchText}
                setSearchText={setSearchText}
                openAddModal={() => setModalVisible(true)}
                searchInputRef={searchInputRef}
              />
            }
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={fetchBrands}
                tintColor={theme.text}
              />
            }
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No brands found</Text>
              </View>
            }
          />

          {/* Add Brand Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Brand</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Brand name *"
                  placeholderTextColor={theme.subtleText}
                  value={brandNameInput}
                  onChangeText={setBrandNameInput}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Country (optional)"
                  placeholderTextColor={theme.subtleText}
                  value={countryInput}
                  onChangeText={setCountryInput}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Logo URL (optional)"
                  placeholderTextColor={theme.subtleText}
                  value={logoUrlInput}
                  onChangeText={setLogoUrlInput}
                />
                <TouchableOpacity
                  style={styles.logoPickerButton}
                  onPress={() => pickLocalImage(uri => setLocalLogoUri(uri))}>
                  <Text style={styles.buttonText}>
                    {localLogoUri ? 'Change Logo Image' : 'Pick Logo Image'}
                  </Text>
                </TouchableOpacity>
                {localLogoUri && (
                  <Image
                    source={{uri: localLogoUri}}
                    style={styles.previewLogo}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => {
                      setModalVisible(false);
                      setBrandNameInput('');
                      setCountryInput('');
                      setLogoUrlInput('');
                      setLocalLogoUri(null);
                    }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton]}
                    onPress={handleAddBrand}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Edit Brand Modal */}
          <Modal
            visible={editModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setEditModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Brand</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Brand name *"
                  placeholderTextColor={theme.subtleText}
                  value={editNameInput}
                  onChangeText={setEditNameInput}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Country"
                  placeholderTextColor={theme.subtleText}
                  value={editCountryInput}
                  onChangeText={setEditCountryInput}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Logo URL"
                  placeholderTextColor={theme.subtleText}
                  value={editLogoUrlInput}
                  onChangeText={setEditLogoUrlInput}
                />
                <TouchableOpacity
                  style={styles.logoPickerButton}
                  onPress={() =>
                    pickLocalImage(uri => setEditLocalLogoUri(uri))
                  }>
                  <Text style={styles.buttonText}>
                    {editLocalLogoUri ? 'Change Logo Image' : 'Pick Logo Image'}
                  </Text>
                </TouchableOpacity>
                {(editLocalLogoUri || brandToEdit?.logo) && (
                  <Image
                    source={{uri: editLocalLogoUri || brandToEdit.logo}}
                    style={styles.previewLogo}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => {
                      setEditModalVisible(false);
                      setBrandToEdit(null);
                      setEditNameInput('');
                      setEditCountryInput('');
                      setEditLogoUrlInput('');
                      setEditLocalLogoUri(null);
                    }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton]}
                    onPress={handleEditSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const Header = ({
  theme,
  searchText,
  setSearchText,
  openAddModal,
  searchInputRef,
}) => {
  const styles = getStyles(theme);
  return (
    <View>
      <Text style={styles.headerText}>Manage Brands (API)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.input}
          placeholder="Search brands or country..."
          placeholderTextColor={theme.subtleText}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          autoCorrect={false}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.buttonText}>Add Brand</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: theme.background},
    center: {justifyContent: 'center', alignItems: 'center'},
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      margin: 16,
      textAlign: 'center',
    },
    inputContainer: {paddingHorizontal: 16, marginBottom: 16},
    input: {
      height: 40,
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
    addButton: {
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {color: 'white', fontWeight: 'bold'},
    listContainer: {paddingBottom: 16},
    emptyContainer: {
      padding: 20,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.subtleText,
    },
    brandItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
    },
    brandInfo: {flexDirection: 'row', alignItems: 'center', flex: 1},
    brandLogo: {width: 60, height: 60, marginRight: 16},
    brandTextContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    brandName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    brandCountry: {
      fontSize: 14,
      color: theme.subtleText,
      marginTop: 4,
    },
    actionsContainer: {flexDirection: 'row'},
    actionButtonUpdate: {
      backgroundColor: '#28a745',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    actionButtonDelete: {
      backgroundColor: '#dc3545',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 12,
      textAlign: 'center',
    },
    modalInput: {
      height: 40,
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    logoPickerButton: {
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    previewLogo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 10,
    },
    modalButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    cancelButton: {
      backgroundColor: '#888',
    },
    submitButton: {
      backgroundColor: theme.primary,
    },
  });

export default NewBrandsScreen