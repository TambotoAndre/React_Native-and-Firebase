import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, PageHeader, TextInput} from '../../components';

const SignIn = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadersContainer}>
        <Gap height={120} />
        <Text style={styles.TextHeader}>Masuk ke akun Anda</Text>
        <Text style={styles.TextHeader2}>Log in to your Account</Text>
      </View>
      <View style={styles.container}>
        <Gap height={61} />
        <Text style={styles.TextInputTop}>Email</Text>
        <TextInput placeholder="Masukan Email Anda" />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>Password</Text>
        <TextInput placeholder="Masukan Password Anda" />
        <Gap height={25} />
        <Button
          label="Masuk"
          textColor="#E9EFEC"
          onSubmit={() => navigation.navigate('Home')}
          type={undefined}
          icon={undefined}
        />
        <Gap height={210} />
        <ScrollView horizontal={true}>
          <Text style={styles.TextBottom}>Belum Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.TextBottomContainer}>SignUp</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SignIn;

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
    paddingRight: 104,
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
