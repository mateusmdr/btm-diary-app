import React from 'react';
import {SafeAreaView, Text } from 'react-native';

import styles from './stylesheet.js';

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>Open up App.js to start working on your app!</Text>
    </SafeAreaView>
  );
}