import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import {auth, db} from '../../firebase';
import {doc, updateDoc, getDoc} from 'firebase/firestore';

const Exchange = ({navigation}) => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      title: 'Voucher Menginap Hotel',
      points: 1,
      stock: 1,
    },
    {
      id: 2,
      title: 'Voucher Hypermart',
      points: 1,
      stock: 5,
    },
    {
      id: 3,
      title: 'Voucher KFC',
      points: 1,
      stock: 1,
    },

    {
      id: 4,
      title: 'Voucher Lotte',
      points: 1,
      stock: 2,
    },
  ]);

  const handleClaim = async id => {
    const selectedVoucher = vouchers.find(v => v.id === id);

    if (!selectedVoucher) {
      Alert.alert('Error', 'Voucher tidak ditemukan');
      return;
    }

    if (selectedVoucher.stock <= 0) {
      Alert.alert('Stok Habis', 'Voucher ini sudah habis');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const currentPoints = userSnap.data().poin || 0;

          // Cek apakah poin cukup
          if (currentPoints < selectedVoucher.points) {
            Alert.alert(
              'Poin Tidak Cukup',
              'Kamu tidak punya cukup poin untuk klaim voucher ini.',
            );
            return;
          }

          // Update poin di Firestore
          const newPoints = currentPoints - selectedVoucher.points;
          await updateDoc(userRef, {
            poin: newPoints,
          });

          // Kurangi stok voucher secara lokal
          setVouchers(prev =>
            prev.map(item =>
              item.id === id ? {...item, stock: item.stock - 1} : item,
            ),
          );

          Alert.alert('Berhasil', 'Voucher berhasil diklaim!');
        }
      }
    } catch (error) {
      console.error('Gagal klaim voucher:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat klaim voucher');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BACK style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Voucher</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        {vouchers.map(voucher => (
          <View key={voucher.id} style={styles.card}>
            <View style={styles.topContent}>
              <View style={styles.voucherInfo}>
                {/* <View style={styles.placeholder} /> foto for voucher */}

                <View style={{marginLeft: 16, flex: 1}}>
                  <Text style={styles.title}>{voucher.title}</Text>
                  <Text style={styles.pointIcon}>♻</Text>
                  <Text style={styles.pointValue}>
                    {voucher.points.toLocaleString()}
                  </Text>
                  <Text style={styles.pointLabel}>ATS-Point</Text>
                </View>

                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>Stok : {voucher.stock}</Text>
                </View>
              </View>
            </View>

            <View style={styles.bottomContent}>
              <Text style={styles.date}>
                Masa berlaku : xx xx xxxx - xx xx xxxx
              </Text>

              <TouchableOpacity
                style={[
                  styles.claimButton,
                  voucher.stock === 0 && styles.disabledButton,
                ]}
                onPress={() => handleClaim(voucher.id)}
                disabled={voucher.stock === 0}>
                <Text
                  style={[
                    styles.claimText,
                    voucher.stock === 0 && styles.disabledText,
                  ]}>
                  Claim
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#EEF2EC',
  },
  backIcon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F2B',
  },
  card: {
    backgroundColor: '#11342D',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  topContent: {
    padding: 16,
  },
  voucherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    width: 80,
    height: 60,
    backgroundColor: '#69C34C',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  pointIcon: {
    fontSize: 18,
    color: '#DFFFD0',
    marginTop: 6,
  },
  pointValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointLabel: {
    fontSize: 12,
    color: '#D1D1D1',
  },
  stockBadge: {
    backgroundColor: '#69C34C',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  stockText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  bottomContent: {
    backgroundColor: '#6DB28B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  date: {
    color: '#fff',
    fontSize: 12,
  },
  claimButton: {
    backgroundColor: '#B7FF3C',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  claimText: {
    color: '#000',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#BFBFBF',
  },
  disabledText: {
    color: '#888',
  },
});
