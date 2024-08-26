import React, { useState, useEffect } from 'react';
import { Text, View, Button} from 'react-native';

function Login({ navigation }) {

  handlePress = () => {
    navigation.navigate('Tabs');
  }

  return (
    <View style={{ flex:1 }}>
      <Text>Login</Text>

      <Button title="Login" onPress={handlePress} />
    </View>
  );
}

export default Login;