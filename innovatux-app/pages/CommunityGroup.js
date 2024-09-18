import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

// Example data for groups
const groups = [
  { id: 1, name: 'Group 1', description: 'descritpion', members: 125 },
  { id: 2, name: 'Group 2', description: 'descritpion', members: 250 },
  { id: 3, name: 'Group 3', description: 'descritpion', members: 175 },
  { id: 4, name: 'Group 4', description: 'descritpion', members: 95 },
];

export default function GroupSelection() {
  const [searchText, setSearchText] = useState('');

  // Function to filter groups based on search
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>Community Groups</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a group..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Group List */}
      <ScrollView>
        {filteredGroups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupDescription}>{group.description}</Text>
            <Text style={styles.groupMembers}>{group.members} members</Text>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Group</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F9EB', // Light green background
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#245C3B', // Dark green
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  groupCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#245C3B', // Dark green
  },
  groupDescription: {
    marginVertical: 8,
    color: '#555',
  },
  groupMembers: {
    marginBottom: 10,
    color: '#777',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
