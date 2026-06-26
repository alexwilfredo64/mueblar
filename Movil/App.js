import "./global.css";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import SignInForm from "./components/SignInForm"

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SignInForm /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
