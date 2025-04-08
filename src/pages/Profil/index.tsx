import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../../components';
import {BackButton, LogoutButton} from '../../assets/icon';
import {EditProfil} from '../../assets/icon';
const Profil = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadersContainer}>
        <LogoutButton
          style={styles.LogoutButton}
          onPress={() => navigation.navigate('SignIn')}
        />
        <View style={styles.imageContainer}>
          <Image style={styles.image} />
        </View>
        <Gap height={8} />
        <Text style={styles.TextHeader}>Aplikasi Transaksi Sampah</Text>
        <Text style={styles.TextHeader2}>ATS@gmail.com</Text>
        <Text style={styles.TextHeader2}>08131938475</Text>
      </View>
      <Gap height={72} />
      <Text style={styles.akunTxt}>Akun</Text>
      <Gap height={13} />
      <TouchableOpacity
        style={styles.editProfil}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProfilEdit')} // Ganti dengan nama halaman tujuan
      >
        <EditProfil />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFEC',
  },
  HeadersContainer: {
    backgroundColor: '#16423C',
    height: 260,
  },
  TextHeader: {
    color: '#E9EFEC',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 43,
  },
  TextHeader2: {
    color: '#E9EFEC',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  LogoutButton: {
    marginLeft: 337,
    marginRight: 35,
    marginTop: 35,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#D5F5EA',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 21,
  },
  akunTxt: {
    color: '#16423C',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    paddingLeft: 50,
  },
  editProfil: {
    marginHorizontal: 35,
    borderBottomWidth: 2,
    borderBottomColor: '#16423C',
    borderRadius: 8,
  },
  backButton: {},
});
