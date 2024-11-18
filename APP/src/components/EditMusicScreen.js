import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import api from '../API'; // Mengimpor instance axios yang sudah dibuat

const EditMusicScreen = ({route, navigation}) => {
  const {music} = route.params; // Mendapatkan data musik yang akan diedit
  const [judul, setJudul] = useState(music.judul); // Menggunakan nama field sesuai dengan server
  const [artis, setArtis] = useState(music.artis); // Menggunakan nama field sesuai dengan server
  const [genre, setGenre] = useState(music.genre); // Menggunakan nama field sesuai dengan server

  const editMusic = async () => {
    try {
      const updatedMusic = {judul, artis, genre}; // Mengirimkan data sesuai dengan struktur API
      await api.put(`/musik/${music.id}`, updatedMusic); // Menggunakan id musik untuk mengupdate
      navigation.navigate('Home'); // Kembali ke halaman Home setelah mengedit musik
    } catch (error) {
      console.error('Failed to update music:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={judul}
        onChangeText={setJudul}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artis}
        onChangeText={setArtis}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <Button title="Update Music" onPress={editMusic} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaeaea',
  },
  input: {
    height: 50,
    borderColor: '#2980b9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default EditMusicScreen;
