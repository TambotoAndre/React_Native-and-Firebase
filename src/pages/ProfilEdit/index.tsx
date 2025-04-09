import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  View,
} from 'react-native';
import {Gap, Button} from '../../components';
import {auth} from '../../firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

const ChangePasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  const handleChangePassword = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      Alert.alert('Error', 'User tidak ditemukan.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert('Sukses', 'Password berhasil diubah.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Gagal',
        'Gagal mengubah password. Cek kembali password lama.',
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Gap height={120} />
        <Text style={styles.headerText}>Ubah Password</Text>
        <Text style={styles.subHeaderText}>{email}</Text>
      </View>

      <Gap height={40} />
      <Text style={styles.label}>Password Lama</Text>
      <TextInput
        placeholder="Masukkan Password Lama"
        style={styles.input}
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <Gap height={20} />
      <Text style={styles.label}>Password Baru</Text>
      <TextInput
        placeholder="Masukkan Password Baru"
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Gap height={40} />
      <Button
        label="Simpan Perubahan"
        textColor="#E9EFEC"
        onSubmit={handleChangePassword}
      />
      <Gap height={20} />
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFEC',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#16423C',
    height: 260,
    paddingHorizontal: 32,
  },
  headerText: {
    color: '#E9EFEC',
    fontSize: 29,
    fontFamily: 'Poppins-Bold',
  },
  subHeaderText: {
    color: '#E9EFEC',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  label: {
    color: '#0C120E',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 42,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 32,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    borderColor: '#A9A9A9',
    borderWidth: 1,
  },
});
