import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import BACK from '../../assets/icon/ion_chevron-back.svg';

const Confirm = ({navigation, route}) => {
  const {category, description, location, image} = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BACK style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi</Text>
      </View>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        {image && (
          <Image source={image} style={styles.image} resizeMode="cover" />
        )}
      </View>

      <View style={styles.indicator} />
      {/* Info Section */}
      <View style={styles.content}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category || 'Tidak ada'}</Text>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {description ||
              ' sbdjobdjsabdjasbdaojdboasbdaodbasojdosadjasbdjsobdjbdasjdbam '}
          </Text>
          <Text style={styles.weight}>1.5 kg</Text>
        </View>

        <Text style={styles.description}>Lokasi: {location || 'Kleak'}</Text>
      </View>
      {/* Claim Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
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
