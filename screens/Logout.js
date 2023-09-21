import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../routes/login";

const Logout = ({ config }) => {
  const navigation = useNavigation();
  const [ip, setIp] = useState(""); // Esto define ip y setIp
  const [port, setPort] = useState(""); // Esto define ip y setIp

  useEffect(() => {
    const getConfig = async () => {
      try {
        const savedIp = await AsyncStorage.getItem("ip");
        const savedPort = await AsyncStorage.getItem("port");
        if (savedIp && savedPort) {
          setIp(savedIp);
          setPort(savedPort);
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
    try {
      const apiUrl = `http://${ip}:${port}/logout`;
      const res = await logout(apiUrl);
      if (res) {
        console.log("Cerrado de sesión exitoso.");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
      <Text style={styles.textLogout}>Salir</Text>
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
