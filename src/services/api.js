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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchBrands = useCallback(async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = await axios.get(BRANDS_API_URL);
      const data = response.data;
      setBrands(data);
      setFilteredBrands(data);
    } catch (e) {
      console.error('Fetch brands error:', e);
      Alert.alert('Error', 'Failed to fetch brands. Please try again.');
    } finally {
      setLoading(false);
      if (isRefreshing) {
        setRefreshing(false);
      }
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
          b.name?.toLowerCase().includes(lower) ||
          (b.country && b.country.toLowerCase().includes(lower)),
      );
      setFilteredBrands(filtered);
    }
  }, [searchText, brands]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBrands(true);
  }, [fetchBrands]);

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
      Alert.alert('Error', 'Failed to pick image. Please try again.');
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
      logoToSend = 'https://via.placeholder.com/60/cccccc/000000?text=Logo';
    }

    const newBrand = {
      name: brandNameInput.trim(),
      country: countryInput.trim() || 'Unknown',
      logo: logoToSend,
    };

    try {
      setLoading(true);
      await axios.post(BRANDS_API_URL, newBrand);
      await fetchBrands();
      setModalVisible(false);
      resetAddModalInputs();
      Alert.alert('Success', 'Brand added successfully!');
    } catch (err) {
      console.error('Add brand error:', err);
      Alert.alert('Error', 'Failed to add brand. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAddModalInputs = () => {
    setBrandNameInput('');
    setCountryInput('');
    setLogoUrlInput('');
    setLocalLogoUri(null);
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
      logoToSend = brandToEdit.logo || 'https://via.placeholder.com/60/cccccc/000000?text=Logo';
    }

    const updatedBrand = {
      name: editNameInput.trim(),
      country: editCountryInput.trim() || 'Unknown',
      logo: logoToSend,
    };

    try {
      setLoading(true);
      await axios.put(`${BRANDS_API_URL}/${brandToEdit.id}`, updatedBrand);
      await fetchBrands();
      setEditModalVisible(false);
      resetEditModalInputs();
      Alert.alert('Success', 'Brand updated successfully!');
    } catch (err) {
      console.error('Update brand error:', err);
      Alert.alert('Error', 'Failed to update brand. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetEditModalInputs = () => {
    setBrandToEdit(null);
    setEditNameInput('');
    setEditCountryInput('');
    setEditLogoUrlInput('');
    setEditLocalLogoUri(null);
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
              setLoading(true);
              await axios.delete(`${BRANDS_API_URL}/${id}`);
              await fetchBrands();
              Alert.alert('Success', 'Brand deleted successfully!');
            } catch (error) {
              console.error('Delete brand error:', error);
              Alert.alert('Error', 'Failed to delete brand. Please try again.');
            } finally {
              setLoading(false);
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
        onPress={() => navigation.navigate('Models', {brand: item.name})}
        activeOpacity={0.7}>
        <Image
          source={{uri: item.logo}}
          style={styles.brandLogo}
          resizeMode="contain"
          defaultSource={require('../../assets/placeholder.png')}
        />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.country && (
            <Text style={styles.brandCountry} numberOfLines={1}>
              {item.country}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButtonUpdate}
          onPress={() => openEditModal(item)}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButtonDelete}
          onPress={() => deleteBrand(item.id)}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchText ? 'No brands found matching your search' : 'No brands available'}
      </Text>
      {!searchText && (
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add Your First Brand</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && brands.length === 0 ? (
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={styles.loadingText}>Loading brands...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredBrands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id?.toString() || Math.random().toString()}
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
            ListEmptyComponent={renderEmptyList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.primary}
                colors={[theme.primary]}
              />
            }
            keyboardShouldPersistTaps="handled"
          />

          {/* Add Brand Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalTitle}>Add New Brand</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Brand name *"
                    placeholderTextColor={theme.subtleText}
                    value={brandNameInput}
                    onChangeText={setBrandNameInput}
                    autoCapitalize="words"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Country (optional)"
                    placeholderTextColor={theme.subtleText}
                    value={countryInput}
                    onChangeText={setCountryInput}
                    autoCapitalize="words"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Logo URL (optional)"
                    placeholderTextColor={theme.subtleText}
                    value={logoUrlInput}
                    onChangeText={setLogoUrlInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.logoPickerButton}
                    onPress={() => pickLocalImage(uri => setLocalLogoUri(uri))}
                    activeOpacity={0.7}>
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
                        resetAddModalInputs();
                      }}
                      activeOpacity={0.7}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.submitButton]}
                      onPress={handleAddBrand}
                      activeOpacity={0.7}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {/* Edit Brand Modal */}
          <Modal
            visible={editModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setEditModalVisible(false)}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalTitle}>Edit Brand</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Brand name *"
                    placeholderTextColor={theme.subtleText}
                    value={editNameInput}
                    onChangeText={setEditNameInput}
                    autoCapitalize="words"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Country"
                    placeholderTextColor={theme.subtleText}
                    value={editCountryInput}
                    onChangeText={setEditCountryInput}
                    autoCapitalize="words"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Logo URL"
                    placeholderTextColor={theme.subtleText}
                    value={editLogoUrlInput}
                    onChangeText={setEditLogoUrlInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.logoPickerButton}
                    onPress={() =>
                      pickLocalImage(uri => setEditLocalLogoUri(uri))
                    }
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>
                      {editLocalLogoUri
                        ? 'Change Logo Image'
                        : 'Pick Logo Image'}
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
                        resetEditModalInputs();
                      }}
                      activeOpacity={0.7}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.submitButton]}
                      onPress={handleEditSubmit}
                      activeOpacity={0.7}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddModal}
          activeOpacity={0.7}>
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
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: theme.subtleText,
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
    listContainer: {paddingBottom: 16, flexGrow: 1},
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    emptyText: {
      fontSize: 16,
      color: theme.subtleText,
      textAlign: 'center',
      marginBottom: 20,
    },
    emptyButton: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
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
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
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
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    modalButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
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

export default NewBrandsScreen;