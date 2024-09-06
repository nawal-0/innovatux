/*
import React, { useState, useEffect } from 'react';
import { Text, View, Button} from 'react-native';

import { getUsers } from '../api-functions';

function Login({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);


  handlePress = () => {
    navigation.navigate('Tabs');
  }

  return (
    <View style={{ flex:1 }}>
      <Text>Login</Text>

      {users.map(user => {
        return <Text key={user.id}>{user.first_name} {user.last_name}</Text>
      })}

      <Button title="Login" onPress={handlePress} />
    </View>
  );
}

export default Login;
*/


/*
// FIRST LOGIN THAT WORKED INCLUDING THE SIGN UP THING
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { getUsers } from '../api-functions';

function Login({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  const handlePress = () => {
    navigation.navigate('Tabs');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={handlePress} color="#007BFF" />

      {users.map(user => {
        return <Text key={user.id} style={styles.userText}>{user.first_name} {user.last_name}</Text>
      })}
      
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
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
*/

// LOGIN WITHOUT THE SIGN UP PART !!!
import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getUsers } from '../api-functions';

function Login({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  const handlePress = () => {
    navigation.navigate('Tabs');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={handlePress} color="#007BFF" />

      {users.map(user => (
        <Text key={user.id} style={styles.userText}>{user.first_name} {user.last_name}</Text>
      ))}
      
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
