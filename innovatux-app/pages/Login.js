import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { postLogin } from '../api-functions';
import { useUser } from '../components/UserContext';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  const handleLogin = () => {
    async function fetchUsers() {
      console.log(email, password);
      const response = await postLogin(email, password);
      console.log(response);
      if (response.message) {
        setError(response.message);
      } else {
        const userInfo = { token: response.token, id: response.user.id, firstName: response.user.first_name };
        setUser(userInfo);
        navigation.navigate('Tabs');
      }
    }
    fetchUsers();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Image at the top */}
          <Image source={require('../assets/alcohol.png')} style={styles.image} />

          <Text style={styles.title}>LOGIN</Text>

          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            onChangeText={setEmail}
            placeholderTextColor="#fff" // White text color for placeholder
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="#fff" // White text color for placeholder
          />
          {error && <Text style={styles.userText}>{error}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 75, // Half of the width/height to make it circular
    resizeMode: 'contain', // Adjust how the image is resized
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#245C3B', // Colour for title
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

export default Login;
