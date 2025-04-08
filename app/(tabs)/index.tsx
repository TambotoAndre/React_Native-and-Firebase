import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Router from "./src/router";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";

const App = () => {
  useKeepAwake();
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
