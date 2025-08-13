// app/product-view.js
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ProductView() {
  const router = useRouter();

  const product = {
    brand: 'Chanel Cerest',
    title: 'Fantasist Night Cream',
    price: '$24.00',
    rating: 4.6,
    ratingCount: '12.4k',
    image:
      'https://sdcdn.io/mac/mx/mac_sku_M0N904_1x1_0.png?width=1440&height=1440',
    shortDesc:
      'Fantasist Eyeshadow Palette is comes to looking your best, there are some standard tools of the trade.',
    longDesc:
      'Fantasist Eyeshadow Palette is comes to looking your best, there are some standard tools of the trade. This long description contains additional information about ingredients, usage, warnings and benefits. Ideal for nightly routine and sensitive skin. Apply gently and keep away from eyes.',
    colors: [ '#ffd5eaff', '#ffcea6ff', '#bad6ffff'],
  };

  const [favorite, setFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const scrollRef = useRef(null);

  // Ajustes para que las slides no desborden el contenedor
  const sheetWidth = width - 32; // coincide con left:16 right:16
  const sheetHeight = Math.round(height * 0.3); // un poco más alto para que quepa todo

  const onShare = async () => {
    try {
      await Share.share({
        message: `${product.title} - ${product.price}\nCheck it out!`,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const inc = () => setQuantity(q => Math.min(99, q + 1));
  const dec = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.fullBg, { backgroundColor: selectedColor }]} />

      {/* Top icons (sin fondo) */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={22} color="#222" />
        </TouchableOpacity>

        <View style={styles.topRight}>
          <TouchableOpacity
            onPress={() => setFavorite(f => !f)}
            style={styles.iconBtn}
          >
            <AntDesign name={favorite ? 'heart' : 'hearto'} size={20} color={favorite ? '#ff3b30' : '#222'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
            <Feather name="share-2" size={20} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Imagen: subida y 10% más grande */}
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Tarjeta flotante inferior */}
      <View style={[styles.sheetContainer, { height: sheetHeight }]}>
        <View style={[styles.sheetCard, { height: sheetHeight }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            contentContainerStyle={{ alignItems: 'flex-start' }}
          >
            {/* SLIDE 1: cada slide usa sheetWidth */}
            <View style={{ width: sheetWidth }}>
              <ScrollView contentContainerStyle={styles.sheetInnerScroll}>
                <Text style={styles.brandText}>{product.brand}</Text>
                <Text style={styles.titleText}>{product.title}</Text>

                <View style={styles.rowBetween}>
                  <View style={styles.ratingRow}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i < Math.round(product.rating);
                      return (
                        <AntDesign
                          key={i}
                          name={filled ? 'star' : 'staro'}
                          size={14}
                          color="#FFD700"
                          style={{ marginRight: 4 }}
                        />
                      );
                    })}
                    <Text style={styles.ratingText}>{product.rating} ({product.ratingCount})</Text>
                  </View>
                  <Text style={styles.priceText}>{product.price}</Text>
                </View>

                <Text style={styles.descText}>
                  {showMore ? product.longDesc : product.shortDesc}
                  {!showMore && '...'}
                </Text>
                <TouchableOpacity onPress={() => setShowMore(s => !s)}>
                  <Text style={styles.showMoreText}>{showMore ? 'Show less' : 'Show more'}</Text>
                </TouchableOpacity>

                <View style={[styles.rowBetween, { marginTop: 12 }]}>
                  <View style={styles.qtyBox}>
                    <TouchableOpacity onPress={dec} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
                    <View style={styles.qtyNumber}><Text style={{ fontWeight: '600' }}>{quantity}</Text></View>
                    <TouchableOpacity onPress={inc} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      console.log('Add to cart', { product: product.title, quantity, color: selectedColor });
                    }}
                  >
                    <Text style={styles.addButtonText}>Add to Cart →</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            {/* SLIDE 2 */}
            <View style={{ width: sheetWidth }}>
              <ScrollView contentContainerStyle={styles.sheetInnerScroll}>
                <Text style={styles.brandText}>{product.brand}</Text>
                <Text style={styles.titleText}>{product.title}</Text>
                <Text style={[styles.priceText, { marginTop: 6 }]}>{product.price}</Text>

                <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Color</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  {product.colors.map((c) => (
                    <TouchableOpacity
                      key={c}
                      onPress={() => setSelectedColor(c)}
                      style={[
                        styles.colorDot,
                        { backgroundColor: c, borderWidth: selectedColor === c ? 2 : 0, borderColor: '#222' },
                      ]}
                    />
                  ))}
                </View>

                <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                      setSelectedColor(product.colors[0]);
                    }}
                  >
                    <Text style={{ color: '#555' }}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => {
                      console.log('Saved color:', selectedColor);
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600' }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },

  fullBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  topBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  imageWrap: {
    position: 'absolute',
    top: height * 0.04, // ligeramente más arriba
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 25,
  },
  productImage: {
    width: width * 0.73,    // ~10% más grande que antes
    height: height * 0.48,
  },

  sheetContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  sheetCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    overflow: 'hidden',
  },

  // Nuevo: Scroll vertical dentro de cada slide
  sheetInnerScroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28, // espacio extra para que el botón no se corte
  },

  brandText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 6, color: '#555', fontSize: 12 },

  priceText: { color: '#222', fontWeight: '700', fontSize: 16 },

  descText: { color: '#444', marginTop: 10, lineHeight: 18 },
  showMoreText: { color: '#f44', marginTop: 6 },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  qtyBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  qtyBtnText: { fontSize: 18, fontWeight: '600' },
  qtyNumber: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' },

  addButton: {
    backgroundColor: '#f44',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 140,
  },
  addButtonText: { color: 'white', fontWeight: '700' },

  sectionTitle: { fontWeight: '700', color: '#333' },

  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },

  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f44',
  },
});
