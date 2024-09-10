import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className=" flex-col flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pthin bg-red-400">Aora!</Text>
      <StatusBar style="auto" />
      <Link style={{ color: "blue" }} href="/profile">
        welcome to umsu
      </Link>
    </View>
  );
};

export default App;


