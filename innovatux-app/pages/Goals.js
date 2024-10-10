import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Switch, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { addPreference } from '../api-functions';
import { useUser } from '../components/UserContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from './Styles';

/**
 * Component that allows users to set their goals and preferences.
 */
function Goals({ navigation }) {

  const [preferences, setPreferences] = useState({
    goal: '',
    consumption_threshold: '',
    savings_threshold: '',
    notification: true,
    public: true,
  });

  const toggleNotificationSwitch = () => setPreferences({ ...preferences, notification: !preferences.notification });
  const togglePublicSwitch = () => setPreferences({ ...preferences, public: !preferences.public });
  const { user } = useUser();

  /**
   * Handle the form submission.
   * Saves the preferences by calling the `addPreference` API function.
   * @returns {void}
   */
  const handlePress = async () => {
    const response = await addPreference(preferences, user.token);
    console.log(response);
    navigation.navigate('Tabs');
  }

  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState(null);
  const [goalItems, setGoalItems] = useState([
    { label: 'Money', value: 'Money' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Health', value: 'Health' },
    { label: 'Religious', value: 'Religious' }
  ]);

  /**
   * Handle the goal selection from the dropdown.
   * @param {string} callbackValue - The value selected from the dropdown.
   * @returns {void}
   */
  const handleSetGoal = (callbackValue) => {
    setGoal(callbackValue);
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      goal: callbackValue,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[]} // You can pass an empty array if you don't have any list items
          ListHeaderComponent={
            <View style={globalStyles.container}>
              <Text style={globalStyles.title}>User Preferences</Text>
              
              <View style={[styles.inputTitle, { zIndex: open ? 1000 : 1 }]}>
                <Text style={styles.subtitle}>Goals</Text>
              </View>

              <View style={{ zIndex: open ? 1000 : 1 }}>
                <DropDownPicker
                  open={open}
                  value={goal}
                  items={goalItems}
                  setOpen={setOpen}
                  setValue={setGoal}
                  onChangeValue={handleSetGoal}
                  setItems={setGoalItems}
                  placeholder="Select Goal"
                  style={globalStyles.dropdown}
                  dropDownContainerStyle={{ zIndex: open ? 1000 : 1 }}
                />
              </View>
              
              <View style={styles.inputTitle}>
                <Text style={styles.subtitle}>Weekly Consumption Limit </Text>
              </View>

              <TextInput
                style={globalStyles.input}
                placeholder="Eg: 10 standard drinks per week"
                keyboardType="numeric"
                onChangeText={(text) => {
                  const parsed = text.replace(/[^0-9]/g, '');
                  setPreferences({ ...preferences, consumption_threshold: parsed });
                }}
                value={preferences.consumption_threshold}
              />

              <View style={styles.inputTitle}>
                <Text style={styles.subtitle}>Weekly Spending Limit ($)</Text>
              </View>

              <TextInput
                style={globalStyles.input}
                placeholder="Weekly Spending Limit"
                keyboardType="numeric"
                onChangeText={(text) => {
                  const parsed = text.replace(/[^0-9]/g, '');
                  setPreferences({ ...preferences, savings_threshold: parsed });
                }}
                value={preferences.savings_threshold}
              />

              <View style={styles.toggleContainer}>
                <Text style={styles.subtitle}>Push Notifications</Text>
                <Switch
                  style={styles.toggle}
                  trackColor={{ false: '#767577', true: '#245C3B' }}
                  thumbColor={preferences.notification ? '#fff' : '#f4f3f4'}
                  onValueChange={toggleNotificationSwitch}
                  value={preferences.notification}
                />
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.subtitle}>Public</Text>
                <Switch
                  style={styles.toggle}
                  trackColor={{ false: '#767577', true: '#245C3B' }}
                  thumbColor={preferences.public ? '#fff' : '#f4f3f4'}
                  onValueChange={togglePublicSwitch}
                  value={preferences.public}
                />
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    width: '90%'
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    color: '#245C3B', // subtitle colour 
  },
  toggleContainer: {
    width: '90%',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 20
  },
  toggle: {
    position: 'absolute',
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally
    padding: 16,
    backgroundColor: '#E1F9EB', // Background color
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: 'contain', // Adjust how the image is resized
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#245C3B', // Color for title
    textTransform: 'uppercase', // Make the text uppercase
  },
  input: {
    width: '100%', // Full width for input fields
    height: 40,
    backgroundColor: '#A9DFBF', // Background color for input fields
    borderColor: '#245C3B',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: '#245C3B', // Text color for input fields
  },
  loginButton: {
    width: '100%', // Full width for login button
    padding: 10,
    backgroundColor: '#245C3B', // Background color for login button
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#E1F9EB', // Text color for login button
    fontSize: 16,
  },
  userText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  signupButton: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    padding: 10,
    backgroundColor: '#245C3B', // Background color for signup button
    borderRadius: 50,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default Goals;