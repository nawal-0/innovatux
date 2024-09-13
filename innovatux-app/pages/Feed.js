/*import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

function Feed({ navigation }) {
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
}

export default Feed;
*/




/// FEED WITHOUT POST AS SEPERATE COMPONENT 
/*


import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Post from '../components/Post';
//import * as ImagePicker from 'expo-image-picker';

function Feed({ navigation }) {
  const handlePress = () => {
    navigation.navigate('Tabs');
  }

  const { width, height } = Dimensions.get('window');


  // Image picker 
  const [imageUri, setImageUri] = useState('');

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    } else {
      Alert.alert('Cancelled', 'You cancelled the image picker.');
    }
  };


  
  return ( 

    <View style={styles.container}>
    
      <View style={[styles.postContainer]}> 
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={require('../assets/icon.png')}/>
          </View>
      
          <View style={styles.infoContainer}>
            <Text>Samudi Amarasinghe</Text>
          </View>
        </View>
          <View style={styles.postImageContainer}> 
            <Image style={[styles.postImage, {width: width * 0.9, height: width * 0.9}]} source={require('../assets/Goblet_of_Fire_Cocktail.jpg')}/>
          </View>
          
          <View style={styles.interactionContainer}>
            <TouchableOpacity style={styles.likeContainer} onPress={handlePress}>
              <Ionicons size={40} name='heart' color='red'/>
            </TouchableOpacity>
              
            <View style={styles.likeCounter}>
              <Text styles={styles.likesText}>100 Likes</Text>
            </View>
          </View>
      </View>
    </View>
    
  );
}
*/


//SAMUDI ORIGINAL CODE


// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import {Ionicons} from '@expo/vector-icons';
// import Post from '../components/Post';
// //import * as ImagePicker from 'expo-image-picker';

// function Feed({ navigation }) {
//   const handlePress = () => {
//     navigation.navigate('Tabs');
//   }

//   const { width, height } = Dimensions.get('window');


//   // Image picker 
//   const [imageUri, setImageUri] = useState('');

//   const handleSelectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImageUri(result.uri);
//     } else {
//       Alert.alert('Cancelled', 'You cancelled the image picker.');
//     }
//   };

//   const posts = [
//     {
//       id: 1,
//       navigation: navigation, // This is just a placeholder for the likes action
//       username: 'Samudi', 
//       postImage: require('../assets/Goblet_of_Fire_Cocktail.jpg'), 
//       profileImage: require('../assets/Goblet_of_Fire_Cocktail.jpg')
//     },
//     {
//       id: 2,
//       navigation: navigation, // This is just a placeholder for the likes action
//       username: 'Samudi', 
//       postImage: require('../assets/Goblet_of_Fire_Cocktail.jpg'), 
//       profileImage: require('../assets/Goblet_of_Fire_Cocktail.jpg')
//     },
//     {
//       id: 3,
//       navigation: navigation, // This is just a placeholder for the likes action
//       username: 'Samudi', 
//       postImage: require('../assets/Goblet_of_Fire_Cocktail.jpg'), 
//       profileImage: require('../assets/Goblet_of_Fire_Cocktail.jpg')
//     }
//   ];
  
//   return ( 

//     <View style={styles.container}>
//       <ScrollView style={styles.scroll}>
//         {posts.map(post => (
//           <Post
//             key={post.id}
//             navigation={post.navigation}
//             username={post.username}
//             postImage={post.postImage}
//             profileImage={post.profileImage}
//           />
//         ))}
//       </ScrollView>
//     </View>
    
    
//   );
// }

// const styles = StyleSheet.create({
//   scroll: {
//     paddingVertical: 20
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center', // Center horizontally
//     padding: 16,
//     backgroundColor: '#E1F9EB', // Background color
//   },
//   postContainer: {
//     //width: '100%',
//     //height: 400,
//     //aspectRatio: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: '#FFFFFF',
//     //paddingBottom: 10,
//     borderRadius: 20,
//     position: 'relative'
//   },
//   profileContainer: {
//     display: 'flex',
//     columnGap: 8,
//     marginBottom: 0,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 8, 
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: '50%', 
//   },
//   profileImageContainer: {
//     alignItems: 'baseline'
//   },
//   infoContainer: {
//     flex: 1
//   },
//   image: {
//     width: 150, // Adjust width as needed
//     height: 150, // Adjust height as needed
//     resizeMode: 'contain', // Adjust how the image is resized
//     marginBottom: 20,
//   },
//   postImageContainer: {
//     overflow: 'hidden',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20
//   },
//   postImage: {
//     //width: 340, // Adjust width as needed
//     //height: 340, // Adjust height as needed
//     //aspectRatio: 1,
//     position: 'relative',
//     //borderRadius: 20,
//     //justifyContent: 'center',
//     alignItems: 'center',
//     resizeMode: 'cover', // Adjust how the image is resized
//   },
//   interactionContainer: {
//     flexDirection: 'column',
//     position: 'absolute',
//     bottom: 0,
//     right: 0
//   },
//   likeContainer: {
//     width: 80,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   likeCounter: {
//     width: 80,
//     height: 30
//   },
//   likesText: {
//     color: '#fff'
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//     color: '#245C3B', // Color for title
//     textTransform: 'uppercase', // Make the text uppercase
//   },
//   input: {
//     width: '100%', // Full width for input fields
//     height: 40,
//     backgroundColor: '#A9DFBF', // Background color for input fields
//     borderColor: '#245C3B',
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//     marginBottom: 16,
//     color: '#245C3B', // Text color for input fields
//   },
//   loginButton: {
//     width: '100%', // Full width for login button
//     padding: 10,
//     backgroundColor: '#245C3B', // Background color for login button
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginText: {
//     color: '#E1F9EB', // Text color for login button
//     fontSize: 16,
//   },
//   userText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   signupButton: {
//     position: 'absolute',
//     bottom: 30,
//     right: 16,
//     padding: 10,
//     backgroundColor: '#245C3B', // Background color for signup button
//     borderRadius: 50,
//     alignItems: 'center',
//   },
//   signupText: {
//     color: '#fff',
//     fontSize: 16,
//   }
// });

// export default Feed;


// NEW CODE
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function Feed({ navigation }) {
  const { width } = Dimensions.get('window');

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
  const handleAddPost = () => {
    if (imageUri && caption) {
      const newPost = {
        id: posts.length + 1,
        username: 'Samudi',
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
  
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>

          {/* Add Post Section */}
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

        {/* Map through posts and display them */}
        {posts.map(post => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={post.profileImage} />
              <Text>{post.username}</Text>
            </View>
            <Image style={[styles.postImage, { width: width * 0.9, height: width * 0.9 }]} source={{ uri: post.postImage }} />
            <Text>{post.caption}</Text>
          </View>
        ))}


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  addPostContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
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
