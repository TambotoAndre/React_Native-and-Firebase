import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../../components';
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth';
import {LogoutButton} from '../../assets/icon';
import {EditProfil} from '../../assets/icon';
import {db} from '../../firebase';
import {getDoc, doc} from 'firebase/firestore';

const Profil = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email || '');

        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || '');
            setPhoneNumber(data.phoneNumber || '');
          }
        } catch (error) {
          console.log('Error fetching user data from Firestore:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Konfirmasi', 'Yakin ingin keluar dari akun?', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace('SignIn');
          } catch (error) {
            Alert.alert('Logout Gagal', error.message);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeadersContainer}>
        <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
          <LogoutButton />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} /> */}
        </View>

        <Gap height={8} />
        <Text style={styles.TextHeader}>Aplikasi Transaksi Sampah</Text>
        <Text style={styles.TextHeader2}>{username}</Text>
        <Text style={styles.TextHeader2}>{email}</Text>
        <Text style={styles.TextHeader2}>📞 Nomor: {phoneNumber}</Text>
      </View>

      <Gap height={72} />
      <Text style={styles.akunTxt}>Akun</Text>
      <Gap height={13} />
      <TouchableOpacity
        style={styles.editProfil}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProfilEdit')}>
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
});
