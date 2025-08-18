import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterNav from '../components/FooterNav';

const initialPosts = [
  {
    id: 1,
    name: 'Edith Delgado',
    isVerified: true,
    text: 'Visit my store and pick whatever you want 😍🛍️',
    image: 'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg',
    likes: 43,
    comments: ['Love it!', 'Where is your store?', '😍😍😍', 'Nice!'],
    avatarSeed: 'edith1',
  },
  {
    id: 2,
    name: 'Edith Delgado',
    isVerified: true,
    text: 'Check out this rug! Jimbo approved',
    image: 'https://ae01.alicdn.com/kf/Se25158f7007845b599b74d6c9186ffa09/Cool-Poker-Playing-Cards-Pattern-Doormat-Anti-Slip-Entrance-Bath-Kitchen-Door-Floor-Mat-Gambling-Card.jpg',
    productTitle: 'Balatro Rug',
    price: '$24.00',
    discount: '25%',
    likes: 68,
    comments: ['On sale?', 'Great product!', 'I want this!', 'How many colors?'],
    avatarSeed: 'edith2',
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeComments, setActiveComments] = useState<null | number>(null);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (activeComments !== null) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [activeComments]);

  const toggleLike = (postId: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.liked;
        const likeCount = liked ? p.likes + 1 : p.likes - 1;
        return { ...p, liked, likes: likeCount };
      }
      return p;
    }));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id === activeComments) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
    setNewComment('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {/* Header con iconos de logout y carrito */}
        <View style={{ padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 16 }}>Hi, <Text style={{ fontWeight: 'bold' }}>Andres</Text></Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Anything to share with the community?</Text>
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
              {['Photo', 'Video', 'Products'].map((label, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => router.push('/create-post')}
                  style={{ flex: 1, padding: 8, backgroundColor: '#f1f1f1', borderRadius: 8 }}
                >
                  <Text style={{ textAlign: 'center' }}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Iconos al lado derecho */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {/* Carrito */}
            <TouchableOpacity onPress={() => router.push('cart_screen')}>
              <Feather name="shopping-cart" size={22} color="gray" />
            </TouchableOpacity>
            {/* Logout */}
            <TouchableOpacity onPress={() => router.push('/login-pass')}>
              <Feather name="log-out" size={22} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={{ margin: 16, backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
              <Image
                source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${post.avatarSeed}` }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }}
              />
              <Text style={{ fontWeight: 'bold', flex: 1 }}>
                {post.name} {post.isVerified && <Ionicons name="checkmark-circle" size={14} color="#4f93ff" />}
              </Text>
              <Feather name="more-horizontal" size={18} color="gray" />
            </View>
            <Text style={{ paddingHorizontal: 12, paddingBottom: 8 }}>{post.text}</Text>
            <Image source={{ uri: post.image }} style={{ width: '100%', height: 300 }} />

            {post.productTitle && (
              <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <View style={{ backgroundColor: '#FF4D4D', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6 }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>{post.discount}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', flex: 1 }}>{post.productTitle}</Text>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>{post.price}</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 16 }}>
              <TouchableOpacity onPress={() => toggleLike(post.id)}>
                <AntDesign name={post.liked ? 'heart' : 'hearto'} size={18} color={post.liked ? 'red' : 'gray'} />
              </TouchableOpacity>
              <Text>{post.likes}</Text>
              <TouchableOpacity onPress={() => setActiveComments(post.id)}>
                <Feather name="message-circle" size={18} color="gray" />
              </TouchableOpacity>
              <Text>{post.comments.length}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Comments Modal con animación */}
      {activeComments !== null && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            elevation: 9999,
            backgroundColor: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']
            }),
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, justifyContent: 'flex-end' }}
            onPress={() => setActiveComments(null)}
          >
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
                height: '75%',
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingTop: 8,
                zIndex: 10000,
                elevation: 10000,
              }}
            >
              {/* Barra indicadora */}
              <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#ccc', borderRadius: 2 }} />
              </View>

              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 8 }}>
                <TouchableOpacity style={{ position: 'absolute', left: 16, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, marginRight: 4, color: '#555' }}>Newest</Text>
                  <Feather name="chevron-down" size={16} color="gray" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Comments</Text>
              </View>

              {/* Lista comentarios */}
              <ScrollView style={{ paddingHorizontal: 16 }}>
                {posts.find(p => p.id === activeComments)?.comments.map((c, index) => {
                  const userNames = ["Gilbert Bryan", "Hilda Kennedy", "Jeffrey Curry", "Frances Colon"];
                  const name = userNames[index % userNames.length];
                  return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 }}>
                      <Image
                        source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${name.replace(/\s+/g, '')}` }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
                      />
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                          <TouchableOpacity><Text style={{ color: '#f44', fontSize: 12 }}>Reply</Text></TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 12, color: 'gray', marginBottom: 4 }}>{index + 1} days ago</Text>
                        <Text style={{ fontSize: 14, color: '#333' }}>{c}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              {/* Input */}
              <View style={{ flexDirection: 'row', padding: 16, borderTopWidth: 1, borderColor: '#eee' }}>
                <TextInput
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Add a comment..."
                  style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12 }}
                />
                <TouchableOpacity onPress={addComment} style={{ marginLeft: 8, justifyContent: 'center' }}>
                  <Text style={{ color: '#f44', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* FooterNav */}
      <View pointerEvents={activeComments !== null ? 'none' : 'auto'}>
        <FooterNav active="home" />
      </View>
    </SafeAreaView>
  );
}
