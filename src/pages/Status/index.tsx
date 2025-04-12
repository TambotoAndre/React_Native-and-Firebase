/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {auth, db} from '../../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
  increment,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore';
import {Shadow} from 'react-native-shadow-2';

const Status = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), where('claimed', '==', true));

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
          completed: postData.completed || false,
        });
      }

      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGagal = async postId => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        claimed: false,
        claimerId: null, // Reset claimer
      });
      console.log('Klaim dibatalkan.');
      Alert.alert('Sukses', 'Klaim berhasil dibatalkan.');
    } catch (error) {
      console.error('Error saat mengubah status:', error);
      Alert.alert('Error', 'Gagal membatalkan klaim: ' + error.message);
    }
  };

  const handleBerhasil = async postId => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'Kamu harus login untuk memproses klaim.');
        return;
      }

      // Run transaction to ensure atomicity
      await runTransaction(db, async transaction => {
        const postRef = doc(db, 'posts', postId);
        const postSnap = await transaction.get(postRef);
        if (!postSnap.exists()) {
          throw new Error('Post tidak ditemukan.');
        }
        const postData = postSnap.data();

        // Check if already completed
        if (postData.completed) {
          throw new Error('Transaksi sudah diproses.');
        }

        // Get user IDs
        const ownerId = postData.userId;
        const claimerId = postData.claimerId;

        // Verify claimer
        if (!claimerId) {
          throw new Error('Tidak ada pengklaim untuk post ini.');
        }
        if (claimerId !== currentUser.uid) {
          throw new Error('Kamu bukan pengklaim post ini.');
        }

        // Verify owner and claimer exist
        const ownerRef = doc(db, 'users', ownerId);
        const claimerRef = doc(db, 'users', claimerId);
        const ownerSnap = await transaction.get(ownerRef);
        const claimerSnap = await transaction.get(claimerRef);
        if (!ownerSnap.exists()) {
          throw new Error('Pemilik post tidak ditemukan.');
        }
        if (!claimerSnap.exists()) {
          throw new Error('Pengklaim tidak ditemukan.');
        }

        // Update owner: +1 transaksi, +3 poin
        transaction.update(ownerRef, {
          transaksi: increment(1),
          poin: increment(3),
        });

        // Update claimer: +1 transaksi, +5 poin
        transaction.update(claimerRef, {
          transaksi: increment(1),
          poin: increment(5),
        });

        // Mark as completed
        transaction.update(postRef, {completed: true});

        // Delete post
        transaction.delete(postRef);
      });

      console.log(
        'Klaim berhasil diproses, transaksi dan poin bertambah untuk owner (+3) dan claimer (+5), post dihapus.',
      );
      Alert.alert(
        'Sukses',
        'Klaim berhasil diproses! Pemilik mendapat 3 poin, pengklaim mendapat 5 poin. Postingan dihapus.',
      );
    } catch (error) {
      console.error('Error saat memproses klaim berhasil:', error);
      Alert.alert('Error', 'Gagal memproses klaim: ' + error.message);
    }
  };

  const renderCard = item => (
    <View key={item.id} style={styles.listContainer}>
      <Shadow distance={5} offset={[-2, 1]}>
        <Image source={{uri: item.image}} style={styles.image} />
      </Shadow>
      <View style={styles.descriptionContainer}>
        <Text style={styles.text} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.text}>Date: {item.createdAt}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#FF0909'}]}
            onPress={() => handleGagal(item.id)}
            disabled={item.completed}>
            <Text style={styles.buttonText}>Gagal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#16423C'}]}
            onPress={() => handleBerhasil(item.id)}
            disabled={item.completed}>
            <Text style={styles.buttonText}>Berhasil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.statusText}>Status</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#16423C"
          style={{marginTop: 30}}
        />
      ) : posts.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 30, color: '#555'}}>
          Belum ada postingan yang diklaim.
        </Text>
      ) : (
        posts.map(renderCard)
      )}
      <View style={{height: 40}} />
    </ScrollView>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFEC',
    padding: 20,
    rowGap: 30,
  },
  statusText: {
    color: '#16423C',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexDirection: 'row',
    columnGap: 19,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#16423C',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 15,
  },
  descriptionContainer: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
