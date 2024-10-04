import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../components/UserContext';
import { postMessage, getThings } from '../api-functions';

export default function GroupChat({ route }) {
  const navigation = useNavigation();
  const { user } = useUser();
  const groupName = route.params.groupName;
  const groupId = route.params.groupId;

  const chatListRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(null);

  const [message, setMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  // const [messages, setMessages] = useState([
  //   { id: '1', content: 'Welcome to the chat!', user_id: 'system' },
  //   { id: '2', content: 'Feel free to share your experiences.', user_id: 'system' },
  // ]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      //const response = await getThings(`messages/${groupId}`, user.token);
      const endpoint = lastMessageId ? `messages/${groupId}?after=${lastMessageId}` : `messages/${groupId}`;
      const response = await getThings(endpoint, user.token);

      //setMessages(response);
      if (response.length > 0 && response[response.length - 1].id !== lastMessageId) {
        const lastMessage = response[response.length - 1];
        
        setLastMessageId(lastMessage.id);
        setMessages((prevMessages) => [...prevMessages, ...response]);
        
      }
      if (chatListRef.current && !isScrolled) {
        chatListRef.current.scrollToEnd({ animated: true });
      }
    };
    fetchMessages();
    const intervalID = setInterval(fetchMessages, 1000);

    return () => clearInterval(intervalID);
  }, [isMessageSent, lastMessageId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const response = await postMessage(message, groupId, user.token);
      setIsMessageSent(!isMessageSent);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isSystemMessage = item.user_id === 'system';
    const isCurrentUser = item.user_id === user.id;

    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        {!isSystemMessage && (
          <Text style={styles.senderName}>{item.user.username}</Text>
        )}
        <Text style={isSystemMessage ? styles.systemMessage : styles.messageText}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for keyboard on iOS and Android
      keyboardVerticalOffset={90}  
    >

      <TouchableOpacity style={{ marginTop: 10, alignItems: 'left' }} 
      onPress={() => navigation.goBack()}>
        <Text style={{ marginLeft: 10, color: '#4CAF50', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{groupName}</Text>

      <FlatList
        ref={chatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        onScrollBeginDrag={() => setIsScrolled(true)}
        onScrollEndDrag={() => setIsScrolled(false)}
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

    </KeyboardAvoidingView>
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