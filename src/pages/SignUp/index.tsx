import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, PageHeader, TextInput} from '../../components';

const SignUp = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadersContainer}>
        <Gap height={120} />
        <Text style={styles.TextHeader}>Buat akun Anda</Text>
        <Text style={styles.TextHeader2}>Create your Account</Text>
      </View>
      <View style={styles.container}>
        <Gap height={39} />
        <Text style={styles.TextInputTop}>Username</Text>
        <TextInput placeholder="Masukan Username Anda" />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>Email</Text>
        <TextInput placeholder="Masukan Email Anda" />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>Password</Text>
        <TextInput placeholder="Masukan Password Anda" />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>PhonNumber</Text>
        <TextInput placeholder="Masukan Nomor Hp Anda" />
        <Gap height={24} />
        <Button
          label="Masuk"
          textColor="#E9EFEC"
          onSubmit={() => navigation.navigate('Home')}
          type={undefined}
          icon={undefined}
        />
        <Gap height={55} />
        <ScrollView horizontal={true}>
          <Text style={styles.TextBottom}>Belum Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.TextBottomContainer}>SignIn</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    fontSize: 29,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 32,
    paddingRight: 197,
  },
  TextHeader2: {
    color: '#E9EFEC',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 32,
  },
  TextInputTop: {
    color: '#0C120E',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 42,
  },
  TextBottomContainer: {
    color: '#16423C',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 3,
  },
  TextBottom: {
    color: '#0C120E',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 101,
  },
});
