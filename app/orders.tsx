// app/orders.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Orders() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Processing');

  const tabs = ['Unpaid', 'Processing', 'Shipped'];

  const products = [
    {
      id: 1,
      brand: 'Chanel Cerest',
      title: 'Andora Skincare',
      image: 'https://via.placeholder.com/150x150.png?text=Product+1',
    },
    {
      id: 2,
      brand: 'Chanel Cerest',
      title: 'Andora Skincare',
      image: 'https://via.placeholder.com/150x150.png?text=Product+2',
    },
    {
      id: 3,
      brand: 'Chanel Cerest',
      title: 'Andora Skincare',
      image: 'https://via.placeholder.com/150x150.png?text=Product+3',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 4 }}>
          <Text style={{ fontSize: 26 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Order</Text>
        <View style={{ width: 26 }} /> {/* Espacio para alineación */}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido vacío centrado */}
      <View style={styles.emptyContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/679/679922.png' }}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Empty</Text>
        <Text style={styles.emptySubtitle}>You have no order now!</Text>
        <TouchableOpacity style={styles.discoverButton}>
          <Text style={styles.discoverText}>Go to Discover →</Text>
        </TouchableOpacity>
      </View>

      {/* Recomendaciones */}
      <View style={styles.recommendSection}>
        <View style={styles.recommendHeader}>
          <Text style={styles.recommendTitle}>Maybe you like</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/048/053/161/small_2x/a-pastel-paradise-of-skincare-products-png.png' }} style={styles.productImage} />
              <Text style={styles.productBrand}>{item.brand}</Text>
              <Text style={styles.productTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabButton: { alignItems: 'center', paddingVertical: 8 },
  tabText: { fontSize: 14, color: '#888' },
  tabTextActive: { color: '#f44', fontWeight: '600' },
  tabIndicator: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#f44',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: { width: 120, height: 120, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  emptySubtitle: { color: '#888', marginBottom: 20 },
  discoverButton: {
    backgroundColor: '#f44',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  discoverText: { color: '#fff', fontWeight: '600' },

  recommendSection: {
    paddingBottom: 16,
  },
  recommendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  recommendTitle: { fontWeight: '700', fontSize: 16 },
  viewAll: { color: '#f44' },

  productScroll: { paddingHorizontal: 16 },
  productCard: {
    width: width * 0.35,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productBrand: { fontSize: 12, color: '#888' },
  productTitle: { fontWeight: '600', fontSize: 14, textAlign: 'center' },
});
