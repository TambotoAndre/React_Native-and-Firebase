import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Gap} from '../../components';
import BACK from '../../assets/icon/ion_chevron-back.svg';
import Prof from '../../assets/icon/ppBlack.svg';

const Anorganic = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BACK style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Anorganik</Text>
      </View>

      <Gap height={20} />

      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Prof style={styles.profileIcon} />
          <View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.location}>Location</Text>
          </View>
          <Text style={styles.uploadDate}>Tanggal Upload</Text>
        </View>

        {/* Gambar */}
        <View style={styles.imagePlaceholder} />

        {/* Caption */}
        <Text style={styles.caption}>
          Ini adalah kolom caption bagi pengguna untuk memberikan informasi
          mengenai barang yang ditampilkan.
        </Text>
      </View>

      <Gap height={20} />

      {/* Card 2 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Prof style={styles.profileIcon} />
          <View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.location}>Location</Text>
          </View>
          <Text style={styles.uploadDate}>Tanggal Upload</Text>
        </View>

        {/* Gambar */}
        <View style={styles.imagePlaceholder} />

        {/* Caption */}
        <Text style={styles.caption}>
          Ini adalah kolom caption bagi pengguna untuk memberikan informasi
          mengenai barang yang ditampilkan.
        </Text>
      </View>

      <Gap height={40} />

      {/* Card 3 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Prof style={styles.profileIcon} />
          <View>
            <Text style={styles.username}>Username</Text>
            <Text style={styles.location}>Location</Text>
          </View>
          <Text style={styles.uploadDate}>Tanggal Upload</Text>
        </View>

        {/* Gambar */}
        <View style={styles.imagePlaceholder} />

        {/* Caption */}
        <Text style={styles.caption}>
          Ini adalah kolom caption bagi pengguna untuk memberikan informasi
          mengenai barang yang ditampilkan.
        </Text>
      </View>

      <Gap height={40} />
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
    color: '#1C3F2B',
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
  },
});
