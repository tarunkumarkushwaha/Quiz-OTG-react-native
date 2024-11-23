import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from "../_layout";

const custom = () => {
  const [ques, setQues] = useState('');
  const [viewQues, setViewQues] = useState(false);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const { CustomQuestions, setCustomQuestions, setMin, min } = useContext(DataContext);

  const removePreviousQues = async () => {
    try {
      await AsyncStorage.setItem('questions', JSON.stringify([]));
      setCustomQuestions([]);
    } catch (error) {
      console.error('Error removing previous questions:', error);
    }
  };

  // AsyncStorage.setItem('questions', JSON.stringify(CustomQuestions));

  const addQuestionToTest = async () => {
    const newQuestion = {
      question: ques,
      option1,
      option2,
      option3,
      option4,
      correctresponse: correctAnswer,
      time: 1,
    };

    try {
      const storedQuestions = await AsyncStorage.getItem('questions');
      const questions = JSON.parse(storedQuestions) || [];
      questions.push(newQuestion);
      await AsyncStorage.setItem('questions', JSON.stringify(questions));
      setCustomQuestions(questions);
      setCorrectAnswer('');
      setQues('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {CustomQuestions.length > 0 && (
        <View style={styles.previousQuestionsContainer}>
          <Text style={styles.previousQuestionsText}>Previous Questions</Text>
          <Button title="Remove Previous Questions" onPress={removePreviousQues} />
        </View>
      )}
      {/* <ViewQuestions open={viewQues} questions={CustomQuestions} onCancelClick={() => setViewQues(false)} /> */}
      <TouchableOpacity style={styles.viewQuestionsButton} onPress={() => setViewQues(true)}>
        <Text style={styles.viewQuestionsButtonText}>View Questions</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Question"
          multiline={true}
          value={ques}
        />
        <TextInput
          style={styles.input}
          placeholder="Option 1"
          onChangeText={(text) => setOption1(text)}
          value={option1}
        />
        <TextInput
          style={styles.input}
          placeholder="Option 2"
          onChangeText={(text) => setOption2(text)}
          value={option2}
        />
        <TextInput
          style={styles.input}
          placeholder="Option 3"
          onChangeText={(text) => setOption3(text)}
          value={option3}
        />
        <TextInput
          style={styles.input}
          placeholder="Option 4"
          onChangeText={(text) => setOption4(text)}
          value={option4}
        />
        <TextInput
          style={styles.input}
          placeholder="Correct Answer"
          onChangeText={(text) => setCorrectAnswer(text)}
          value={correctAnswer}
        />
        <TextInput
          style={styles.input}
          placeholder="Set Time for All Questions"
          onChangeText={(text) => setMin(text)}
          value={min}
        />
      </View>
      <Button title="Add Question" onPress={addQuestionToTest} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "grey"
  },
  previousQuestionsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  previousQuestionsText: {
    fontSize: 18,
    marginBottom: 10,
  },
  viewQuestionsButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  viewQuestionsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default custom;