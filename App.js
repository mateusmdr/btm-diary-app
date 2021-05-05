import React from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import {AddButton, EditButton, RemoveButton} from './Buttons.jsx';
import {useFonts} from 'expo-font';





import styles from './assets/stylesheet.js';

export default function App() {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!loaded){return null;}

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header/>
      <SearchBar/>
      <View style={styles.buttonList}>
        <AddButton/>
        <EditButton/>
        <RemoveButton/>
      </View>      
    </SafeAreaView>
  );
}