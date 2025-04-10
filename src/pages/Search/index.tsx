import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {collection, getDocs, doc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase';
import {Gap} from '../../components';
import {BackButton, Src} from '../../assets/icon';
import {SItem} from '../../assets/Image/index';

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));

      const dataWithUserInfo = await Promise.all(
        querySnapshot.docs.map(async docPost => {
          const postData = docPost.data();
          if (
            postData.description
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
          ) {
            // Ambil data user dari userId
            const userRef = doc(db, 'users', postData.userId);
            const userSnap = await getDoc(userRef);

            return {
              id: docPost.id,
              ...postData,
              user: userSnap.exists() ? userSnap.data() : null,
            };
          }
          return null;
        }),
      );

      const filteredResults = dataWithUserInfo.filter(item => item !== null);
      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Gap height={21} />
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton style={styles.backButton} />
        </TouchableOpacity>
        <TextInput
          placeholder="Cari deskripsi sampah..."
          style={styles.Textinp}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.src}>
          <TouchableOpacity onPress={handleSearch}>
            <Src style={styles.srcIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Gap height={39} />

      {results.length === 0 ? (
        <Text style={styles.noResult}>Tidak ada hasil ditemukan</Text>
      ) : (
        results.map(item => (
          <View key={item.id} style={styles.searchItem}>
            <Image
              source={item.image ? {uri: item.image} : SItem}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>
                {item.user?.username || 'Nama tidak tersedia'}
              </Text>
              <Text style={styles.label}>
                Kategori: <Text style={styles.value}>{item.category}</Text>
              </Text>
              <Text style={styles.label}>
                Deskripsi: <Text style={styles.value}>{item.description}</Text>
              </Text>
              <Text style={styles.label}>
                Lokasi: <Text style={styles.value}>{item.location}</Text>
              </Text>
              <Text style={styles.label}>
                Nomor HP:{' '}
                <Text style={styles.value}>
                  {item.user?.phoneNumber || '-'}
                </Text>
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  backButton: {
    marginTop: 6,
    marginLeft: 14,
  },
  Textinp: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    backgroundColor: '#F8FCFA',
    borderColor: '#F8FCFA',
    borderWidth: 1,
    marginLeft: 17,
    height: 36,
    width: 220,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
  },
  src: {
    height: 36,
    backgroundColor: '#F8FCFA',
    borderWidth: 1,
    borderColor: '#F8FCFA',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 7,
    justifyContent: 'center',
  },
  srcIcon: {
    marginTop: 6,
  },
  searchItem: {
    flexDirection: 'row',
    backgroundColor: '#16423C',
    width: 385,
    borderRadius: 10,
    marginLeft: 14,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#F8FCFA',
    padding: 10,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: '#E9EFEC',
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#F8FCFA',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Poppins-SemiBold',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
});
