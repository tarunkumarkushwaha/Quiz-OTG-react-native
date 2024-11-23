import React, { useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataContext } from "../app/_layout";

const Timer = ({ finalSubmit }) => {
  const [sec, setsec] = useState(0);
  const { start, setstart, min, setmin } = useContext(DataContext);

  const timer = () => {
    if (start) {
      if (sec > 0) {
        setsec(sec - 1);
      } else {
        if (min > 0) {
          setmin(min - 1);
          setsec(59);
        }
      }
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(timer, 1000);
    if (min === 0 && sec === 0) {
      clearInterval(timerInterval);
      finalSubmit();
    }
    return () => clearInterval(timerInterval);
  }, [sec, min]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timeText}>{min}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.timeText}>{sec < 10 ? `0${sec}` : sec}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#98FB98",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
  },
  separator: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    marginHorizontal: 5,
  },
});

export default Timer;
