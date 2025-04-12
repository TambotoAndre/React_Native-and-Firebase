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
} from 'react-native';
import {db} from '../../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
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
      });
      console.log('Klaim dibatalkan.');
    } catch (error) {
      console.error('Error saat mengubah status:', error);
    }
  };

  const handleBerhasil = async postId => {
    try {
      console.log('Klaim berhasil diproses.');
    } catch (error) {
      console.error('Error saat memproses klaim berhasil:', error);
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
            onPress={() => handleGagal(item.id)}>
            <Text style={styles.buttonText}>Gagal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#16423C'}]}
            onPress={() => handleBerhasil(item.id)}>
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
