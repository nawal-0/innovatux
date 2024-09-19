import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { logout, getThings, addPreference, changePassword } from '../api-functions';
import { useUser } from '../components/UserContext';

export default function SettingsPage( { navigation } ) {
  const { user } = useUser();
  const [userSettings, setUserSettings] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [limitModalVisible, setLimitModalVisible] = useState(false);

  // DropDownPicker state for goals
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState(null);
  const [goalItems, setGoalItems] = useState([
    { label: 'Money', value: 'Money' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Health', value: 'Health' },
    { label: 'Religous', value: 'Religous' }
  ]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [weeklycLimit, setcWeeklyLimit] = useState('');
  const [weeklysLimit, setsWeeklyLimit] = useState('');

  // toggle push notifications and save to db
  const togglePushNotifications = async () => {
    const updatedSettings = { ...userSettings, notification: !userSettings.notification };
    setUserSettings(updatedSettings);
    const response = await addPreference(updatedSettings, user.token);
    console.log(response);
  };

  // toggle public setting and save to db
  const togglePublic = async () => {
    const updatedSettings = { ...userSettings, public: !userSettings.public };
    setUserSettings(updatedSettings);
    const response = await addPreference(updatedSettings, user.token);
    console.log(response);
  };

  // retrieve settings from db
  useEffect(() => {
    async function fetchSettings() {
      const settings = await getThings('settings', user.token);
      console.log(settings);
      setUserSettings(settings);
      setcWeeklyLimit(settings.consumption_threshold.toString());
      setsWeeklyLimit(settings.savings_threshold.toString());
    }
    fetchSettings();
  }, []);

  // retrieve user info from db
  useEffect(() => {
    async function fetchUser() {
      const users = await getThings('user', user.token);
      setUserInfo(users);
    }
    fetchUser();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    const response = await changePassword(oldPassword, newPassword, user.token);
    alert(response.message);
    setPasswordModalVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLimitChange = async () => {
    alert('Limits updated');
    const updatedSettings = { ...userSettings, consumption_threshold: weeklycLimit, savings_threshold: weeklysLimit };
    setUserSettings(updatedSettings);

    const response = await addPreference(updatedSettings, user.token);
    console.log(response);
    setLimitModalVisible(false);
  };

  const handleLogout = () => {
    async function fetchLogout() {
      const response = await logout(user.token);
     
      if (response.message) {
        alert(response.message);

        navigation.reset({
           index: 0,
           routes: [{ name: 'Login' }],
        });
      }
    }
    fetchLogout();
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.icon}>⚙️</Text> Settings
        </Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image 
          style={styles.profileImage} 
          source={{ uri: 'https://via.placeholder.com/50' }} 
        />
        <View>
          <Text style={styles.profileLabel}>Name</Text>
          <Text style={styles.profileName}>{userInfo.first_name} {userInfo.last_name}</Text>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{userInfo.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{userInfo.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userInfo.email}</Text>
        </View>
      </View>

      {/* Goals Dropdown */}
      <Text style={styles.label}>Goals</Text>
      <DropDownPicker
        open={open}
        value={goal}
        items={goalItems}
        setOpen={setOpen}
        setValue={setGoal}
        setItems={setGoalItems}
        placeholder="Select a Goal"
        style={styles.dropdown}
        dropDownStyle={styles.dropdown} 
      />

       {/* Options */}
       <TouchableOpacity style={styles.optionRow} onPress={() => setLimitModalVisible(true)}>
        <Text style={styles.optionLabel}>Weekly Limit</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionRow} onPress={() => setPasswordModalVisible(true)}>
        <Text style={styles.optionLabel}>Change Password</Text>
        <Text style={styles.optionArrow}>›</Text>
      </TouchableOpacity>

      {/* Switches */}
      <View style={styles.switchRow}>
        <Text style={styles.optionLabel}>Push Notifications</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#4CAF50' }}  // green toggle when enabled
          thumbColor={userSettings.notification ? '#fff' : '#f4f3f4'}
          onValueChange={togglePushNotifications}
          value={userSettings.notification}
          style={styles.switch}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.optionLabel}>Public</Text>
        <Switch
          trackColor={{ false: '#ddd', true: '#4CAF50' }}  // green toggle when enabled
          thumbColor={userSettings.public ? '#fff' : '#f4f3f4'}
          onValueChange={togglePublic}
          value={userSettings.public}
          style={styles.switch}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Modals */}
      <Modal
        transparent={true}
        visible={passwordModalVisible}
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              style={styles.modalInput}
              secureTextEntry
              placeholder="Enter old password"
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholderTextColor="#808080"
            />

            <TextInput
              style={styles.modalInput}
              secureTextEntry
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#808080"
            />

            <TextInput
              style={styles.modalInput}
              secureTextEntry
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#808080"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handlePasswordChange}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setPasswordModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={limitModalVisible}
        animationType="slide"
        onRequestClose={() => setLimitModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Set Weekly Limit</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={weeklycLimit}
              onChangeText={setcWeeklyLimit}
              placeholderTextColor="#808080"
            />
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={weeklysLimit}
              onChangeText={setsWeeklyLimit}
              placeholderTextColor="#808080"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleLimitChange}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              setLimitModalVisible(false);
              setcWeeklyLimit(userSettings.consumption_threshold.toString()); // reset to original value
              setsWeeklyLimit(userSettings.savings_threshold.toString());     // if changes were made
            }}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2f4f4f',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionLabel: {
    fontSize: 16,
    color: '#2f4f4f',
  },
  optionArrow: {
    fontSize: 16,
    color: '#2f4f4f',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f4f4f',
  },
  profileLabel: {
    color: '#8f8f8f',
  },
  infoSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#4f4f4f',
    textAlign: 'left',
    width: '40%',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f4f4f',
    textAlign: 'right',
    width: '60%',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],  // Slightly larger switches
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',  // Same green color as the rest of the app
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,  // Round the corners a bit more
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,  // Slight shadow for depth
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Slight transparent background
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d9534f',  // green color
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  dropdown: {
    marginHorizontal: 20,
    marginBottom: 20,
    zIndex: 1,
  },
});
