import { StyleSheet } from 'react-native';

// Global style sheets
export const globalStyles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#245C3B', // Colour for title
    //textTransform: 'uppercase', // Make the text uppercase
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  button: {
    width: '100%', // Full width for login button
    padding: 10,
    backgroundColor: '#245C3B', // Background color for login button
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#E1F9EB', // Text color for login button
    fontSize: 16,
  },
  factsBox: {
    borderColor: '#e8e7dc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#e8e7dc',
    width: '100%',
    maxHeight: 200,
    overflow: 'scroll', // Enable scrolling if necessary
  },
  factText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
