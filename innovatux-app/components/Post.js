import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
//import * as ImagePicker from 'expo-image-picker';

function Post({ navigation, username, postImage, profileImage }) {
  const handlePress = () => {
    navigation.navigate('Tabs');
  }

  const { width, height } = Dimensions.get('window');
  
  return ( 
      <View style={[styles.postContainer]}> 
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={profileImage}/>
          </View>
      
          <View style={styles.infoContainer}>
            <Text>{username}</Text>
          </View>
        </View>
          <View style={styles.postImageContainer}> 
            <Image style={[styles.postImage, {width: width * 0.9, height: width * 0.9}]} source={postImage}/>
          
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center', // Center horizontally
    padding: 16,
    backgroundColor: '#E1F9EB', // Background color
  },
  postContainer: {
    //width: '100%',
    //height: 400,
    //aspectRatio: 1,
    justifyContent: 'flex-start',
    //backgroundColor: '#FFFFFF',
    paddingBottom: 30,
    borderRadius: 20,
    position: 'relative'
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
  postImageContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  postImage: {
    //width: 340, // Adjust width as needed
    //height: 340, // Adjust height as needed
    //aspectRatio: 1,
    position: 'relative',
    //borderRadius: 20,
    //justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover', // Adjust how the image is resized
  },
  interactionContainer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  likeContainer: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  likeCounter: {
    width: 80,
    height: 30
  },
  likesText: {
    color: '#fff'
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
