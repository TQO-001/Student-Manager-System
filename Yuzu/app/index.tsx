import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from "react";
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Cehck your emails!');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed: ' + err.message);
    } finally {
    setLoading(false);
    }
  }

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('Cehck your emails!');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign in failed: ' + err.message);
    } finally {
    setLoading(false);
    }
  }

  return (
    <View style={ styles.container } >
      <KeyboardAvoidingView behavior="padding">
        <Text>Password</Text>
        <TextInput 
          style={ styles.input }
          value={ email }
          onChangeText={ setEmail }
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <Text>Password</Text>
        <TextInput 
          style={ styles.input }
          value={ password }
          onChangeText={ setPassword }
          secureTextEntry
          placeholder="Password"
        />
        {loading ? (
          <ActivityIndicator size={ 'small' } style={{ margin: 28 }} />
        ) : (
          <>
            <Button onPress={signUp} title="Login"/>
            <Button onPress={signIn} title="Create Account"/>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
});