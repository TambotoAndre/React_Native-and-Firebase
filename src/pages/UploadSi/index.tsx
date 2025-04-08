import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Cancel from '../../assets/icon/cancel.svg';
import Next from '../../assets/icon/next.svg';

const UploadSi = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          setSelectedImage(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Cancel style={styles.cancel} />
        </TouchableOpacity>
        <Text style={styles.headText}>Postingan Baru</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UploadId', {image: selectedImage})
          }>
          <Next style={styles.next} />
        </TouchableOpacity>
      </View>

      {/* Gambar yang dipilih */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.previewImage} />
        ) : (
          <Text style={styles.pickText}>Pilih Gambar dari Galeri</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadSi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 60,
    paddingHorizontal: 19,
    justifyContent: 'space-between',
  },
  cancel: {
    marginTop: 10,
  },
  headText: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
  },
  next: {
    marginTop: 10,
  },
  imagePicker: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pickText: {
    color: '#333',
    fontSize: 16,
  },
});
