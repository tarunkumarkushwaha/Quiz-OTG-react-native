import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  ActivityIndicator,
} from "@react-navigation/native";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
} from "react";
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
  const [signIn, setsignIn] = useState(true);
  const [result, setresult] = useState({
    TestQuestion: {
      time: 1, // in minutes
      questions: [
        // ... question
      ],
    },
    correctresponse: 0,
    incorrectresponse: 0,
    subject: "indianGK",
    timeLeft: { min: 0, sec: 0 },
    timeTaken: { min: 0, sec: 0 },
  });
  const [CustomQuestions, setCustomQuestions] = useState([]);
  const [start, setstart] = useState(false);
  const [timeover, setTimeover] = useState(false);

  const LoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Loading Quizes</Text>
    </View>
  );

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

  const storeData = async (key, value) => {
    try {
      const stringifiedObject = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedObject);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const saveResult = () => {
      storeData("result", result);
    };
    !isLoading && saveResult();
  }, [result]);

  // console.log(result);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <DataContext.Provider
        value={{
          isLoading,
          setIsLoading,
          start,
          setstart,
          timeover,
          setTimeover,
          signIn,
          setsignIn,
          CustomQuestions,
          setCustomQuestions,
          result,
          setresult,
          storeData,
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
