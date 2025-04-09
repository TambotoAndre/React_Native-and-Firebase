import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {Gap} from '../../components';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import Prof from '../../assets/icon/ppBlack.svg';
import {auth, db} from '../../firebase';
import {getDoc, doc} from 'firebase/firestore';

const Anorganic = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || '');
            setPhoneNumber(data.phoneNumber || '');
          }
        } catch (error) {
          console.log('Gagal ambil data user:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const openModal = () => {
    setModalVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const renderCard = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Prof style={styles.profileIcon} />
        <View>
          <Text style={styles.username}>{username || 'Username'}</Text>
          <Text style={styles.location}>Location</Text>
        </View>
        <Text style={styles.uploadDate}>Tanggal Upload</Text>
      </View>

      {/* Gambar Placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* Caption */}
      <Text style={styles.caption}>
        Ini adalah kolom caption bagi pengguna untuk memberikan informasi
        mengenai barang yang ditampilkan.
      </Text>

      {/* Tombol Hubungi */}
      <TouchableOpacity style={styles.contactButton} onPress={openModal}>
        <Text style={styles.contactButtonText}>Hubungi Pemilik</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BACK style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Anorganik</Text>
      </View>

      <Gap height={20} />
      {renderCard()}
      <Gap height={20} />
      {renderCard()}
      <Gap height={40} />
      {renderCard()}
      <Gap height={40} />

      {/* Modal Pop-up */}
      <Modal visible={isModalVisible} transparent animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContent, {transform: [{scale: scaleAnim}]}]}>
            <Text style={styles.phoneIcon}>📞</Text>
            <Text style={styles.modalText}>
              Segera Hubungi Pemilik: {phoneNumber}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Anorganic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2EC',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 55,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileIcon: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
  location: {
    fontSize: 11,
    color: '#666',
  },
  uploadDate: {
    marginLeft: 'auto',
    fontSize: 10,
    color: '#666',
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    marginBottom: 12,
  },
  caption: {
    fontSize: 11,
    color: '#000',
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#16423C',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E1F3E2',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#16423C',
  },
  phoneIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#16423C',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
