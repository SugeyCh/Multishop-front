import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../routes/login";
import RuedaCarga from "./RuedaCarga";

const Logout = ({ config }) => {
  const navigation = useNavigation();
  const [ip, setIp] = useState(""); 
  // const [port, setPort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const savedIp = await AsyncStorage.getItem("ip");
        if (savedIp) {
          setIp(savedIp);
          // Si hay datos guardados en AsyncStorage, no mostramos la alerta
        } else {
          Alert.alert(
            "¡Hola!",
            "Por favor ingresa la dirección IP y puerto al que se conectará.",
            [
              {
                text: "Ir a configuración",
                onPress: () => {
                  navigation.navigate("Api");
                },
              },
            ]
          );
        }
      } catch (error) {
        console.error("Error al recuperar la configuración:", error);
      }
    };
    getConfig();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      let apiUrl = ``;
      if (!(config.ip == "")) {
        apiUrl = `http://${config.ip}:3000/logout`;
        console.log("dirección con config: ", apiUrl);
      } else {
        apiUrl = `http://${ip}:3000/logout`;
        console.log("dirección con async: ", apiUrl);
      }
      const res = await logout(apiUrl);
      if (res) {
        console.log("Cerrado de sesión exitoso.");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error: ", err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
      <Text style={styles.textLogout}>Salir</Text>
      {isLoading && <RuedaCarga />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "#0D4D80",
    borderRadius: 5,
    width: 50,
    marginBottom: -3,
  },
  textLogout: {
    padding: 3,
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
});

export default Logout;
