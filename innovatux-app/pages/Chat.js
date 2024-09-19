import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupChat({ route }) {
  const navigation = useNavigation();
  const groupName = route?.params?.groupName || 'General Chat';
  const currentUser = 'User1';  // Example current user
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to the chat!', sender: 'system' },
    { id: '2', text: 'Feel free to share your experiences.', sender: 'system' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message, sender: currentUser }]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isSystemMessage = item.sender === 'system';
    const isCurrentUser = item.sender === currentUser;

    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        {!isSystemMessage && (
          <Text style={styles.senderName}>{item.sender}</Text>
        )}
        <Text style={isSystemMessage ? styles.systemMessage : styles.messageText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={{ rmarginTop: 10, alignItems: 'left' }} 
      onPress={() => navigation.goBack()}>
        <Text style={{ marginLeft: 10, color: '#4CAF50', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{groupName}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',  // White background for the entire page
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#245C3B',  // Green header
  },
  chatArea: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
  },
  currentUserMessage: {
    backgroundColor: '#E1F9EB',  // Light green for current user's messages
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    backgroundColor: '#F0F0F0',  // Light gray for other users' messages
    alignSelf: 'flex-start',
  },
  systemMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#245C3B',  // Green color for system messages
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#333',  // Darker text color for messages
  },
  senderName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 12,
    backgroundColor: '#F9F9F9',
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
