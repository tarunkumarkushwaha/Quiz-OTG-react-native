import React, { useEffect, useRef, useContext, useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DataContext } from "../_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Result = () => {
  const [haspastresult, sethaspastresult] = useState(false);
  const [dark, setdark] = useState(false);
  const [pastresult, setpastresult] = useState([]);
  const questionLengthRef = useRef(0);
  const improvementRef = useRef(0);

  const { result, setresult, CustomQuestions, signIn, setstart, setmin } =
    useContext(DataContext);

  useEffect(() => {
    const getPastResult = async () => {
      const pastResult = await AsyncStorage.getItem("pastresult");
      if (pastResult) setpastresult(JSON.parse(pastResult)[JSON.parse(pastResult).length - 2]);
      if (pastResult) sethaspastresult(true);
    };
    getPastResult();
    setstart(false);
    setmin(10);
  }, []);

  return (
    <View style={[styles.container]}>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/05/04/24/question-2039124_1280.jpg",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {signIn ? (
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: !dark ? "#333" : "#333" }]}>
            Result of {result.subject} quiz
          </Text>
          <View style={styles.resultBox}>
            <Text
              style={[styles.resultText, { color: !dark ? "#ffffff" : "#333" }]}
            >
              Correct Responses:{" "}
              <Text style={styles.value}>{result.correctresponse}</Text>
            </Text>
            <Text
              style={[styles.resultText, { color: !dark ? "#ffffff" : "#333" }]}
            >
              Incorrect Responses:{" "}
              <Text style={styles.value}>{result.incorrectresponse}</Text>
            </Text>
            <Text
              style={[styles.resultText, { color: !dark ? "#ffffff" : "#333" }]}
            >
              Unattempted Questions:{" "}
              <Text style={styles.value}>
                {result.TestQuestion.questions.length -
                  (result.incorrectresponse + result.correctresponse)}
              </Text>
            </Text>
            <Text
              style={[styles.resultText, { color: !dark ? "#ffffff" : "#333" }]}
            >
              Total Questions:{" "}
              <Text style={styles.value}>
                {result.TestQuestion.questions.length}
              </Text>
            </Text>
            <Text
              style={[styles.resultText, { color: !dark ? "#ffffff" : "#333" }]}
            >
              Percentage:{" "}
              <Text style={styles.value}>{result.percentage} %</Text>
            </Text>

            <Text style={styles.resultTitleText}>Past Results</Text>

            {haspastresult ? (
              <>
                {" "}
                <Text
                  style={[
                    styles.resultText,
                    { color: !dark ? "#ffffff" : "#333" },
                  ]}
                >
                  Test subject:{" "}
                  <Text style={styles.value}>{pastresult.subject}</Text>
                </Text>
                <Text
                  style={[
                    styles.resultText,
                    { color: !dark ? "#ffffff" : "#333" },
                  ]}
                >
                  Percentage:{" "}
                  <Text style={styles.value}>{pastresult.percentage} %</Text>
                </Text>
                <Text
                  style={[
                    styles.resultText,
                    { color: !dark ? "#ffffff" : "#333" },
                  ]}
                >
                  Time taken:{" "}
                  <Text style={styles.value}>{pastresult.timetaken} min</Text>
                </Text>
                {result.subject == pastresult.subject && (
                  <Text
                    style={[
                      styles.resultText,
                      { color: !dark ? "#ffffff" : "#333" },
                    ]}
                  >
                    Improvement:{" "}
                    <Text style={styles.value}>
                      {eval(result.percentage - pastresult.percentage)} %
                    </Text>
                  </Text>
                )}
              </>
            ) : (
              <Text style={{ color: !dark ? "#ffffff" : "#333" }}>
                no past results
              </Text>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: !dark ? "#ffffff" : "#333" }]}>
            Please Log In to Use the App
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: !dark ? "#444" : "#007bff" },
            ]}
            onPress={() => {
              // Handle button press
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#333",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 12,
  },
  resultTitleText: {
    fontSize: 28,
    marginBottom: 14,
    fontWeight: "bold",
    color: "#FF8C00",
  },
  value: {
    fontWeight: "bold",
    color: "#007bff",
  },
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Result;
