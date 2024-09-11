
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
//import { Picker } from '@react-native-picker/picker';

function Goals({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  const handlePress = () => {
    navigation.navigate('Tabs');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Preferences</Text>
      
      <View style={styles.inputTitle}>
        <Text style={styles.subtitle}>Goals</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Goal"
        placeholderTextColor="#fff" // White text color for placeholder
      />
      
      <View style={styles.inputTitle}>
        <Text style={styles.subtitle}>Weekly Limit</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Weekly Limit"
        placeholderTextColor="#fff" // White text color for placeholder
      />
      
    
      <View style={styles.toggleContainer}>
        <Text style={styles.subtitle}>Push Notifications</Text>
        <Switch
          style={styles.toggle}
          trackColor={{ false: '#767577', true: '#245C3B' }}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.subtitle}>Public</Text>
        <Switch
          style={styles.toggle}
          trackColor={{ false: '#767577', true: '#245C3B' }}
          thumbColor={isEnabled2 ? '#fff' : '#f4f3f4'}
          onValueChange={toggleSwitch2}
          value={isEnabled2}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    width: '90%'
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    color: '#245C3B', // subtitle colour 
  },
  toggleContainer: {
    width: '90%',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 20
  },
  toggle: {
    position: 'absolute',
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
    padding: 16,
    backgroundColor: '#E1F9EB', // Background color
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: 'contain', // Adjust how the image is resized
    marginBottom: 20,
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
  },
  loginText: {
    color: '#E1F9EB', // Text color for login button
    fontSize: 16,
  },
  userText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  signupButton: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    padding: 10,
    backgroundColor: '#245C3B', // Background color for signup button
    borderRadius: 50,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default Goals;