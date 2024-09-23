// NEW CODE
import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Post from '../components/Post';
import { postFeed } from '../api-functions';
import { useUser } from '../components/UserContext';


function Feed({ navigation }) {
  const { width } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUser();


  // State for image, caption, and posts
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

  // Open image picker for user to select an image
  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // Check if the image was successfully picked
    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);  // Update the imageUri state
    } else {
      Alert.alert('Cancelled', 'You cancelled the image picker.');
    }
  };

  // // Add new post with image and caption
  const handleAddPost = async () => {
    if (imageUri && caption) {
      const response = await postFeed(caption, imageUri, user.token);
      console.log(response);
      const newPost = {
        id: response.id,
        username: response.user.username,
        postImage: imageUri,
        profileImage: require('../assets/icon.png'),
        caption: caption,
      };
      setPosts([newPost, ...posts]);  // Add the new post to the top of the list
      setImageUri(null);  // Reset image selection
      setCaption('');     // Reset caption input
    } else {
      Alert.alert('Incomplete', 'Please select an image and add a caption.');
    }

    setModalVisible(false);
  
  };

  return (
    <View style={styles.container}>
      
          {/* Add Post Section */}
          {/* <Button title="+" onPress={() => setModalVisible(true)} /> */}
          <TouchableOpacity style={styles.addPostButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addPostButtonText}>Add Post</Text>
          </TouchableOpacity>


          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
          
          
      <ScrollView style={styles.scroll}>

          

        {/* Map through posts and display them */}
        {/* {posts.map(post => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={post.profileImage} />
              <Text>{post.username}</Text>
            </View>
            <Image style={[styles.postImage, { width: width * 0.9, height: width * 0.9 }]} source={{ uri: post.postImage }} />
            <Text>{post.caption}</Text>
          </View>
        ))} */}
        {posts.map(post => (
          <Post
            key={post.id}
            username={post.username}
            postImage={post.postImage}
            profileImage={post.profileImage}
            caption={post.caption}
          />
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  closeText: {
    fontSize:30
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
    paddingVertical: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 16,
    backgroundColor: '#E1F9EB', // Background color
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 20,
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
    marginBottom: 10,
  },
  // addPostContainer: {
  //   flex: 1,
  //   marginTop: 20,
  //   width: '100%',
  //   alignItems: 'center',
  // },
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
