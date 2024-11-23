import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  ActivityIndicator,
} from "@react-navigation/native";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "@/hooks/useContext";

// Prevent the splash screen from auto-hiding before asseet loading is completee.
SplashScreen.preventAutoHideAsync();
export const DataContext = createContext();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [testSub, settestSub] = useState("indianGK");
  const [min, setmin] = useState(10);
  const [TestQuestion, setTestQuestion] = useState();
  const [dark, setdark] = useState(false);
  const [signIn, setsignIn] = useState(true);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [result, setresult] = useState({
    correctresponse: 0,
    incorrectresponse: 0,
    percentage: 0,
    subject: "",
    timetaken: 0,
  });
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0);
  const [incorrectresponse, setincorrectresponse] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [start, setstart] = useState(false);
  const [timeover, setTimeover] = useState(false);

  const LoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Loading Quizes</Text>
    </View>
  );

  const themeChange = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem("Theme", JSON.stringify(newTheme));
  };

  const storeData = async (key, value) => {
    try {
      const stringifiedObject = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedObject);
      console.log(stringifiedObject, "result saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const item1 = await AsyncStorage.getItem("Name");
      const item2 = await AsyncStorage.getItem("Password");
      const item3 = await AsyncStorage.getItem("login");
      const THEME = await AsyncStorage.getItem("Theme");
      const RESULT = await AsyncStorage.getItem("result");

      if (item1) setName(JSON.parse(item1));
      if (item2) setPwd(JSON.parse(item2));
      if (item3) setSignIn(JSON.parse(item3));
      if (THEME) setDark(JSON.parse(THEME));

      if (RESULT) {
        const parsedResult = JSON.parse(RESULT);
        setresult(parsedResult);
        setcorrectresponse(parsedResult.correctresponse);
        setincorrectresponse(parsedResult.incorrectresponse);
        setpercentage(parsedResult.percentage)
        await AsyncStorage.setItem("pastresult", RESULT);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveResult = async () => {
      await storeData("result", {
        correctresponse: correctresponse,
        incorrectresponse: incorrectresponse,
        subject: testSub,
        percentage: percentage,
        timetaken: 0,
      });
    };
    // console.log(percentage,"per")
    !isLoading && saveResult();
  }, [correctresponse, incorrectresponse, percentage]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataContext.Provider
        value={{
          isLoading,
          setIsLoading,
          start,
          setstart,
          TestQuestion,
          setTestQuestion,
          min,
          setmin,
          timeover,
          setTimeover,
          name,
          setName,
          pwd,
          setPwd,
          signIn,
          setsignIn,
          dark,
          themeChange,
          correctresponse,
          setcorrectresponse,
          setincorrectresponse,
          incorrectresponse,
          CustomQuestions,
          setCustomQuestions,
          testSub,
          settestSub,
          storeData,
          result,
          setresult,
          percentage,
          setpercentage,
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DataContext.Provider>
    </ThemeProvider>
  );
}
