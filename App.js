import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Header } from "react-native/Libraries/NewAppScreen";
import Main from "./screens/Main";
import LectorAdmin from "./screens/LectorAdmin";
import LectorColector from "./screens/LectorColector";
import LectorVisor from "./screens/LectorVisor";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Api from "./screens/Api";
import Logout from "./screens/Logout";
import axios from "axios";
import ImagenHeader from "./screens/ImagenHeader";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [config, setConfig] = useState({ ip: ""});
  // const [config, setConfig] = useState({ ip: "", port: ""});
  const [usernombre, setusernombre] = useState("");

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  const UserChange = (usernombre) => {
    setusernombre(usernombre);
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E4E4E4",
            },
            headerTitle: () => <ImagenHeader />,
            headerRight: () => (
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate("Api")}
              >
                <Image
                  source={require("./assets/settings.png")}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }} // Estilos de la imagen
                />
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <Login {...props} config={config} handleUser={UserChange} />
          )}
        </Stack.Screen>
        {/* <Stack.Screen
          name="Main"
          options={() => ({
            headerRight: (props) => <Logout {...props} config={config} />,
          })}
        >
          {(props) => <Main {...props} config={config} />}
        </Stack.Screen> */}
        <Stack.Screen
          name="Api"
          options={() => ({
            headerTitle: "Configuración",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E4E4E4",
              position: "absolute",
            },
            headerTitleStyle: { color: "#5B5B5B" },
          })}
        >
          {(props) => <Api {...props} onConfigChange={handleConfigChange} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Register">
          {(props) => <Register {...props} config={config} />}
        </Stack.Screen> */}
        <Stack.Screen
          name="LectorAdmin"
          options={() => ({
            headerBackVisible: false,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E4E4E4",
              position: "absolute",
            },
            headerTitle: () => <ImagenHeader />,
            headerRight: (props) => <Logout {...props} config={config} />,
          })}
          children={(props) => (
            <LectorAdmin {...props} config={config} UserName={usernombre} />
          )}
        />
        <Stack.Screen
          name="LectorColector"
          options={() => ({
            headerBackVisible: false,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E4E4E4",
              position: "absolute",
            },
            headerTitle: () => <ImagenHeader />,
            headerRight: (props) => <Logout {...props} config={config} />,
          })}
        >
          {(props) => (
            <LectorColector {...props} config={config} UserName={usernombre} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="LectorVisor"
          options={() => ({
            headerBackVisible: false,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#E4E4E4",
              position: "absolute",
            },
            headerTitle: () => <ImagenHeader />,
            headerRight: (props) => <Logout {...props} config={config} />,
          })}
        >
          {(props) => <LectorVisor {...props} config={config} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "crimson",
    borderRadius: 5,
    width: 50,
  },
  textLogout: {
    padding: 3,
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
  settingsButton: {
    // width: 105,
    backgroundColor: "#0D4D80",
    marginBottom: -3,
    borderRadius: 5,
    padding: 5,
  },
  settingsText: {
    color: "white",
    textAlign: "center",
    padding: 5,
  },
});
