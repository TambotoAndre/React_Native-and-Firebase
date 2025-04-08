import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput as TxInput,
  StyleSheet,
  Image,
} from 'react-native';
import {Gap} from '../../components';
import {
  BackButton,
  Kategori,
  Keterangan,
  Lokasi,
  Submit,
} from '../../assets/icon';
import {Previewfoto} from '../../assets/Image/index';

const UploadId = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Organik');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Confirm', {
      category: selectedCategory,
      description,
      location,
      image: Previewfoto, // Gambar ganti sesuai kebutuhan
    });
  };

  return (
    <View style={styles.container}>
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
      <Image source={Previewfoto} style={styles.Imagecenter} />

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
