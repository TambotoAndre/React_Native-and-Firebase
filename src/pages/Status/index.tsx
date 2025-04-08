import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../assets/icon';
import { Waste1, Waste2 } from '../../assets/Image/index';
import { Shadow } from 'react-native-shadow-2';
import React from 'react';

const Status = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statusButtonContainer}>
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.statusText}>Status</Text>
      </View>
      <View style={{ rowGap: 20 }}>
        <View style={styles.listContainer}>
          <Shadow distance={5} offset={[-2, 1]}>
            <Image source={Waste1} style={styles.image} />
          </Shadow>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text} numberOfLines={2}>
              Konfirmasi apakah Transaksi telah berhasil atau gagal.
            </Text>
            <Text style={styles.text}>Date: xx - xx - xxxx</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF0909' }]}>
                <Text style={styles.buttonText}>Gagal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#16423C' }]}>
                <Text style={styles.buttonText}>Berhasil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.listContainer}>
          <Shadow distance={5} offset={[-2, 1]}>
            <Image source={Waste2} style={styles.image} />
          </Shadow>
          <View style={styles.descriptionContainer}>
            <Text style={styles.text} numberOfLines={2}>
              Konfirmasi apakah Transaksi telah berhasil atau gagal.
            </Text>
            <Text style={styles.text}>Date: xx - xx - xxxx</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF0909' }]}>
                <Text style={styles.buttonText}>Gagal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#16423C' }]}>
                <Text style={styles.buttonText}>Berhasil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFEC',
    padding: 20,
    rowGap: 30,
  },
  statusButtonContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 125,
    color: '#16423C',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  listContainer: {
    flexDirection: 'row',
    columnGap: 19,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#16423C',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 15,
  },
  descriptionContainer: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
