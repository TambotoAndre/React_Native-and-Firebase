/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput as TxInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {Gap} from '../../components';
import {
  BackButton,
  Kategori,
  Keterangan,
  Lokasi,
  Submit,
} from '../../assets/icon';
import {collection, addDoc, serverTimestamp, doc, updateDoc, increment} from 'firebase/firestore';
import {auth, db} from '../../firebase'; // pastikan path sesuai

const UploadId = ({navigation, route}) => {
  const {image} = route.params || {}; // Gambar dikirim dari UploadSi
  const [selectedCategory, setSelectedCategory] = useState('Organik');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (!description || !location || !selectedCategory) {
      Alert.alert(
        'Peringatan',
        'Lengkapi semua data (kecuali gambar) sebelum memposting.',
      );
      return;
    }

    Alert.alert(
      'Konfirmasi',
      'Apakah kamu yakin ingin memposting data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Lanjut',
          onPress: async () => {
            try {
              const user = auth.currentUser;

              if (!user) {
                Alert.alert('Gagal', 'Kamu harus login untuk memposting.');
                return;
              }

              const newPost = {
                userId: user.uid,
                category: selectedCategory,
                description: description,
                location: location,
                image: image,
                createdAt: serverTimestamp(),
              };

              // Tambahkan postingan ke collection 'posts'
              await addDoc(collection(db, 'posts'), newPost);

              // Update field 'postings' di dokumen user
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, {
                postingan: increment(1), // Tambahkan 1 ke field postings
              });

              setDescription('');
              setLocation('');
              setSelectedCategory('Organik');

              navigation.navigate('Home');
            } catch (error) {
              console.error('Gagal memposting:', error);
              Alert.alert('Error', 'Terjadi kesalahan saat memposting.');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton style={styles.BackBtn} />
        </TouchableOpacity>
        <Text style={styles.HeadText}>Postingan Baru</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Submit style={styles.Next} />
        </TouchableOpacity>
      </View>

      <Gap height={6} />

      {/* Preview Gambar dari Galeri */}
      {image ? (
        <Image source={{uri: image}} style={styles.Imagecenter} />
      ) : (
        <Text style={{alignSelf: 'center', marginTop: 20, color: 'gray'}}>
          Gambar belum tersedia
        </Text>
      )}

      <Gap height={10} />

      {/* Keterangan */}
      <View style={styles.flax}>
        <Keterangan style={styles.Keterangan} />
        <View>
          <Text style={styles.StylKeterangan}>Keterangan</Text>
          <TxInput
            style={styles.txInputStyl}
            placeholder="Deskripsikan postingan anda di sini..."
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      {/* Lokasi */}
      <View style={styles.flax}>
        <Lokasi style={styles.Keterangan} />
        <View>
          <Text style={styles.StylKeterangan}>Lokasi</Text>
          <TxInput
            style={styles.txInputStyl}
            placeholder="Masukan lokasi anda di sini..."
            value={location}
            onChangeText={setLocation}
          />
        </View>
      </View>

      {/* Kategori */}
      <View style={styles.flax}>
        <Kategori style={styles.Keterangan} />
        <View>
          <Text style={styles.StylKeterangan}>Kategori</Text>
          <View style={styles.flax}>
            <TouchableOpacity onPress={() => setSelectedCategory('Organik')}>
              <Text
                style={[
                  styles.kategoriItem,
                  selectedCategory === 'Organik' && styles.selectedKategori,
                ]}>
                Organik
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedCategory('Anorganik')}>
              <Text
                style={[
                  styles.kategoriItem,
                  selectedCategory === 'Anorganik' && styles.selectedKategori,
                ]}>
                Anorganik
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UploadId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
  },
  Header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  BackBtn: {
    marginTop: 4,
  },
  HeadText: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
    flex: 1,
    textAlign: 'center',
  },
  Next: {
    marginTop: 4,
  },
  Imagecenter: {
    alignSelf: 'center',
    marginTop: 12,
    width: 300,
    height: 180,
    borderRadius: 10,
  },
  flax: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  Keterangan: {
    marginRight: 22,
  },
  StylKeterangan: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#16423C',
    marginBottom: 4,
  },
  txInputStyl: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    width: 220,
    paddingBottom: 2,
    color: '#000',
  },
  kategoriItem: {
    color: '#16423C',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#E9EFEC',
    borderRadius: 24,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#16423C',
  },
  selectedKategori: {
    backgroundColor: '#16423C',
    color: '#FFFFFF',
  },
});
