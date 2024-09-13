/*
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

export default Home;
*/


/*
// THE ONE THAT WORKED AND THE DATA WAS LINEARLY INCREASING !!!

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

function Home() {
  // Sample data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [5, 10, 15, 20, 25, 30, 35]
      }
    ]
  };

  const savingsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [100, 200, 300, 400, 500, 600, 700]
      }
    ]
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Alcohol Intake</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.header}>Savings</Text>
      <BarChart
        data={savingsData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Home;
*/


/*
// Updated the home to make it look more realistic 
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

// Function to generate random data
const generateRandomData = (numPoints) => {
  let data = [];
  let currentValue = 50; // Start with a base value

  for (let i = 0; i < numPoints; i++) {
    // Randomly adjust the value within a range
    currentValue += Math.floor(Math.random() * 11) - 5; // Random change between -5 and +5
    data.push(Math.max(currentValue, 0)); // Ensure no negative values
  }

  return data;
};

const screenWidth = Dimensions.get('window').width;

function Home() {
  // Generate random data
  const alcoholData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  const savingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.subtitle}>Alcohol Intake</Text>
      <LineChart
        data={alcoholData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Savings</Text>
      <BarChart
        data={savingsData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#08130D',
          backgroundGradientTo: '#1E2923',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Home;
*/

<<<<<<< HEAD
//////////// RAJANIA CHANGES
// // GREEN COLOUR THEME 
// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { LineChart, BarChart } from 'react-native-chart-kit';

// // Function to generate random data
// const generateRandomData = (numPoints) => {
//   let data = [];
//   let currentValue = 50; // Start with a base value

//   for (let i = 0; i < numPoints; i++) {
//     // Randomly adjust the value within a range
//     currentValue += Math.floor(Math.random() * 11) - 5; // Random change between -5 and +5
//     data.push(Math.max(currentValue, 0)); // Ensure no negative values
//   }

//   return data;
// };

// const screenWidth = Dimensions.get('window').width;

// function Home() {
//   // Generate random data
//   const alcoholData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         data: generateRandomData(7),
//       },
//     ],
//   };

//   const savingsData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         data: generateRandomData(7),
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>

//       <Text style={styles.subtitle}>Alcohol Intake</Text>
//       <LineChart
//         data={alcoholData}
//         width={screenWidth - 32}
//         height={220}
//         yAxisLabel=""
//         chartConfig={{
//           backgroundColor: '#359A5E',
//           backgroundGradientFrom: '#b4e197',
//           backgroundGradientTo: '#6db36e',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, // Dark green for the lines
//           labelColor: (opacity = 1) => `rgba(85, 107, 47, ${opacity})`, // Olive green for text
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={styles.chart}
//       />

//       <Text style={styles.subtitle}>Savings</Text>
//       <BarChart
//         data={savingsData}
//         width={screenWidth - 32}
//         height={220}
//         yAxisLabel="$"
//         chartConfig={{
//           backgroundColor: '#245C3B',
//           backgroundGradientFrom: '#c4e7c6',
//           backgroundGradientTo: '#8dcf91',
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(53, 154, 94, ${opacity})`, // 359A5E color for the lines
//           labelColor: (opacity = 1) => `rgba(37, 105, 60, ${opacity})`, // Darker green for text
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={styles.chart}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#E1F9EB', // Light pastel green background
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//     color: '#245C3B', // title
//   },
//   subtitle: {
//     fontSize: 24,
//     marginBottom: 8,
//     marginTop: 16,
//     color: '#245C3B', // subtitle colour 
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
// });

// export default Home;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native';
=======
/*
// GREEN COLOUR THEME 
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
>>>>>>> 0994fe33eaab661e265a8a881441853e815708a8
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

// Function to generate random data
const generateRandomData = (numPoints) => {
  let data = [];
  let currentValue = 50; // Start with a base value

  for (let i = 0; i < numPoints; i++) {
    currentValue += Math.floor(Math.random() * 11) - 5; // Random change between -5 and +5
    data.push(Math.max(currentValue, 0)); // Ensure no negative values
  }

  return data;
};

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  // States for manual input modal
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [volume, setVolume] = useState('200ml');

  // Chart data
  const alcoholData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  const savingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log(`Date: ${date}, Price: ${price}, Amount: ${amount}, Volume: ${volume}`);
    alert('Alcohol log submitted successfully!');
    setModalVisible(false); // Close the modal after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.subtitle}>Alcohol Intake</Text>
      <LineChart
        data={alcoholData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#359A5E',
          backgroundGradientFrom: '#b4e197',
          backgroundGradientTo: '#6db36e',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`, // Dark green for the lines
          labelColor: (opacity = 1) => `rgba(85, 107, 47, ${opacity})`, // Olive green for text
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Savings</Text>
      <BarChart
        data={savingsData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#245C3B',
          backgroundGradientFrom: '#c4e7c6',
          backgroundGradientTo: '#8dcf91',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(53, 154, 94, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(37, 105, 60, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      {/* Manual Input Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.manualInputButton}>
        <Text style={styles.manualInputButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for Manual Input */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Manual Alcohol Log Input</Text>

            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="$"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.label}>Volume</Text>
            <Picker
              selectedValue={volume}
              style={styles.picker}
              onValueChange={(itemValue) => setVolume(itemValue)}
            >
              <Picker.Item label="200ml/7oz" value="200ml" />
              <Picker.Item label="500ml/17oz" value="500ml" />
              <Picker.Item label="1000ml/34oz" value="1000ml" />
            </Picker>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E1F9EB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#245C3B',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    color: '#245C3B',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  manualInputButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    top: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  manualInputButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  label: {
    fontSize: 14,
    color: '#245C3B',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
<<<<<<< HEAD
=======

export default Home;
*/
// Just Added an Input Button
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const generateRandomData = (numPoints) => {
  let data = [];
  let currentValue = 50; 

  for (let i = 0; i < numPoints; i++) {
    currentValue += Math.floor(Math.random() * 11) - 5; 
    data.push(Math.max(currentValue, 0)); 
  }

  return data;
};

const screenWidth = Dimensions.get('window').width;

function Home() {
  const alcoholData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  const savingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: generateRandomData(7),
      },
    ],
  };

  const handleButtonPress = () => {
    console.log('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Input</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Alcohol Intake</Text>
      <LineChart
        data={alcoholData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#359A5E',
          backgroundGradientFrom: '#b4e197',
          backgroundGradientTo: '#6db36e',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(85, 107, 47, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Savings</Text>
      <BarChart
        data={savingsData}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#245C3B',
          backgroundGradientFrom: '#c4e7c6',
          backgroundGradientTo: '#8dcf91',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(53, 154, 94, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(37, 105, 60, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E1F9EB', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#245C3B', 
  },
  button: {
    backgroundColor: '#359A5E', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    color: '#245C3B', 
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Home;
>>>>>>> 0994fe33eaab661e265a8a881441853e815708a8
