import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  GoogleSignin.configure({
    webClientId:
      "630685054297-0u3m93ebfgkcknl17j5abtm1j7vppfu9.apps.googleusercontent.com", // From your Google Cloud Console
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user);
    })
      .catch((error) => {
         setError("Failed to sign in with Google");
       });
  };

  const signOut = async () => { 
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      setError(error);
    }
  }

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
        {error && <Text>{error}</Text>}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Text style={styles.text}>Hello, {user.displayName}!</Text>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Button title="Sign Out" onPress={signOut} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
