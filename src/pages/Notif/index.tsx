/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {auth, db} from '../../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import {Gap} from '../../components';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import Prof from '../../assets/icon/ppBlack.svg';

const Notif = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log('No user logged in');
      setNotifications([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', currentUser.uid),
    );

    const unsubscribe = onSnapshot(
      q,
      async snapshot => {
        const data = [];
        for (const docSnap of snapshot.docs) {
          const notifData = docSnap.data();
          // Fetch claimer’s username
          let claimerUsername = 'Anonim';
          if (notifData.claimerId) {
            const claimerRef = doc(db, 'users', notifData.claimerId);
            const claimerSnap = await getDoc(claimerRef);
            if (claimerSnap.exists()) {
              claimerUsername = claimerSnap.data().username || 'Anonim';
            }
          }
          data.push({
            id: docSnap.id,
            message: `${claimerUsername} ingin mengambil barang yang anda posting`,
            createdAt: notifData.createdAt?.toDate(),
            claimerId: notifData.claimerId,
            postId: notifData.postId,
          });
        }
        // Sort by createdAt, newest first
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setNotifications(data);
        setLoading(false);
        console.log('Notifications fetched:', data.length);
      },
      error => {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async notificationId => {
    try {
      await deleteDoc(doc(db, 'notifications', notificationId));
      console.log('Notifikasi dihapus:', notificationId);
    } catch (error) {
      console.error('Gagal menghapus notifikasi:', error);
    }
  };

  const renderNotification = item => (
    <View key={item.id} style={styles.containerNotif}>
      <Prof style={styles.prof} />
      <View style={styles.messageContainer}>
        <Text style={styles.text2}>{item.message}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerNotif}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <BACK style={styles.Back} />
        </TouchableOpacity>
        <Text style={styles.Notif}>Notifikasi</Text>
      </View>
      <Gap height={23} />
      <ScrollView>
        {loading ? (
          <Text style={styles.text1}>Memuat...</Text>
        ) : notifications.length === 0 ? (
          <Text style={styles.text1}>Belum ada notifikasi</Text>
        ) : (
          <>
            <Text style={styles.text1}>Notifikasi Terbaru</Text>
            <Gap height={23} />
            {notifications.map(renderNotification)}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Notif;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerNotif: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  Back: {
    marginLeft: 17,
    marginTop: 55,
  },
  Notif: {
    marginLeft: 17,
    marginTop: 55,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#100101',
  },
  prof: {
    marginLeft: 23,
    marginTop: 8,
  },
  text1: {
    marginLeft: 23,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#100101',
  },
  text2: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#100101',
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 23,
    marginTop: 8,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0909',
  },
});
