/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
import Prof from '../../assets/icon/ppBlack.svg';

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch all posts on component mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsWithUserInfo = await Promise.all(
        querySnapshot.docs.map(async docPost => {
          const postData = docPost.data();
          const userRef = doc(db, 'users', postData.userId);
          const userSnap = await getDoc(userRef);

          return {
            id: docPost.id, // postid
            category: postData.category,
            claimed: postData.claimed,
            createdAt: postData.createdAt, // Handle Timestamp if needed
            description: postData.description,
            image: postData.image,
            location: postData.location,
            userId: postData.userId,
            username: userSnap.exists()
              ? userSnap.data().username
              : 'Anonymous',
            phoneNumber: userSnap.exists() ? userSnap.data().phoneNumber : '-',
          };
        }),
      );
      setAllPosts(postsWithUserInfo);
      setResults(postsWithUserInfo); // Initialize results with all posts
    } catch (error) {
      console.error('Error fetching all posts:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setResults(allPosts);
      return;
    }

    try {
      const lowerSearchText = searchText.toLowerCase().trim();
      let filteredPosts;

      // Daftar kategori yang valid
      const validCategories = ['anorganik', 'organik']; // Sesuaikan dengan kategori Anda

      // Jika teks pencarian adalah kategori yang valid, filter hanya berdasarkan kategori
      if (validCategories.includes(lowerSearchText)) {
        filteredPosts = allPosts.filter(
          post => post.category?.toLowerCase() === lowerSearchText,
        );
      } else {
        // Jika bukan kategori, cari di deskripsi atau lokasi
        filteredPosts = allPosts.filter(
          post =>
            post.description?.toLowerCase().includes(lowerSearchText) ||
            post.location?.toLowerCase().includes(lowerSearchText),
        );
      }

      setResults(filteredPosts);
    } catch (error) {
      console.error('Error filtering search results:', error);
    }
  };

  const openModal = phoneNumber => {
    // Implement modal logic here (e.g., show contact info or initiate call)
    console.log('Contact:', phoneNumber);
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
        <Text style={styles.uploadDate}>
          {typeof item.createdAt === 'string'
            ? item.createdAt
            : item.createdAt?.toDate().toLocaleDateString()}
        </Text>
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
      <Gap height={21} />
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton style={styles.backButton} />
        </TouchableOpacity>
        <TextInput
          placeholder="Cari deskripsi, kategori, atau lokasi..."
          style={styles.Textinp}
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            if (!text.trim()) {
              setResults(allPosts);
            }
          }}
          onSubmitEditing={handleSearch}
        />
        <View style={styles.src}>
          <TouchableOpacity onPress={handleSearch}>
            <Src style={styles.srcIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Gap height={20} />

      {results.length === 0 && searchText.trim() ? (
        <Text style={styles.noResult}>Tidak ada hasil ditemukan</Text>
      ) : (
        results.map(item => renderCard(item))
      )}
      <Gap height={20} />
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
    alignItems: 'center',
    marginHorizontal: 14,
  },
  backButton: {
    marginTop: 6,
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
  noResult: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  card: {
    backgroundColor: '#F8FCFA',
    borderRadius: 10,
    marginHorizontal: 14,
    marginVertical: 8,
    padding: 15,
    borderWidth: 2,
    borderColor: '#16423C',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#16423C',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  uploadDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#666',
    position: 'absolute',
    right: 0,
    top: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#16423C',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  contactButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#F8FCFA',
  },
});
