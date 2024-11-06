import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { DataContext } from "../_layout";
import { useContext } from "react";
import { View, Text, Picker, Button, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import AddQuestions from '../components/AddQuestions';
// import PleaseLogin from '../components/PleaseLogin';

export default function Start() {
  // const {ata,kukur} = useContext(DataContext);

  // console.log(ata)

  const { signIn, CustomQuestions, testSub, settestSub, setstart, setmin } =
    useContext(DataContext);
  const navigation = useNavigation();

  const startTest = () => {
    setstart(true);
    Alert.alert("Notice", "Test has started");
    // navigation.navigate("CustomTest"); // Update with your navigation path
    // AsyncStorage.setItem('questions', JSON.stringify(CustomQuestions));
  };

  const jsTest = () => {
    setstart(true);
    Alert.alert("Notice", "Test has started");
    // navigation.navigate("Test"); // Update with your navigation path
  };

  return signIn ? (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Test Settings</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Subject</Text>
          <Picker
            selectedValue={testSub}
            onValueChange={(value) => settestSub(value)}
            style={styles.picker}
          >
            <Picker.Item label="HTML" value="html" />
            <Picker.Item label="CSS" value="css" />
            <Picker.Item label="JavaScript" value="javascript" />
            <Picker.Item label="React" value="react" />
            <Picker.Item label="WordPress" value="wordpress" />
            <Picker.Item label="Previous Paper" value="Previous paper" />
            <Picker.Item label="Your Custom Questions" value="Your Questions" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          {testSub !== "Your Questions" && testSub !== "Previous paper" && (
            <Button title="Start Test" onPress={jsTest} color="#4CAF50" />
          )}

          {CustomQuestions.length > 0 && testSub === "Previous paper" ? (
            <Button title="Start Test" onPress={startTest} color="#4CAF50" />
          ) : (
            testSub === "Previous paper" && (
              <Text style={styles.notAvailableText}>Not available</Text>
            )
          )}

          {testSub === "Your Questions" && (
            <Button title="Start Test" onPress={startTest} color="#4CAF50" />
          )}
        </View>

        {/* {testSub === "Your Questions" && <AddQuestions />} */}
        <View style={styles.container}>
          <Text style={styles.title}>Test Rules</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              Test has a specified time limit. Ensure to complete it within the
              given time.
            </Text>
            <Text style={styles.listItem}>
              Once you move to the next question, you cannot return to the
              previous one.
            </Text>
            <Text style={styles.listItem}>
              Do not close the page during the test; it may cancel your test.
            </Text>
            <Text style={styles.listItem}>
              Make sure your internet connection is stable to avoid disruptions.
            </Text>
            <Text style={styles.listItem}>
              Do not navigate to other pages or minimize screen
            </Text>
            <Text style={styles.listItem}>
              Typing is not permitted, so do not use keyboard
            </Text>
            <Text style={styles.listItem}>
              Follow all instructions provided by the test administrator.
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>hello</Text>
    // <PleaseLogin />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#282c34",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 20,
  },
  settingsContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
  },
  pickerContainer: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  label: {
    color: "#ffffff",
    marginBottom: 5,
    width: 300,
  },
  picker: {
    height: 40,
    width: 200,
    color: "#ffffff",
    backgroundColor: "#555",
    borderRadius: 5,
  },

  buttonContainer: {
    marginTop: 20,
  },
  notAvailableText: {
    textAlign: "center",
    color: "#cccccc",
    marginVertical: 10,
  },

    container: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    marginTop :24 ,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:"center",
  },
  listContainer: {
    // paddingLeft: 20,
    textAlign:"center",
  },
  listItem: {
    marginBottom: 8,
  },
});
