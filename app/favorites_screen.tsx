import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: any;
  discount?: string;
  likes: number;
  purchases: number;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Fantassist Night Cream',
    brand: 'Chanel Crest',
    price: 24.0,
    image: require('../assets/images/prod1.jpg'),
    likes: 12_400,
    purchases: 4600,
  },
  {
    id: '2',
    name: 'Hair Volumizer',
    brand: 'Arzique',
    price: 24.0,
    discount: '-5%',
    image: require('../assets/images/prod2.jpg'),
    likes: 12_400,
    purchases: 4600,
  },
  {
    id: '3',
    name: 'Body Serum',
    brand: 'Chanel Crest',
    price: 24.0,
    discount: '-5%',
    image: require('../assets/images/prod1.jpg'),
    likes: 12_400,
    purchases: 4600,
  },
  {
    id: '4',
    name: 'Combo Chanel 2020',
    brand: 'Chanel Crest',
    price: 294.0,
    image: require('../assets/images/prod2.jpg'),
    likes: 12_400,
    purchases: 4600,
  },
];

const FavoritesScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        {item.discount && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
        <AntDesign name="heart" size={20} color="red" style={styles.heartIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.stats}>
          <View style={styles.iconRow}>
            <Ionicons name="cart" size={14} color="#FF6B00" />
            <Text style={styles.iconText}>{item.purchases / 1000}k</Text>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome name="heart" size={14} color="#FF6B00" />
            <Text style={styles.iconText}>{item.likes / 1000}k</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    width: '48%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    backgroundColor: '#f1f1f1',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  textContainer: {
    padding: 10,
  },
  brand: {
    fontSize: 12,
    color: '#777',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginLeft: 4,
  },
});
