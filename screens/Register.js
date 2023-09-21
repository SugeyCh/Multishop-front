import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { postUser } from "../routes/register";
import { useNavigation } from "@react-navigation/native";
// import Login from "./Login";

const Register = ({ config }) => {
  const navigation = useNavigation();
  const [user, setuser] = useState({
    nombre: "",
    contrasena: "",
    rol: "admin",
  });

  const handleSubmit = async () => {
    try {
      const apiUrl = `http://${config.ip}:${config.port}/register`;
      const res = await postUser(user, apiUrl);
      if (res) {
        alert("¡Registro exitoso!");
        setuser({ nombre: "", contrasena: "", rol: "admin" });
        navigation.navigate('Login')
      }else{
        alert('No se pudo crear el usuario, reinicia la app.')
      }
    } catch (error) {
      alert("Error en la consulta, dirección y puerto incorrectos.", error);
      console.log(error)
    }
  };

  const handleChange = (name, value) => {
    setuser({ ...user, [name]: value });
  };

  return (
    <ScrollView>
      <View style={styles.imagen}>
        <Image
          source={require("../assets/user.png")}
          style={styles.userImage}
        />
      </View>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Nombre de usuario"
          style={styles.inputCode}
          onChangeText={(text) => handleChange("nombre", text)}
          value={user.nombre}
        />
        <TextInput
          placeholder="Contraseña"
          value={user.contrasena}
          onChangeText={(text) => handleChange("contrasena", text)}
          style={styles.inputAm}
        />
        <View style={styles.picker}>
            <Picker
            selectedValue={user.rol}
            onValueChange={(itemValue, itemIndex) =>
                handleChange("rol", itemValue)
            }
            >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Colector" value="colector" />
            <Picker.Item label="Visor" value="visor" />
            </Picker>
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  imagen: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  userImage: {
    width: 150,
    height: 150, 
    borderRadius: 50, 
  },
  camera: {
    height: 300,
    marginTop: 40,
    borderColor: "red",
    borderRadius: 10,
  },
  inputs: {
    marginTop: 20,
    alignItems: "center",
  },
  inputCode: {
    borderWidth: 1,
    borderColor: "black",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
  },
  picker: {
    width: "40%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginVertical: 20,
    textAlign: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "black",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  inputAm: {
    borderWidth: 1,
    borderColor: "black",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "black",
  },
  submit: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: "black",
    marginBottom: 70,
  },
});

export default Register;
