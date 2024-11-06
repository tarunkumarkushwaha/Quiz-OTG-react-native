import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "@/hooks/useContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const DataContext = createContext();

export default function RootLayout() {
  const [testSub, settestSub] = useState("Javascript")
  const [min, setmin] = useState(10)
  const [TestQuestion, setTestQuestion] = useState()
  const [dark, setdark] = useState(false)
  const [signIn, setsignIn] = useState(true)
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [correctresponse, setcorrectresponse] = useState(0)
  const [incorrectresponse, setincorrectresponse] = useState(0)
  const [pastpercentage, setpastpercentage] = useState(0)
  const [start, setstart] = useState(false)

  const themeChange = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem("Theme", JSON.stringify(newTheme));
  };

  useEffect(() => {
    const loadData = async () => {
      const item1 = await AsyncStorage.getItem("Name");
      const item2 = await AsyncStorage.getItem("Password");
      const item3 = await AsyncStorage.getItem("login");
      const QUESTION = await AsyncStorage.getItem("questions");
      const THEME = await AsyncStorage.getItem("Theme");
      const PERCENT = await AsyncStorage.getItem("result");

      if (item1) setName(JSON.parse(item1));
      if (item2) setPwd(JSON.parse(item2));
      if (item3) setSignIn(JSON.parse(item3));
      if (THEME) setDark(JSON.parse(THEME));
      if (QUESTION) setTestQuestion(JSON.parse(QUESTION));
      if (PERCENT) setPastPercentage(JSON.parse(PERCENT));
    };

    loadData();
  }, []);

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
          start,
          setstart,
          TestQuestion,
          setTestQuestion,
          min,
          setmin,
          name,
          setName,
          pwd,
          pastpercentage,
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
