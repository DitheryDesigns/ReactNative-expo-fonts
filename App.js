import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding
        await Font.loadAsync({
          'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
          // You can load multiple fonts here
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync(); // Hide the splash screen after fonts are loaded
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Return null or a loading component until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Lobster-Regular', fontSize: 24 }}>Hello, custom font!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
