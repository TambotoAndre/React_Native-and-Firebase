/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import {auth, db} from '../../firebase';
import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const Confirm = ({navigation, route}) => {
  const {
    id,
    category,
    description,
    location,
    image,
    claimed,
    username,
    phoneNumber,
  } = route.params || {};

  const handleClaim = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'Kamu harus login untuk mengklaim postingan.');
        return;
      }

      // Verify post exists
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) {
        Alert.alert('Error', 'Postingan tidak ditemukan.');
        return;
      }

      // Check if already claimed
      if (postSnap.data().claimed) {
        Alert.alert('Error', 'Postingan sudah diklaim.');
        return;
      }

      // Get claimer’s username
      const claimerRef = doc(db, 'users', currentUser.uid);
      const claimerSnap = await getDoc(claimerRef);
      if (!claimerSnap.exists()) {
        Alert.alert('Error', 'Data pengguna tidak ditemukan.');
        return;
      }
      const claimerUsername = claimerSnap.data().username || 'Anonim';

      // Update post
      await updateDoc(postRef, {
        claimed: true,
        claimerId: currentUser.uid,
      });
      console.log('Post updated:', id, 'claimerId:', currentUser.uid);

      // Create notification
      const postData = postSnap.data();
      const ownerId = postData.userId;
      const notificationRef = await addDoc(collection(db, 'notifications'), {
        userId: ownerId,
        claimerId: currentUser.uid,
        postId: id,
        message: `${claimerUsername} ingin mengambil barang yang anda posting`,
        createdAt: serverTimestamp(),
      });
      console.log('Notification created:', notificationRef.id);

      // Write to statuses
      const statusRef = doc(db, 'statuses', id);
      await setDoc(statusRef, {
        postId: id,
        username: username || 'Anonim',
        description: description || '',
        location: location || '',
        phoneNumber: phoneNumber || '-',
        status: 'pending',
      });

      Alert.alert('Sukses', 'Postingan berhasil diklaim!');
      navigation.goBack();
    } catch (error) {
      console.error('Gagal klaim:', error);
      Alert.alert(
        'Error',
        'Terjadi kesalahan saat mengklaim: ' + error.message,
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BACK style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi</Text>
      </View>
      <View style={styles.imageWrapper}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.image,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={{color: '#666'}}>Tidak ada gambar</Text>
          </View>
        )}
      </View>
      <View style={styles.indicator} />
      <View style={styles.content}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category || 'Tidak ada'}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{description || '-'}</Text>
          <Text style={styles.weight}>1.5 kg</Text>
        </View>
        <Text style={styles.description}>Lokasi: {location || '-'}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClaim}
        disabled={claimed}>
        <Text style={styles.buttonText}>Claim</Text>
      </TouchableOpacity>
      <View style={{height: 40}} />
    </ScrollView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 55,
    paddingHorizontal: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  imageWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#16423C',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
  },
  indicator: {
    height: 5,
    width: 40,
    backgroundColor: '#BCC1BC',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryTag: {
    backgroundColor: '#DDE8DA',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    color: '#16423C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16423C',
    flex: 1,
    paddingRight: 10,
  },
  weight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16423C',
  },
  description: {
    fontSize: 12,
    color: '#2E2E2E',
    lineHeight: 18,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#16423C',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
