import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getUsers, postLogin } from '../api-functions';

function Login({ navigation }) {
  const [email, setEmail] = useState(['']);
  const [password, setPassword] = useState(['']);
  const [error, setError] = useState(null);

  const handlePress = () => {
    navigation.navigate('Tabs');
  }

  const handleLogin = () => {
    async function fetchUsers() {
      console.log(email, password);
      const response = await postLogin(email, password);
      console.log(response);
      if (response['message']) {
        setError(response['message']);
      } else {
        navigation.navigate('Tabs');
      }
      
    }
    fetchUsers();
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        onChangeText={setEmail}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      {error && <Text style={styles.userText}>{error}</Text>}

      <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
        <Text style={styles.signupText}>Login</Text>
      </TouchableOpacity>

      <Button title="Fake Login" onPress={handlePress} color="#007BFF" />

      
      
      {/* Commented out until SignUp page is created */}
      {/* 
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  userText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  signupButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default Login;
