import React from 'react';
import FooterNav from '../components/FooterNav';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const searchHistory = ['Purple Lips', '3CE', 'Spring Collection 2020'];
const popularTags = ['Herbivore', 'Cinema Secrets', 'Hair', 'Dyson', 'Eyelash Tool', 'Blender'];

const suggestions = [
  {
    name: 'Conditioner Bestie',
    brand: 'Ladies',
    price: '$24.00',
    rating: '4.6k',
    likes: '12.4k',
    image: 'https://images.unsplash.com/photo-1600180758890-6caa92e15f99?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Silver Spray',
    brand: 'Chanel Crest',
    price: '$30.00',
    rating: '4.8k',
    likes: '15.1k',
    image: 'https://images.unsplash.com/photo-1589987601949-a87cbf0abfc1?auto=format&fit=crop&w=400&q=80',
  },
];

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Type product, brand, collection..."
        placeholderTextColor="#aaa"
      />

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>
        {searchHistory.map((item, idx) => (
          <View key={idx} style={styles.historyRow}>
            <Text style={styles.historyText}>{item}</Text>
            <Text style={styles.closeBtn}>×</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Search</Text>
        <View style={styles.chipContainer}>
          {popularTags.map((tag, idx) => (
            <View key={idx} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggestion for you</Text>
        {suggestions.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.stats}>❤️ {item.likes}   ⭐ {item.rating}</Text>
            </View>
          </View>
        ))}
      </View>
      <FooterNav active="search"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    color: '#007AFF',
    fontSize: 14,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  historyText: {
    fontSize: 16,
  },
  closeBtn: {
    fontSize: 18,
    color: '#ccc',
    paddingHorizontal: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    gap: 12,
  },
  productImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  brand: {
    fontSize: 12,
    color: '#888',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  stats: {
    marginTop: 4,
    color: '#999',
    fontSize: 13,
  },
});
