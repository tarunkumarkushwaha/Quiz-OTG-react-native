import { Image, StyleSheet, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity,ActivityIndicator } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [signIn, setSignIn] = useState(false); 
  const setdbCustomQuestions = () => {
    // fn
  };
  const getdbQuestions = () => {
    // fn
  };

  const TestSetting = () => {
    console.warn("Navigating to Test Setting...");
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.mainContainer}>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Welcome to QuizOTG!</Text>
      <Text style={styles.description}>
        Master your knowledge with our diverse range of quizzes and challenges. Choose your
        subject, and dive into a world of coding quizzes designed to challenge. Start exploring
        now and unlock your potential!
      </Text>
    </View>

    {/* Buttons */}
    <View style={styles.buttonContainer}>
      {signIn ? (
        <TouchableOpacity onPress={TestSetting} style={styles.startTestButton}>
          <Text style={styles.buttonText}>Start Test</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => console.log("More details")} style={styles.moreDetailsButton}>
          <Text style={styles.buttonText}>Click for more detail</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  startTestButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  moreDetailsButton: {
    backgroundColor: '#60a5fa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
