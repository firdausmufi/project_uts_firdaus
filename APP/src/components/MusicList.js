import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const apiUrl = 'http://192.168.1.2:3000/musics'; // Ganti dengan alamat IP lokal Anda

const MusicList = () => {
  const [musics, setMusics] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMusics();
  }, []);

  const fetchMusics = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMusics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMusic = async () => {
    try {
      const newMusic = {title, artist};
      await axios.post(apiUrl, newMusic);
      fetchMusics();
      setTitle('');
      setArtist('');
    } catch (error) {
      console.error(error);
    }
  };

  const editMusic = async () => {
    if (editId) {
      try {
        const updatedMusic = {title, artist};
        await axios.put(`${apiUrl}/${editId}`, updatedMusic);
        fetchMusics();
        setTitle('');
        setArtist('');
        setEditId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteMusic = async id => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchMusics();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Music List</Text>
      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={editId ? editMusic : addMusic}>
        <Text style={styles.buttonText}>
          {editId ? 'Update Music' : 'Add Music'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={musics}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.musicItem}>
            <Text style={styles.musicText}>
              {item.title} by {item.artist}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setTitle(item.title);
                  setArtist(item.artist);
                  setEditId(item.id);
                }}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteMusic(item.id)}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaeaea',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#2980b9',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  musicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  musicText: {
    fontSize: 18,
    color: '#34495e',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MusicList;
