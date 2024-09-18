import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUser } from '../components/UserContext';
import { signup } from '../api-functions';

export default function SignUp({navigation}) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  // DropDownPicker state
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ]);

  const validateUsername = (input) => {
    const regex = /^[a-z0-9._]+$/;

    if (!regex.test(input)) {
      Alert.alert('Invalid Username', 'Username must contain only lowercase letters, numbers, dots, and underscores, with no spaces.');
      return false;
    }

    if (input.length < 5 || input.length > 20) {
      Alert.alert('Invalid Username', 'Username must be between 5 and 20 characters long.');
      return false;
    }

    if (input.includes('..') || input.includes('__')) {
      Alert.alert('Invalid Username', 'Username cannot contain consecutive dots or underscores.');
      return false;
    }

    if (input.startsWith('.') || input.startsWith('_') || input.endsWith('.') || input.endsWith('_')) {
      Alert.alert('Invalid Username', 'Username cannot start or end with a dot or underscore.');
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    async function fetchSign() {
      if (!first_name || !last_name || !email || !username || !age || !gender || !password) {
        Alert.alert('Missing Information', 'Please fill out all the fields.');
        return;
      }
      console.log({
        first_name,
        last_name,
        email,
        username,
        age,
        gender,
        password
      });
      const response = await signup(first_name, last_name, username, email, password, age, gender);
      console.log(response);
      const userInfo = { token: response.token, id: response.user.id, first_name: response.user.first_name };
      setUser(userInfo);
      navigation.navigate('Preferences');
    }
    fetchSign();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={[{ key: 'form' }]}  // Dummy data to make FlatList work
        renderItem={() => (
          <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>

            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={first_name}
              onChangeText={setFirstName}
            />

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={last_name}
              onChangeText={setLastName}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Username */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onBlur={() => validateUsername(username)}
            />

            {/* Age */}
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />

            {/* Gender Dropdown */}
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              open={open}
              value={gender}
              items={genderItems}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c5d36',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c5d36',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2c5d36',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#2c5d36',
    textDecorationLine: 'underline',
  },
});
