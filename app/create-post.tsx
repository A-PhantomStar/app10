import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const router = useRouter();

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Products');

  const selectedProducts = [
    {
      name: 'Night Cream',
      category: 'Tanning',
      image: 'https://images.ctfassets.net/wlke2cbybljx/ay2gtlfn9vGiGNNxlu82Q/8f263a31f5c182467f1866866c626020/NC__1_AW.jpg?q=80&w=660&h=660&fit=fill&bg=&fm=jpg',
    },
    {
      name: 'Lad Shampoo',
      category: 'Ladies',
      image: 'https://ahappylad.com/cdn/shop/files/Original_natural_shampoo_with_background.jpg?v=1719517176',
    },
    {
      name: 'Andora Pink',
      category: '3CE',
      image: 'https://adoore.se/cdn/shop/files/Andora-halter-pink-1.1.jpg?v=1751345700',
    },
  ];

  const favouriteProducts = [
    {
      name: 'Eye Cream',
      category: 'Ladies',
      image: 'https://www.sephora.com.mx/on/demandware.static/-/Sites-masterCatalog_Sephora/es_MX/dw7632fb34/images/hi-res/boletos/Roc%C3%ADo%20Mart%C3%ADnez/THE%20INKEY%20LIST/5060879821705_1.jpg',
    },
    {
      name: 'Body Serum',
      category: 'Cosmetics',
      image: 'https://www.clarins.mx/on/demandware.static/-/Sites-clarins-master-products/default/dw6dab9ec2/original/0155010_original_original_1.jpg',
    },
    {
      name: 'Hair Volumizer',
      category: 'Chanel Orest',
      image: 'https://monplatin.mx/wp-content/uploads/2020/08/VOLUMIZER-SPRAY.jpg',
    },
    {
      name: 'Color Dust',
      category: 'Dust Lady',
      image: 'https://m.media-amazon.com/images/I/71WFZkG1KaL._UF1000,1000_QL80_.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Post</Text>
        <TouchableOpacity
        onPress={() => {
          router.replace('/explore-new');
        }}
        >
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userRow}>
        <Image
          source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=Sophia` }}
          style={styles.avatar}
        />

        <TextInput
          placeholder="Have something to share with the community?"
          style={styles.input}
          multiline
        />
      </View>

      <View style={styles.tabs}>
        {['Photo', 'Video', 'Products'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tabItem, selectedTab === tab && styles.tabSelected]}
          >
            <Text
              style={{ color: selectedTab === tab ? '#fa5a00' : 'gray' }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.linkInputWrapper}>
        <Feather name="link" size={18} color="gray" />
        <TextInput
          placeholder="Paste the product link here..."
          style={styles.linkInput}
        />
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Selected Products</Text>
        <ScrollView horizontal>
          {selectedProducts.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <TouchableOpacity style={styles.removeIcon}>
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Your Favourites</Text>
        <ScrollView horizontal>
          {favouriteProducts.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    color: '#fa5a00',
    fontWeight: '600',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabItem: {
    paddingVertical: 8,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderColor: '#fa5a00',
  },
  linkInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 20,
  },
  linkInput: {
    marginLeft: 8,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  productCard: {
    marginRight: 15,
    width: 100,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productCategory: {
    fontSize: 10,
    color: 'gray',
  },
  productName: {
    fontWeight: '600',
    fontSize: 12,
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
});

export default CreatePostScreen;
