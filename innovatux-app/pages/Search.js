/*import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

function Search({ navigation }) {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default Search;
*/

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const friendsData = [
  { id: '1', name: 'Arif' },
  { id: '2', name: 'Glenn' },
  { id: '3', name: 'Nawal' },
  { id: '4', name: 'Noam' },
  { id: '5', name: 'Rajanya' },
  { id: '6', name: 'Samudi' },
  // Will add more friends if needed
];

function SearchPage({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friendsData);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = friendsData.filter(friend =>
      friend.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  const handleAddFriend = (id) => {
    // Handle adding friend logic
    console.log(`Add friend with id: ${id}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Text style={styles.friendName}>{item.name}</Text>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleAddFriend(item.id)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for friends..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredFriends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EAF9F1', // Light pastel green background
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  friendName: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#245C3B',
    padding: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
  },
});

export default SearchPage;
