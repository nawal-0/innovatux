import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

/**
 * Post Component
 * 
 * This renders a single post in the feed, displaying the user's profile image, username,
 * post image, caption, and interaction buttons such as the like button.
 * 
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the post.
 * @param {string} props.username - The username of the person who created the post.
 * @param {string} props.postImage - The URI of the image associated with the post.
 * @param {object} props.profileImage - The source object for the user's profile image.
 * @param {string} props.caption - The caption or description of the post.
 * @returns {React.Element} The rendered Post component.
 */
function Post({ id, username, postImage, profileImage, caption }) {
  
  const { width, height } = Dimensions.get('window');
  
  return ( 
      <View key={id} style={styles.postContainer}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={profileImage} />
              <Text>{username}</Text>
            </View>
            <View style={styles.postImageContainer}> 
             <Image style={[styles.postImage, {width: width * 0.9, height: width * 0.9}]} source={{uri: postImage}}/>
          
                 <View style={styles.interactionContainer}>
                 <TouchableOpacity style={styles.likeContainer}>
                 <Ionicons size={40} name='heart' color='red'/>
                 {/* <Text styles={[styles.title, {color: 'red'}]}>100 Likes</Text> */}
                 </TouchableOpacity>

                
                 {/* <View style={styles.likeCounter}>
                 <Text styles={styles.title}>100 Likes</Text>
                
                 </View> */}
                 </View>
           </View>
            <Text style={styles.caption}>{caption}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    padding: 16,
    backgroundColor: '#E1F9EB', // Background color
  },
  caption: {
    padding: 10
  },
  postContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    position: 'relative', 
    marginBottom: 20
  },
  profileContainer: {
    display: 'flex',
    columnGap: 8,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8, 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: '50%', 
  },
  profileImageContainer: {
    alignItems: 'baseline'
  },
  infoContainer: {
    flex: 1
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: 'contain', // Adjust how the image is resized
    marginBottom: 20,
  },
  postImage: {
    position: 'relative',
    alignItems: 'center',
    resizeMode: 'cover', // Adjust how the image is resized
  },
  interactionContainer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 10,
    right: 0
  },
  likeContainer: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  likesText: {
    color: 'white',
    width: 80,
    height: 30
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#245C3B', // Color for title
    textTransform: 'uppercase', // Make the text uppercase
  },
  input: {
    width: '100%', // Full width for input fields
    height: 40,
    backgroundColor: '#A9DFBF', // Background color for input fields
    borderColor: '#245C3B',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: '#245C3B', // Text color for input fields
  },
  loginButton: {
    width: '100%', // Full width for login button
    padding: 10,
    backgroundColor: '#245C3B', // Background color for login button
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  }
});

export default Post;
