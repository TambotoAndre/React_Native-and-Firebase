import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Gap} from '../../components';
import Notif from '../../assets/icon/bell-notification.svg';
import Location from '../../assets/icon/Location_Point.svg';
import Logo from '../../assets/icon/ATS_LOGO.svg';
import Exchange from '../../assets/icon/Exchange_Icon.svg';
import Forward from '../../assets/icon/Forward_Button.svg';
import Organik from '../../assets/icon/BittenApple.svg';
import Anorganik from '../../assets/icon/PlasticBottle.svg';
import BP1 from '../../assets/icon/NavHome.svg';
import BP2 from '../../assets/icon/NavSearch.svg';
import BP3 from '../../assets/icon/NavPosting.svg';
import BP4 from '../../assets/icon/NavStatus.svg';
import BP5 from '../../assets/icon/NavProfil.svg';

import {auth, db} from '../../firebase';
import {doc, getDoc} from 'firebase/firestore';

const Home = ({navigation}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUsername(data.username || '');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containPage}>
          <View style={styles.greeting}>
            <Text style={styles.text1}>Hi {username || 'User'},</Text>
            <Text style={styles.text2}>Welcome to ATS</Text>
          </View>
          <TouchableOpacity
            style={styles.notif}
            onPress={() => navigation.navigate('Notif')}>
            <Notif />
          </TouchableOpacity>
        </View>
        <View style={styles.containPage2}>
          <Location />
          <Text style={styles.text3}>Minahasa Utara</Text>
        </View>
        <View style={styles.containPage3}>
          <Text style={styles.atspoint}>ATS Point</Text>
          <View style={styles.logo_nominal}>
            <Logo style={styles.logo} />
            <Text style={styles.nominalpoint}>100.000</Text>
          </View>
          <TouchableOpacity
            style={styles.tukarpointButton}
            onPress={() => navigation.navigate('Exchange')}>
            <Exchange style={styles.exchange} />
            <Text style={styles.tukarpoint}>Tukar Point</Text>
            <Forward />
          </TouchableOpacity>
          <View style={styles.statusbar}>
            <View style={styles.status}>
              <Text style={styles.transactionCount}>17</Text>
              <Text style={styles.transaction}>Transaksi</Text>
            </View>
            <View style={styles.batasStatus} />
            <View style={styles.status}>
              <Text style={styles.PostCount}>5</Text>
              <Text style={styles.Post}>Postingan</Text>
            </View>
            <View style={styles.batasStatus} />
            <View style={styles.status}>
              <Text style={styles.dailyCleanedCount}>2</Text>
              <Text style={styles.dailyCleaned}>Kg/hari</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.educationBanner}>
          <Text style={styles.education}>Education Banner</Text>
        </TouchableOpacity>
        <Gap height={15} />
        <Text style={styles.category}>Kategori</Text>
        <View style={styles.listCategory}>
          <TouchableOpacity
            style={styles.organik}
            onPress={() => navigation.navigate('Organic')}>
            <View style={styles.eclipse}>
              <Organik />
            </View>
            <Text style={styles.organikText}>Organik</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.anorganik}
            onPress={() => navigation.navigate('Anorganic')}>
            <View style={styles.eclipse}>
              <Anorganik />
            </View>
            <Text style={styles.anorganikText}>Anorganik</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonPage}>
        <TouchableOpacity
          style={styles.bp1}
          onPress={() => navigation.navigate('Home')}>
          <BP1 />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bp2}
          onPress={() => navigation.navigate('Search')}>
          <BP2 />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bp3}
          onPress={() => navigation.navigate('UploadSi')}>
          <BP3 />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bp4}
          onPress={() => navigation.navigate('Status')}>
          <BP4 />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bp5}
          onPress={() => navigation.navigate('Profil')}>
          <BP5 />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
    alignItems: 'center',
  },
  greeting: {
    marginRight: 160,
  },
  containPage: {
    backgroundColor: '#E9EFEC',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  containPage2: {
    backgroundColor: '#E9EFEC',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 17,
  },
  containPage3: {
    backgroundColor: '#16423C',
    height: 280,
    width: 360,
    marginTop: 16,
    borderRadius: 16,
    alignContent: 'center',
    alignItems: 'center',
  },
  atspoint: {
    fontFamily: 'Poppins-Bold',
    color: '#E9EFEC',
    marginTop: 20,
    fontSize: 15,
  },
  logo: {
    marginRight: 9,
    marginBottom: 6,
  },
  logo_nominal: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 13,
  },
  nominalpoint: {
    color: '#E9EFEC',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  tukarpoint: {
    fontFamily: 'Poppins-SemiBold',
    color: '#16423C',
    marginRight: 120,
  },
  tukarpointButton: {
    flexDirection: 'row',
    backgroundColor: '#F1F0E9',
    width: 290,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  exchange: {
    marginLeft: 13,
    marginRight: 8,
  },
  statusbar: {
    width: 330,
    height: 80,
    backgroundColor: '#F1F0E9',
    borderRadius: 16,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  batasStatus: {
    height: 51,
    width: 2,
    borderRadius: 8,
    backgroundColor: '#16423C',
  },
  status: {
    alignItems: 'center',
    flex: 1,
  },
  transactionCount: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  transaction: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  PostCount: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  Post: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  dailyCleanedCount: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  dailyCleaned: {
    color: '#16423C',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  educationBanner: {
    height: 110,
    width: 360,
    backgroundColor: '#6A9C89',
    marginTop: 16,
    borderRadius: 16,
  },
  education: {
    color: '#16423C',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    marginLeft: 19,
    marginTop: 68,
  },
  category: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
  },
  listCategory: {
    flexDirection: 'row',
    marginTop: 16,
  },
  organik: {
    width: 171,
    height: 137,
    backgroundColor: '#16423C',
    borderRadius: 16,
  },
  organikText: {
    color: '#E9EFEC',
    fontFamily: 'Poppins-Medium',
    marginTop: 46,
    marginLeft: 8,
  },
  anorganik: {
    marginLeft: 18,
    width: 171,
    height: 137,
    backgroundColor: '#16423C',
    borderRadius: 16,
  },
  anorganikText: {
    color: '#E9EFEC',
    fontFamily: 'Poppins-Medium',
    marginTop: 46,
    marginLeft: 8,
  },
  eclipse: {
    height: 40,
    width: 40,
    backgroundColor: '#E9EFEC',
    borderRadius: 48,
    marginLeft: 8,
    marginTop: 8,
    padding: 5,
  },
  text1: {
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
  },
  text3: {
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    color: '#16423C',
    paddingLeft: 10,
  },
  buttonPage: {
    width: 390,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  bp1: {
    marginTop: 5,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  bp2: {
    marginTop: 5,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  bp3: {
    marginBottom: 17,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  bp4: {
    marginTop: 5,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  bp5: {
    marginTop: 5,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
});
