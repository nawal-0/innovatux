import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, RefreshControl, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for heart icons
import * as ImagePicker from 'expo-image-picker';
import { postFeed, getThings, likePost } from '../api-functions';
import { useUser } from '../components/UserContext';
import { globalStyles } from './Styles';

/**
 * Component to display and interact with a feed of posts.
 */
function Feed({ navigation }) {
  const { width } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  // State for image, caption, posts, and likes
  const [imageUri, setImageUri] = useState(null);
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);

  // Request permission to access media library
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  /**
   * Fetch posts from the server.
   * @returns {Promise<void>}
   */
  const fetchPosts = async () => {
    const data = await getThings('posts', user.token);
    setPosts(data);
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Handle pull to refresh functionality.
   * @returns {Promise<void>}
   */
  const onRefresh = async () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

  /**
   * Handle selecting an image from the device.
   * @returns {Promise<void>}
   * 
   */
  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert('Cancelled', 'You cancelled the image picker.');
    }
  };

  // Add new post with image and caption
  const handleAddPost = async () => {
    if (imageUri && caption) {
      const response = await postFeed(caption, imageUri, user.token);
      setPosts([response, ...posts]); // Add the new post to the top of the list
      setImageUri(null); // Reset image selection
      setCaption(''); // Reset caption input
    } else {
      Alert.alert('Incomplete', 'Please select an image and add a caption.');
    }
    setModalVisible(false);
  };

  /**
   * Handle liking a post.
   * Toggles the like status of a post and updates the like count.
   * 
   * @param {Object} post - The post object to like/unlike
   * @returns {Promise<void>}
   */
  const handleLike = async (post) => {
    const response = await likePost(post, user.token);
    setPosts(posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, likes_count: response.likes_count, is_liked: response.is_liked };
      }
      return p;
    }
    )); 
  };

  return (
    <View style={globalStyles.container}>
      {/* Add Post Section */}
      <TouchableOpacity style={styles.addPostButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addPostButtonText}>Add Post</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>

            <View style={styles.addPostContainer}>
              {/* Button to select image */}
              <TouchableOpacity style={styles.selectImageButton} onPress={handleSelectImage}>
                <Text style={styles.selectImageText}>Select Image</Text>
              </TouchableOpacity>

              {/* Display the selected image */}
              {imageUri && (
                <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginVertical: 10 }} />
              )}

              {/* Input for caption */}
              <TextInput
                style={styles.captionInput}
                placeholder="Add a caption..."
                value={caption}
                onChangeText={setCaption}
              />

              {/* Button to add post */}
              <TouchableOpacity style={styles.addPostButton} onPress={handleAddPost}>
                <Text style={styles.addPostButtonText}>Add Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Map through posts and display them with likes */}
        {posts.length === 0 ? (
  <View style={styles.noPostsContainer}>
    <Text style={styles.noPostsText}>There are no posts</Text>
  </View>
) : (posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={{ uri: post.profileImage || 'https://via.placeholder.com/50' }} />
              <Text>{post.user.username}</Text>
            </View>
            <Image style={[styles.postImage, { width: width * 0.9, height: width * 0.9 }]} source={{ uri: post.image_path }} />
            <Text>{post.caption}</Text>

            {/* Likes section */}
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={() => handleLike(post)}>
                <Ionicons
                  name={post.is_liked ? 'heart' : 'heart-outline'}  // Filled heart if liked, outline if not
                  size={24}
                  color={post.is_liked ? 'red' : 'black'}  // Red color if liked
                />
              </TouchableOpacity>
              <Text style={styles.likeText}>
                {post.likes_count === 1 ? '1 like' : `${post.likes_count || 0} likes`}  {/* Show "1 like" for 1, "X likes" for more */}
              </Text>
            </View>
          </View>
        )))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  noPostsContainer: {
    alignItems: 'center'
  },
  closeText: {
    fontSize: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContainer: {
    width: 300,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  scroll: {
    paddingVertical: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Background color
  },
  postContainer: {
    backgroundColor: '#e8e7dc',
    borderRadius: 20,
    marginBottom: 50,
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circle image
    marginRight: 10,
  },
  postImage: {
    borderRadius: 10,
    resizeMode: 'cover', // Cover image mode
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns the likes section to the right
    marginTop: 10, // Adds some space above the likes
  },
  likeText: {
    marginLeft: 5, // Space between icon and text
  },
  selectImageButton: {
    backgroundColor: '#245C3B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectImageText: {
    color: '#FFFFFF',
  },
  captionInput: {
    width: '100%',
    borderColor: '#245C3B',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  addPostButton: {
    marginTop: 30,
    backgroundColor: '#245C3B',

    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addPostButtonText: {
    color: '#FFFFFF',
  },
});

export default Feed;