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
import {auth, db} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !username || !phoneNumber) {
      Alert.alert('Error', 'Semua kolom wajib diisi!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Simpan data tambahan ke Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        username: username,
        phoneNumber: phoneNumber,
      });

      Alert.alert('Berhasil', 'Akun berhasil dibuat!');
      navigation.replace('SignIn');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

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
        <TextInput
          placeholder="Masukan Username Anda"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <Gap height={12} />
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Gap height={12} />
        <Text style={styles.TextInputTop}>Nomor HP</Text>
        <TextInput
          placeholder="Masukan Nomor HP Anda"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Gap height={24} />
        <Button label="Daftar" textColor="#E9EFEC" onSubmit={handleSignUp} />
        <Gap height={55} />
        <ScrollView horizontal={true}>
          <Text style={styles.TextBottom}>Sudah Punya Akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.TextBottomContainer}>Sign In</Text>
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
    paddingHorizontal: -1,
    flex: 1,
  },
  HeadersContainer: {
    backgroundColor: '#16423C',
    height: 260,
    justifyContent: 'center',
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
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginHorizontal: 10,
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
