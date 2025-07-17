import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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

  const toggleLike = (postId: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = p.liked ? false : true;
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
        {/* Header */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16 }}>Hi, <Text style={{ fontWeight: 'bold' }}>Sophia 🦄</Text></Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Anything to share with the community?</Text>
          <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
            <TouchableOpacity
              onPress={() => router.push('/create-post')}
              style={{ flex: 1, padding: 8, backgroundColor: '#f1f1f1', borderRadius: 8 }}>
              <Text style={{ textAlign: 'center' }}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/create-post')}
              style={{ flex: 1, padding: 8, backgroundColor: '#f1f1f1', borderRadius: 8 }}>
              <Text style={{ textAlign: 'center' }}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/create-post')}
              style={{ flex: 1, padding: 8, backgroundColor: '#f1f1f1', borderRadius: 8 }}>
              <Text style={{ textAlign: 'center' }}>Products</Text>
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
              <Text style={{ fontWeight: 'bold', flex: 1 }}>{post.name} {post.isVerified && <Ionicons name="checkmark-circle" size={14} color="#4f93ff" />}</Text>
              <Feather name="more-horizontal" size={18} color="gray" />
            </View>
            <Text style={{ paddingHorizontal: 12, paddingBottom: 8 }}>{post.text}</Text>
            <Image source={{ uri: post.image }} style={{ width: '100%', height: 300 }} />

            {post.productTitle && (
              <View style={{ padding: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{ backgroundColor: '#FF4D4D', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>{post.discount}</Text>
                  </View>
                  <Text style={{ fontWeight: 'bold', flex: 1 }}>{post.productTitle}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>{post.price}</Text>
                </View>
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

      {/* Comments Modal */}
      <Modal visible={activeComments !== null} animationType="slide">
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
          <TouchableOpacity onPress={() => setActiveComments(null)} style={{ marginBottom: 16 }}>
            <Text style={{ color: 'blue' }}>← Back</Text>
          </TouchableOpacity>
          <ScrollView>
            {posts.find(p => p.id === activeComments)?.comments.map((c, index) => (
              <Text key={index} style={{ marginBottom: 8 }}>{c}</Text>
            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12 }}
            />
            <TouchableOpacity onPress={addComment} style={{ marginLeft: 8, justifyContent: 'center' }}>
              <Text style={{ color: 'blue' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <FooterNav active="home"/>

    </SafeAreaView>
  );
}
