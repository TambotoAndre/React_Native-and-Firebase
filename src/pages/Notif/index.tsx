import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput as TxInput
} from 'react-native';
import {Gap} from '../../components';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import Prof from '../../assets/icon/ppBlack.svg';

const Notif = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerNotif}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <BACK style={styles.Back} />
        </TouchableOpacity>
        <Text style={styles.Notif}>Notifikasi</Text>
      </View>
      <Gap height={23} />
      <View>
        <Text style={styles.text1}>Kemarin</Text>
        <Gap height={23} />
        <View style={styles.containerNotif}>
          <Prof style={styles.prof} />
          <Text style={styles.text2}>
            Atha ingin mengambil barang yang anda posting
          </Text>
        </View>
        <Gap height={23} />
        <View style={styles.containerNotif}>
          <Prof style={styles.prof} />
          <Text style={styles.text2}>
            Atha ingin mengambil barang yang anda posting
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notif;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerNotif: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  containPage: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 28,
    paddingRight: 120,
  },
  Back: {
    marginLeft: 17,
    marginTop: 55,
  },
  Notif: {
    marginLeft: 17,
    marginTop: 55,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#100101',
  },
  prof: {
    marginLeft: 23,
  },
  text1: {
    marginLeft: 23,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#100101',
  },
  text2: {
    marginLeft: 32,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#100101',
  },
});