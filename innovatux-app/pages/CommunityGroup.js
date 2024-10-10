import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useUser } from '../components/UserContext';
import { getThings, joinCommunity } from '../api-functions'

/**
 * GroupSelection Component
 * This component displays community groups and allows the user to join or view a group.
 */
export default function GroupSelection({ navigation }) {
  const { user } = useUser();
  const [searchText, setSearchText] = useState('');
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState({});

   // useEffect hook to fetch all community groups when the component is mounted
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const com = await getThings("communities", user.token);
        setGroups(com);
      } catch (error) {
        console.error('Error fetching communities or memberships:', error);
      }
    }
    fetchCommunities();
  }, []);

 // useEffect to fetch user's membership statuses in different communities
  useEffect(() => {
    async function fetchMembership() {
      try {
        const membershipStatuses = await getThings("is-user-in-group", user.token);
        console.log(membershipStatuses);
        
        setUserGroups(membershipStatuses);
      } catch (error) {
        console.error('Error fetching communities or memberships:', error);
      }
    }
    fetchMembership();
  }, []);

  /**
   * Handle joining a community or navigating to the group chat.
   * 
   * @param {string} id - The ID of the community to join or view
   * @returns {Promise<void>}
   */
  const handleJoin = async (id) => {
    if (userGroups[id]) {
      // If the user is already in the group, navigate to the chat
      navigation.navigate('Chat', { groupId: id, groupName: groups.find(group => group.id === id).name });  
    } else {
        console.log('Joining group with id:', id);
        const res = await joinCommunity(id, user.token);
        console.log(res);
        setUserGroups(prev => ({ ...prev, [id]: true }));
        // Navigate to the chat screen
        navigation.navigate('Chat', { groupId: id });
    }
  };

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
        {filteredGroups.map((groups) => (
          <View key={groups.id} style={styles.groupCard}>
            <Text style={styles.groupName}>{groups.name}</Text>
            <Text style={styles.groupDescription}>{groups.description}</Text>
            <TouchableOpacity style={styles.joinButton}
             onPress={() => handleJoin(groups.id)}>
              <Text style={styles.joinButtonText}>{userGroups[groups.id] ? 'View Group' : 'Join Group'}</Text>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
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
    backgroundColor: '#245C3B',
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