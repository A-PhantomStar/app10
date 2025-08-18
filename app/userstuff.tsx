import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const PostScreen = () => {
  // Estado para post 1
  const [liked1, setLiked1] = useState(false);
  const [likes1, setLikes1] = useState(43);

  // Estado para post 2
  const [liked2, setLiked2] = useState(false);
  const [likes2, setLikes2] = useState(7);

  const toggleLikePost1 = () => {
    setLiked1((prev) => {
      setLikes1((l) => (prev ? l - 1 : l + 1));
      return !prev;
    });
  };
  const navigation = useNavigation();

  const toggleLikePost2 = () => {
    setLiked2((prev) => {
      setLikes2((l) => (prev ? l - 1 : l + 1));
      return !prev;
    });
  };

  const avatarUrl = "https://api.dicebear.com/7.x/avataaars/png?seed=Andres0
  ";


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Post</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* First Post */}
      <View style={styles.postCard}>
        <View style={styles.userInfo}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>Andres</Text>
            <Text style={styles.postTime}>12 mins ago</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.postText}>
          New make up tools of <Text style={styles.mention}>@soben_cometic</Text>
        </Text>

        {/* Post Image con margen horizontal para que no ocupe todo el ancho */}
        <Image
          source={{
            uri: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/11435/b3c65ed2-1c85-4f8f-9bd0-b3503d592ffe.jpg',
          }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Actions: like, comment, then spacer, bookmark + share (share at the right of bookmark) */}
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={toggleLikePost1} style={styles.actionButton}>
              <Feather
                name="heart"
                size={22}
                color={liked1 ? '#ff3344' : '#777'}
              />
            </TouchableOpacity>
            <Text style={styles.actionCount}>{likes1}</Text>

            <TouchableOpacity style={styles.actionButton}>
              <Feather name="message-circle" size={22} color="#777" />
            </TouchableOpacity>
            <Text style={styles.actionCount}>4</Text>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="bookmark-o" size={22} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { marginLeft: 8 }]}>
              <Feather name="send" size={22} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Second Post */}
      <View style={styles.postCard}>
        <View style={styles.userInfo}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <Text style={styles.username}>Andres</Text>
            <Text style={styles.postTime}>12 mins ago</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.postText}>
          Visit my store and pick whatever you want 🤗🥰
        </Text>

        {/* Post Image con margen horizontal para que no ocupe todo el ancho */}
        <Image
          source={{
            uri: 'https://www.kazima.in/wp-content/uploads/2024/03/cosmetics.jpg',
          }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Actions: like, comment, then spacer, bookmark + share (share at the right of bookmark) */}
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={toggleLikePost1} style={styles.actionButton}>
              <Feather
                name="heart"
                size={22}
                color={liked1 ? '#ff3344' : '#777'}
              />
            </TouchableOpacity>
            <Text style={styles.actionCount}>{likes1}</Text>

            <TouchableOpacity style={styles.actionButton}>
              <Feather name="message-circle" size={22} color="#777" />
            </TouchableOpacity>
            <Text style={styles.actionCount}>4</Text>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="bookmark-o" size={22} color="#777" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { marginLeft: 8 }]}>
              <Feather name="send" size={22} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingBottom: 10,
    // pequeño padding lateral para que coincida con el margen de la imagen
    paddingHorizontal: 6,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  postTime: {
    color: '#666',
    fontSize: 12,
  },
  postText: {
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 8,
  },
    avatar: {
    width: 40,
    height: 40,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  mention: {
    color: '#ff6600',
  },
  // imagen centrada y con margen lateral para que NO ocupe todo el ancho
  postImage: {
    alignSelf: 'center',
    width: '94%', // así deja un pequeño margen a ambos lados
    height: 280,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginVertical: 6,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
  },
  actionCount: {
    marginRight: 12,
    marginLeft: 2,
    fontSize: 14,
    color: '#333',
  },
});

export default PostScreen;
