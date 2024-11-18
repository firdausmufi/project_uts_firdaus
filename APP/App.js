// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import AddMusicScreen from './src/components/AddMusicScreen';
import EditMusicScreen from './src/components/EditMusicScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add Music" component={AddMusicScreen} />
                <Stack.Screen name="Edit Music" component={EditMusicScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;