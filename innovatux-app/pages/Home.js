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


// GREEN COLOUR THEME 
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
          backgroundColor: '#d4edda',
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
          backgroundColor: '#eafaf1',
          backgroundGradientFrom: '#c4e7c6',
          backgroundGradientTo: '#8dcf91',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Forest green for the bars
          labelColor: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`, // Sea green for text
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
    backgroundColor: '#f0fff4', // Light pastel green background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2e8b57', // Sea green title
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 16,
    color: '#556b2f', // Olive green subtitle
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Home;