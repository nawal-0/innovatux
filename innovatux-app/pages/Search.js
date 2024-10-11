import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getThings, followUser, unfollowUser } from '../api-functions';
import { useUser } from '../components/UserContext';

/**
 * SearchPage Component
 * This component provides functionality to view followers, following, and search for users.
 */
function SearchPage({ navigation }) {
  const [activeTab, setActiveTab] = useState('followers'); // Toggle between followers, following, and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();

  const [allUsersData, setAllUsersData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    // Fetch all users
    const load = async () => {
      const allUsers = await getThings('users', user.token);
      setAllUsersData(allUsers);
    };
    load();
  }, []);

  useEffect(() => {
    // Fetch all of the current user's followers
    const load = async () => {
      const followers = await getThings('followers', user.token);
      setFollowersData(followers);
    };
    load();
  }, []);

  useEffect(() => {
    // Fetch all users the current user is following
    const load = async () => {
      const following = await getThings('following', user.token);
      setFollowingData(following);
    };
    load();
  }, []);

  // **New useEffect to update filteredData**
  useEffect(() => {
    if (activeTab === 'followers') {
      setFilteredData(followersData);
    } else if (activeTab === 'following') {
      setFilteredData(followingData);
    } else if (activeTab === 'search') {
      setFilteredData(allUsersData);
    }
  }, [activeTab, followersData, followingData, allUsersData]);

  /**
   * Handles switching between tabs (followers, following, search)
   * 
   * @param {string} tab - The name of the tab to switch to
   * @returns {void}
   */
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  /**
   * Handles searching for users based on search term
   * 
   * @param {string} text - The search input value
   * @returns {void}
   */
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
      person.first_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  /**
   * Handles follow/unfollow action for a person
   * 
   * @param {object} person - The person to follow or unfollow
   * @param {string} button - The button type ('Follow' or 'Unfollow')
   * @returns {void}
   */
  const handleFollow = async (person, button) => {
    if (button === 'Follow') {
      const response = await followUser(person.id, user.token);
      setFollowingData([...followingData, person]);
    } else {
      const response = await unfollowUser(person.id, user.token);
      const updatedFollowing = followingData.filter(user => user.id !== person.id);
      setFollowingData(updatedFollowing);
    }
  };

  // Handles refreshing the data for the current active tab
  const handleRefresh = async () => {
    setRefreshing(true);
    if (activeTab === 'followers') {
      const followers = await getThings('followers', user.token);
      setFollowersData(followers);
    } else if (activeTab === 'following') {
      const following = await getThings('following', user.token);
      setFollowingData(following);
    } else if (activeTab === 'search') {
      const allUsers = await getThings('users', user.token);
      setAllUsersData(allUsers);
    }
    setRefreshing(false);
  };

  // Render each person (follower, following, or search result)
  const renderItem = ({ item }) => {
    const isMe = item.id === user.id;
    const isFollowing = followingData.some(user => user.id === item.id);

    return (
      <View style={styles.personItem}>
        <Text style={styles.personName}>{item.first_name} {item.last_name}</Text>
        {!isMe && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleFollow(item, isFollowing ? 'Unfollow' : 'Follow' )}
          >
            <Text style={styles.addButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

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
      {filteredData && filteredData.length === 0 ? (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>
              {activeTab === 'followers'
                ? 'No followers'
                : activeTab === 'following'
                ? 'No following'
                : 'No users found'}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
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
    borderColor: '#245C3B',
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
    borderBottomColor: '#245C3B',
  },
  personName: {
    fontSize: 18,
    color: '#245C3B',
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

