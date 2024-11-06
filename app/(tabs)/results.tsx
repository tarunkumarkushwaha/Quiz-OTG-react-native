import React, { useState, useEffect, useRef,useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import { DataContext } from "../_layout";

const Result = () => {
  // const [dark, setDark] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const questionLengthRef = useRef(0);
  const percentageRef = useRef(0);

  const { TestQuestion, correctresponse, incorrectresponse, dark, CustomQuestions, testSub, signIn } = useContext(DataContext);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const token = await AsyncStorage.getItem('userToken');
  //     setIsLoggedIn(!!token);
  //   };

  //   checkLoginStatus();
  // }, []);

  // const style = {
  //   ui: dark ? "bg-slate-700" : "bg-gradient-to-b from-green-50 to-green-200 ",
  //   text: dark ? "text-white" : "text-slate-900"
  // };

  questionLengthRef.current = testSub !== "Your Questions" ? TestQuestion ? TestQuestion.length : 1 : CustomQuestions ? CustomQuestions.length : 1;
  percentageRef.current = (correctresponse / questionLengthRef.current) * 100;

  return (
    <View style={[styles.container]}>
      {signIn ? (
        <View style={[styles.contentContainer,
        //  { backgroundColor: dark ? '#222' : '#fff' }
         ]}>
          <Text style={[styles.title, { color: !dark ? '#fff' : '#000' }]}>Result</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Your Result</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Correct Responses - {correctresponse}</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Incorrect Responses - {incorrectresponse}</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Unattempted Questions - {questionLengthRef.current - (incorrectresponse + correctresponse)}</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Total Questions - {questionLengthRef.current}</Text>
          <Text style={[styles.resultText, { color: !dark ? '#fff' : '#000' }]}>Percentage - {Number(Math.round(percentageRef.current + 'e2') + 'e-2')} %</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: dark ? '#333' : '#007bff' }]}
            onPress={() => {
              // Handle button press, e.g., navigate to discussions
            }}
          >
            <Text style={{ color: dark ? '#fff' : '#fff' }}>Discussions</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.contentContainer, { backgroundColor: dark ? '#222' : '#fff' }]}>
          <Text style={[styles.title, { color: dark ? '#fff' : '#000' }]}>Please Log In to Use the App</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: dark ? '#333' : '#007bff' }]}
            onPress={() => {
              // Handle button press, e.g., navigate to login
            }}
          >
            <Text style={{ color: dark ? '#fff' : '#fff' }}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#282c34",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    color:"#007bff"
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Result;