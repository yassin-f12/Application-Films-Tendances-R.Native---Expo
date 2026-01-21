import { Stack } from "expo-router";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#2a2a2a" }, 
          headerTintColor: "white",                     
          headerTitleStyle: { fontWeight: "bold" },    
          headerTitleAlign: "center",                  
          contentStyle: { backgroundColor: "#1e1e1e" },
          animation: Platform.OS === "ios" ? "slide_from_right" : "default",
        }}
      />
    </>
  );
}