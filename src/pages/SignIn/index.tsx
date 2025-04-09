import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {Button, Gap} from '../../components';
import {auth} from '../../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Login berhasil:', user.email);
        navigation.replace('Home');
      })
      .catch(error => {
        Alert.alert('Login Gagal', error.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadersContainer}>
        <Gap height={120} />
        <Text style={styles.TextHeader}>Masuk ke akun Anda</Text>
        <Text style={styles.TextHeader2}>Log in to your Account</Text>
      </View>
      <View style={styles.formContainer}>
        <Gap height={61} />
        <Text style={styles.TextInputTop}>Email</Text>
        <TextInput
          placeholder="Masukan Email Anda"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>Password</Text>
        <TextInput
          placeholder="Masukan Password Anda"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Gap height={25} />
        <Button label="Masuk" textColor="#E9EFEC" onSubmit={handleLogin} />
        <Gap height={210} />
        <ScrollView horizontal>
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
  formContainer: {
    paddingHorizontal: 32,
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
    paddingBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000000',
    marginBottom: 12,
  },
  TextBottom: {
    color: '#0C120E',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 75,
  },
  TextBottomContainer: {
    color: '#16423C',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    paddingLeft: 4,
  },
});
