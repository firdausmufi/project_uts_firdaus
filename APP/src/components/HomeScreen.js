// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import api from '../API';

const HomeScreen = ({navigation}) => {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    fetchMusics();
  }, []);

  const fetchMusics = async () => {
    try {
      const response = await api.get('/musik');
      setMusics(response.data);
    } catch (error) {
      console.error('Failed to fetch musics:', error);
    }
  };

  const deleteMusic = async id => {
    try {
      await api.delete(`/musik/${id}`);
      setMusics(musics.filter(music => music.id !== id)); // Hapus musik dari state
    } catch (error) {
      console.error('Failed to delete music:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Music List</Text>
      <Button
        title="Add Music"
        onPress={() => navigation.navigate('Add Music')}
      />
      <FlatList
        data={musics}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.musicItem}>
            <View>
              <Text style={styles.musicTitle}>{item.judul}</Text>
              <Text style={styles.musicArtist}>Artist: {item.artis}</Text>
              <Text style={styles.musicGenre}>Genre: {item.genre}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate('Edit Music', {music: item})}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteMusic(item.id)} // Langsung delete tanpa Alert
              />
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
  musicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  musicArtist: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  musicGenre: {
    fontSize: 14,
    color: '#95a5a6',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 160,
  },
});

export default HomeScreen;
