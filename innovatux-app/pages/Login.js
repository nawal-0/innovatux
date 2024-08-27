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