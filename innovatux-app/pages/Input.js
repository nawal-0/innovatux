// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// export default function Settings() {
//   const [date, setDate] = useState('');
//   const [price, setPrice] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSubmit = () => {
//     console.log(`Date: ${date}, Price: ${price}, Amount: ${amount}`);
//     alert('Alcohol log submitted successfully!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Alcohol Log</Text>

//       <Text style={styles.label}>Date</Text>
//       <TextInput 
//         style={styles.input} 
//         placeholder="YYYY-MM-DD" 
//         value={date}
//         onChangeText={setDate}
//       />

//       <Text style={styles.label}>Price</Text>
//       <TextInput 
//         style={styles.input} 
//         placeholder="$" 
//         keyboardType="numeric"
//         value={price}
//         onChangeText={setPrice}
//       />

//       <Text style={styles.label}>Amount</Text>
//       <TextInput 
//         style={styles.input} 
//         placeholder="Amount" 
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//       />

//       {/* <Text style={styles.label}>Volume</Text>
//       <Picker
//         selectedValue={volume}
//         style={styles.picker}
//         onValueChange={(itemValue) => setVolume(itemValue)}
//       >
//         <Picker.Item label="200ml/7oz" value="200ml" />
//         <Picker.Item label="500ml/17oz" value="500ml" />
//         <Picker.Item label="1000ml/34oz" value="1000ml" />
//       </Picker> */}

//       {/* Custom Submit Button */}
//       <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f2f2f2',  // Slightly adjusted background color
//   },
//   title: {
//     fontSize: 26,  // Slightly larger title font size
//     fontWeight: 'bold',
//     color: '#2f4f4f',  // Darker text color
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: '#2f4f4f',  // Darker label color to match
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',  // Softer border color
//     padding: 10,
//     borderRadius: 10,  // Increased border radius for rounded input
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#fff',  // White background
//   },
//   picker: {
//     height: 50,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',  // Softer border to match input
//     borderRadius: 10,  // Rounder picker
//   },
//   button: {
//     backgroundColor: '#8BC34A',  // Slightly lighter green to match original
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderRadius: 25,  // More rounded corners
//     alignItems: 'center',
//     shadowColor: '#000',  // Adding subtle shadow for button
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,  // Elevation for Android shadow
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,  // Slightly larger text size
//     fontWeight: 'bold',
//   },
// });