import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import axiosInstance from '../API'; // Menggunakan Axios Instance

const AddMusicScreen = ({navigation}) => {
  const [judul, setJudul] = useState('');
  const [artis, setArtis] = useState('');
  const [genre, setGenre] = useState('');

  const addMusic = async () => {
    try {
      const newMusic = {judul, artis, genre};
      await axiosInstance.post('/musik', newMusic);
      Alert.alert('Success', 'Music added successfully!');
      navigation.navigate('Home'); // Kembali ke halaman Home setelah berhasil menambahkan
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        Alert.alert(
          'Error',
          error.response.data.message || 'Something went wrong',
        );
      } else if (error.request) {
        console.error('Request error:', error.request);
        Alert.alert('Error', 'Failed to connect to the server');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Song Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Song Title"
          value={judul}
          onChangeText={setJudul}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Artist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Artist Name"
          value={artis}
          onChangeText={setArtis}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Genre</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Genre"
          value={genre}
          onChangeText={setGenre}
        />
      </View>

      <Button title="Add Music" onPress={addMusic} color="#2980b9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center', // Centering elements vertically
  },
  inputContainer: {
    marginBottom: 20, // Adding spacing between input fields
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8, // Space between label and input
  },
  input: {
    height: 50,
    borderColor: '#2980b9',
    borderWidth: 1,
    marginBottom: 10, // Space between input fields
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16, // Adjusting font size for better readability
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20, // Providing space between input fields and button
  },
});

export default AddMusicScreen;
