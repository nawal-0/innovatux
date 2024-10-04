import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed

// Sample data for followers and following
const followersData = [
  { id: '1', name: 'Arif' },
  { id: '2', name: 'Nawal' },
];

const followingData = [
  { id: '3', name: 'Samudi' },
  { id: '4', name: 'Noam' },
];

const allUsersData = [
  { id: '5', name: 'Rajanya' },
  { id: '6', name: 'Glenn' },
  { id: '7', name: 'NewUser1' },
];

function SearchPage({ navigation }) {
  const [activeTab, setActiveTab] = useState('followers'); // Toggle between followers, following, and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(followersData); // Default to followers

  // Handle tab switch between Followers, Following, and Search
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'followers') {
      setFilteredData(followersData);
    } else if (tab === 'following') {
      setFilteredData(followingData);
    } else if (tab === 'search') {
      setFilteredData(allUsersData); // Search shows all users by default
    }
  };

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchTerm(text);
    let data;
    if (activeTab === 'followers') {
      data = followersData;
    } else if (activeTab === 'following') {
      data = followingData;
    } else {
      data = allUsersData;
    }

    const filtered = data.filter(person =>
      person.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Render each person (follower, following, or search result)
  const renderItem = ({ item }) => (
    <View style={styles.personItem}>
      <Text style={styles.personName}>{item.name}</Text>
      {activeTab === 'search' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log(`Follow ${item.name}`)}
        >
          <Text style={styles.addButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Toggle between Followers, Following, and Search */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'followers' ? styles.activeTab : null]}
          onPress={() => handleTabSwitch('followers')}
        >
          <Text style={styles.toggleText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'following' ? styles.activeTab : null]}
          onPress={() => handleTabSwitch('following')}
        >
          <Text style={styles.toggleText}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'search' ? styles.activeTab : null]}
          onPress={() => handleTabSwitch('search')}
        >
          <Text style={styles.toggleText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for people..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => console.log('Searching...')} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* List of Followers, Following, or Search Results */}
      <FlatList
        data={filteredData}
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
    backgroundColor: '#EAF9F1',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#245C3B',
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginRight: 8,
  },
  searchIcon: {
    padding: 5,
  },
  listContainer: {
    flexGrow: 1,
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  personName: {
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

