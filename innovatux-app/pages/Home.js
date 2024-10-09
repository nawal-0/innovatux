import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, TextInput, RefreshControl, View } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { postInput, getThings } from '../api-functions';
import { useUser } from '../components/UserContext';
import Notification from '../components/Notification';
import { globalStyles } from './Styles';
import { Calendar } from 'react-native-calendars';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  // States for manual input modal
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [facts, setFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState({});
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  const [lastWeek, setLastWeek] = useState({
      total_price: 0,
      total_quantity: 0,
  }
  );

  const [alcoholData, setAlcoholData] = useState({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
  });

  const [savingsData, setSavingsData] = useState({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
  });

  const fetchOrders = async () => {
    const data = await getThings("input", user.token);
    const quantities = [0, 0, 0, 0, 0, 0, 0];
    const prices = [0, 0, 0, 0, 0, 0, 0];

    data.forEach(dayData => {
        const dayIndex = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(dayData.day);
        if (dayIndex >= 0) {
            quantities[dayIndex] = dayData.total_quantity;
            prices[dayIndex] = dayData.total_price;
        }
  });

    // Update chart data
    setAlcoholData(prevData => ({
        ...prevData,
        datasets: [{ data: quantities }],
    }));

    setSavingsData(prevData => ({
        ...prevData,
        datasets: [{ data: prices }],
    }));
}

// Fetch weekly orders on component mount
  useEffect(() => {
    const loadContent = async () => {
      fetchOrders();
      const lastWeeks = await getThings("lastweek", user.token);
      setLastWeek(lastWeeks);
    }
    loadContent();
  }, []);

  useEffect(() => {
    const loadFacts = async () => {
      const response = await getThings("facts", user.token);
      setFacts(response);
      const randomIndex = Math.floor(Math.random() * response.length);
      setCurrentFact(response[randomIndex]);
    }
    loadFacts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchOrders();
    const response = await getThings("limit", user.token);
    if (response.warning) {
        alert(response.warning);
    }
    const lastWeeks = await getThings("lastweek", user.token);
    setLastWeek(lastWeeks);

    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[randomIndex]);

    setRefreshing(false);
  }

// Handle form submission
  const handleSubmit = async () => {
    const response = await postInput(date, price, amount, user.token);
    alert('Alcohol log submitted successfully!');
    if (response.warning) {
        alert(response.warning);
    }
    setModalVisible(false); // Close the modal after submission
  };    

  const onDayPress = (day) => {
    setDate(day.dateString);
  };

  return (
    <View style={globalStyles.container}>
    <ScrollView 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
    <Text style={styles.title}>Home</Text>

    {/* <Notification/> */}

    <Text style={styles.subtitle}>Alcohol Intake</Text>
    <LineChart
      data={alcoholData}
      width={screenWidth - 32}
      height={220}
      yAxisLabel=""
      chartConfig={{
      backgroundColor: '#359A5E',
      backgroundGradientFrom: '#e8e7dc',
      backgroundGradientTo: '#e8e7dc',
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
      backgroundGradientFrom: '#e8e7dc',
      backgroundGradientTo: '#e8e7dc',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(53, 154, 94, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(37, 105, 60, ${opacity})`,
      style: {
      borderRadius: 16,
      },
      }}
      style={styles.chart}
    />

    <Text style={styles.subtitle}>Previous Weeks' Info</Text>
      <View style={globalStyles.factsBox}>
          <Text style={globalStyles.factText}>Consumed: {lastWeek.total_quantity} standard drinks</Text>
          <Text style={globalStyles.factText}>Spent: ${lastWeek.total_price}</Text>
      </View>

    <Text style={styles.subtitle}>Did You Know?</Text>
      <View style={globalStyles.factsBox}>
        
          <Text style={globalStyles.factText}>{currentFact.title} </Text>
          <Text style={globalStyles.factText}>{currentFact.fact} </Text>
        
      </View>

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
<Calendar
        onDayPress={onDayPress}
        markedDates={{
          [date]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
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
</ScrollView>
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
backgroundColor: '#245C3B',
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