import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Gap } from '../../components';
import { BackButton, Src } from '../../assets/icon';
import { Shadow } from 'react-native-shadow-2';
import { SItem } from '../../assets/Image/index';

const Search = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Gap height={21} />
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton style={styles.backButton} />
        </TouchableOpacity>
        <TextInput style={styles.Textinp} />
        <View style={styles.src}>
          <TouchableOpacity onPress={() => navigation.navigate('hasilSearch')}>
            <Src style={styles.srcIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={39} />
      <View style={styles.searchContainer}>
        <View style={styles.katalogWraper}>
          <Text style={styles.katalog}>ORGANIC</Text>
        </View>
        <Text style={styles.katalog}>PLASTIC</Text>
        <Text style={styles.katalog}>CMS</Text>
        <Text style={styles.katalog}>CMS</Text>
      </View>
      <Gap height={17} />
      <View style={styles.borderline} />
      <Gap height={19} />
      <View style={styles.searchItem}>
        <Image source={SItem} style={styles.image} />
        <Text style={styles.searchItemTxt}>
          Ini adalah kolom caption bagi pengguna untuk memberikan informasi
          mengenai barang yang ditampilkan.
        </Text>
      </View>
      <Gap height={19} />
      <View style={styles.searchItem}>
        <Image source={SItem} style={styles.image} />
        <Text style={styles.searchItemTxt}>
          Ini adalah kolom caption bagi pengguna untuk memberikan informasi
          mengenai barang yang ditampilkan.
        </Text>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  backButton: {
    marginTop: 6,
    marginLeft: 14,
  },
  Textinp: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    backgroundColor: '#F8FCFA',
    borderColor: '#F8FCFA',
    borderWidth: 1,
    marginLeft: 17,
    height: 36,
    width: 280,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
  },
  src: {
    height: 36,
    backgroundColor: '#F8FCFA',
    borderWidth: 1,
    borderColor: '#F8FCFA',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 7,
  },
  srcIcon: {
    marginTop: 6,
  },
  katalog: {
    marginLeft: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 2,
    height: 29,
    width: 73,
    borderRadius: 8,
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#16423C',
    backgroundColor: '#F8FCFA',
  },
  katalogWraper: {
    paddingLeft: 24,
  },
  borderline: {
    borderWidth: 1,
    borderColor: '#6A9C89',
  },
  searchItem: {
    flexDirection: 'row',
    backgroundColor: '#16423C',
    width: 385,
    height: 135,
    borderRadius: 10,
    marginLeft: 14,
    borderWidth: 2,
    borderColor: '#F8FCFA',
  },
  image: {
    width: 130,
    height: 137,
    objectFit: 'cover',
    borderRadius: 15,
    marginLeft: -2,
    marginTop: -1,
  },
  searchItemTxt: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#E9EFEC',
    marginLeft: 11,
    marginTop: 23,
    marginRight: 125,
  },
});
