import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Gap} from '../../components';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import Prof from '../../assets/icon/ppBlack.svg';
import {auth, db} from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const Anorganic = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('category', '==', 'Anorganik'),
    );

    const unsubscribe = onSnapshot(q, async snapshot => {
      const data = [];

      for (const docSnap of snapshot.docs) {
        const postData = docSnap.data();
        const userDoc = await getDoc(doc(db, 'users', postData.userId));
        const userData = userDoc.exists() ? userDoc.data() : {};

        data.push({
          id: docSnap.id,
          username: userData.username || 'User',
          phoneNumber: userData.phoneNumber || '-',
          location: postData.location,
          image: postData.image,
          description: postData.description,
          createdAt: postData.createdAt?.toDate().toLocaleDateString() || '',
          claimed: postData.claimed || false,
          category: postData.category || '-',
        });
      }

      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = phone => {
    setPhoneNumber(phone);
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

  const renderCard = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() =>
        navigation.navigate('Confirm', {
          id: item.id,
          category: item.category,
          username: item.username,
          location: item.location,
          image: item.image,
          description: item.description,
          claimed: item.claimed,
          createdAt: item.createdAt,
          phoneNumber: item.phoneNumber,
        })
      }>
      <View style={styles.cardHeader}>
        <Prof style={styles.profileIcon} />
        <View>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <Text style={styles.uploadDate}>{item.createdAt}</Text>
      </View>

      <View style={{position: 'relative'}}>
        {item.image ? (
          <Image source={{uri: item.image}} style={styles.imagePlaceholder} />
        ) : (
          <View style={[styles.imagePlaceholder, {backgroundColor: '#ccc'}]}>
            <Text style={{textAlign: 'center', marginTop: 50, color: '#666'}}>
              Tidak ada gambar
            </Text>
          </View>
        )}
        <View
          style={{
            width: 17,
            height: 17,
            borderRadius: 10,
            backgroundColor: item.claimed ? 'red' : '#16423C',
            position: 'absolute',
            top: 160,
            right: 10,
          }}
        />
      </View>

      <Text style={styles.caption}>{item.description}</Text>

      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => openModal(item.phoneNumber)}>
        <Text style={styles.contactButtonText}>Hubungi Pemilik</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#16423C"
          style={{marginTop: 40}}
        />
      ) : posts.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 40, color: '#555'}}>
          Belum ada postingan anorganik.
        </Text>
      ) : (
        posts.map(renderCard)
      )}

      <Gap height={40} />

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
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16423C',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16423C',
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  uploadDate: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#999',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#16423C',
    paddingVertical: 10,
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  phoneIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#16423C',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
});
