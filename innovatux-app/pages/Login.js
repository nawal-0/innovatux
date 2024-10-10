import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { postLogin } from '../api-functions';
import { useUser } from '../components/UserContext';
import { globalStyles } from './Styles';

/**
 * Login Component
 * This component renders the login screen for the application.
 * Allows users to enter their email and password to authenticate.
 */
function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  /**
   * handleLogin function
   * This function handles the login process by calling the `postLogin` API.
   * If the response is successful, it sets the user information in the user context.
   * If there's an error, it displays the error message.
   * 
   * @returns {void}
   */
  const handleLogin = () => {
    async function fetchUsers() {
      console.log(email, password);
      const response = await postLogin(email, password);
      console.log(response);
      if (response.message) {
        setError(response.message);
      } else {
        const userInfo = { token: response.token, id: response.user.id };
        setUser(userInfo);
        navigation.navigate('Tabs');
      }
    }
    fetchUsers();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image at the top */}
        <View style={styles.imageContainer}>
            <Image source={require('../assets/alcohol2.png')} style={styles.image} />
          </View>

        <View style={globalStyles.container}>
          

          <Text style={globalStyles.title}>LOGIN</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Username or Email"
            onChangeText={setEmail}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          {error && <Text style={styles.userText}>{error}</Text>}
          <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
            <Text style={globalStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
    padding: 16,
  },
  imageContainer: {
    overflow: 'hidden', // Ensure that the overflow is hidden to show only the top half
    width: '100%', // Set a width for the image
    height: '40%', // Set a height for half-circle effect
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: '110%',
    height: '100%',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
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
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
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
