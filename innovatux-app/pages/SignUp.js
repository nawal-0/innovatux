import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, FlatList, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUser } from '../components/UserContext';
import { signup } from '../api-functions';
import { globalStyles } from './Styles';

/**
 * SignUp Component
 * This component provides the functionality for users to sign up for the application.
 * It includes form fields for first name, last name, email, username, age, gender, and password.
 */
export default function SignUp({ navigation }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  // DropDownPicker state
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ]);

  // Terms and Conditions checkbox state
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const validateUsername = (input) => {
    const regex = /^[A-Za-z0-9._]+$/;
    if (!regex.test(input)) {
      Alert.alert('Invalid Username', 'Username must not contain special characters or spaces.');
      return false;
    }
    if (input.length < 3 || input.length > 20) {
      Alert.alert('Invalid Username', 'Username must be between 3 and 20 characters long.');
      return false;
    }
    if (input.includes('..') || input.includes('__')) {
      Alert.alert('Invalid Username', 'Username cannot contain consecutive dots or underscores.');
      return false;
    }
    if (input.startsWith('.') || input.startsWith('_') || input.endsWith('.') || input.endsWith('_')) {
      Alert.alert('Invalid Username', 'Username cannot start or end with a dot or underscore.');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    const validatePassword = (input) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!regex.test(input)) {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters long and include at least one letter and one number.');
        return false;
      }
      return true;
    };
  
    // Check if terms and conditions are accepted
    if (!isTermsAccepted) {
      Alert.alert('Terms and Conditions', 'You must agree to the Terms and Conditions to sign up.');
      return;
    }
  
    async function fetchSign() {
      if (!first_name || !last_name || !email || !username || !age || !gender || !password) {
        Alert.alert('Missing Information', 'Please fill out all the fields.');
        return;
      }
  
      // Validate Username
      if (!validateUsername(username)) return;
  
      // Validate Password
      if (!validatePassword(password)) return;
  
      try {
        const response = await signup(first_name, last_name, username, email, password, age, gender);
        if (response.errors) {
          const firstErrorKey = Object.keys(response.errors)[0];
          const firstErrorMessage = response.errors[firstErrorKey][0]; 
          Alert.alert('Sign Up Error', firstErrorMessage);
          return;
        }
        const userInfo = { token: response.token, id: response.user.id };
        setUser(userInfo);
        navigation.navigate('Preferences');
      } catch (error) {
        Alert.alert('Sign Up Error', 'There was an issue signing up. Please try again.');
        console.error(error);
      }
    }
  
    fetchSign();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={[{ key: 'form' }]}  // Dummy data to make FlatList work
        renderItem={() => (
          <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Sign Up</Text>
  
            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="First Name"
              value={first_name}
              onChangeText={setFirstName}
            />
  
            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Last Name"
              value={last_name}
              onChangeText={setLastName}
            />
  
            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
  
            {/* Username */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onBlur={() => validateUsername(username)}
            />
  
            {/* Age */}
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
  
            {/* Gender Dropdown */}
            <Text style={styles.label}>Gender</Text>
            <DropDownPicker
              open={open}
              value={gender}
              items={genderItems}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={globalStyles.dropdown}
              dropDownStyle={globalStyles.dropdown}
            />
  
            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
  
            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={() => setIsTermsAccepted(!isTermsAccepted)}>
                <Text style={styles.checkbox}>{isTermsAccepted ? '✔️' : '⬜️'}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>I agree to the Terms and Conditions</Text>
            </View>
  
            {/* Scrollable Terms and Conditions Text Box */}
            <ScrollView style={styles.termsBox}>
              <Text style={styles.termsText}>
                <Text style={styles.termsTitle}>Terms and Conditions</Text>{'\n\n'}
  
                <Text style={styles.termsHeader}>1. Introduction</Text>{'\n'}
                Welcome to BoozeCTRL. By signing up and using our application, you agree to comply with and be bound by the following Terms and Conditions. These terms govern your access to and use of the BoozeCTRL mobile application and its features. Please read these terms carefully before proceeding.{'\n\n'}
  
                <Text style={styles.termsHeader}>2. User Eligibility</Text>{'\n'}
                By using BoozeCTRL, you confirm that you are at least 18 years of age or the legal age for alcohol consumption in your jurisdiction, whichever is higher. You agree to provide accurate and truthful information during the sign-up process.{'\n\n'}
  
                <Text style={styles.termsHeader}>3. User Consent for Data Collection</Text>{'\n'}
                By signing up, you consent to BoozeCTRL collecting and processing your data, including but not limited to, alcohol consumption patterns, spending habits, and personal health information. This data is used to provide you with personalized insights, track your goals, and improve your experience within the app. You acknowledge that your data will be handled in accordance with our Privacy Policy, which you have reviewed and accepted as part of this agreement.{'\n\n'}
  
                <Text style={styles.termsHeader}>4. Data Privacy and Security</Text>{'\n'}
                BoozeCTRL is committed to protecting your privacy and ensuring the security of your data. We employ industry-standard encryption and security protocols to safeguard your information. However, you acknowledge that no system is completely secure, and you agree to use the app at your own risk. You have the right to view, update, and delete your data at any time through the app's account settings. For detailed information on how we handle your data, please refer to our Privacy Policy.{'\n\n'}
  
                <Text style={styles.termsHeader}>5. Use of the Application</Text>{'\n'}
                BoozeCTRL is intended to help users track and manage their alcohol consumption responsibly. You agree to use the app solely for its intended purpose and in a manner that is lawful and respectful of other users. You agree not to misuse or attempt to harm the app or other users, including engaging in unauthorized access, modifying the app’s features, or compromising user data.{'\n\n'}
  
                <Text style={styles.termsHeader}>6. Community Guidelines</Text>{'\n'}
                BoozeCTRL provides community features that allow users to connect and share experiences. By participating in these community features, you agree to behave respectfully and not to engage in any form of harassment, abuse, or offensive behavior. You agree to comply with our Community Guidelines, which outline acceptable behavior and the consequences of violations. BoozeCTRL reserves the right to moderate content and take appropriate action against users who violate these guidelines.{'\n\n'}
  
                <Text style={styles.termsHeader}>7. Limitations of Liability</Text>{'\n'}
                BoozeCTRL is not responsible for any harm or damages arising from your use of the application. The app provides informational resources but does not substitute for professional medical advice or treatment. You agree to use the app at your own discretion and assume all risks associated with its use. BoozeCTRL does not guarantee the accuracy or reliability of the information provided within the app and disclaims all warranties, whether express or implied, to the fullest extent permitted by law.{'\n\n'}
  
                <Text style={styles.termsHeader}>8. Changes to Terms and Conditions</Text>{'\n'}
                BoozeCTRL reserves the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting within the app or on our website. It is your responsibility to review the terms regularly. Continued use of the app after changes are posted constitutes acceptance of the updated terms.{'\n\n'}
  
                <Text style={styles.termsHeader}>9. Termination of Service</Text>{'\n'}
                BoozeCTRL reserves the right to suspend or terminate your account at its discretion if you violate these Terms and Conditions or if your actions harm other users or the integrity of the application.
              </Text>
            </ScrollView>
  
            {/* Sign Up Button */}
            <TouchableOpacity
              style={globalStyles.button}
              onPress={handleSignUp}  // Button is always clickable
            >
              <Text style={globalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
}  


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c5d36',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c5d36',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    fontSize: 24, 
    marginRight: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  termsText: {
    fontSize: 14,  
    color: '#333',
    lineHeight: 24,  
  },
  termsHeader: {
    fontSize: 16,  
    fontWeight: 'bold',  
    marginBottom: 10,  
  },
  termsTitle: {
    fontSize: 18,  
    fontWeight: 'bold',  
    textDecorationLine: 'underline',  
    textAlign: 'center',  
    marginBottom: 20,  
  },
  termsBox: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2c5d36',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#2c5d36',
    textDecorationLine: 'underline',
  },
});
