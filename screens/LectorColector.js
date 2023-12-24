import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  BackHandler,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getCode, postCode } from "../routes/barcode";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RuedaCarga from "./RuedaCarga";

const LectorColector = ({ config, UserName }) => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setcode] = useState({
    chijo: "",
  });
  const [movement, setmovement] = useState({
    user: UserName,
    cod_prod: "",
    conteo: "",
  });
  const [inv, setinv] = useState({
    descrip: "",
  });
  const [ip, setIp] = useState("");
  // const [port, setPort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [done, setdone] = useState(false);


  useEffect(() => {
    console.log("Iniciado ", movement.user);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanned(true);
    };

    const getConfig = async () => {
      try {
        const savedIp = await AsyncStorage.getItem("ip");
        // const savedPort = await AsyncStorage.getItem("port");
        if (savedIp) {
          setIp(savedIp);
          // setPort(savedPort);
        } else {
          Alert.alert(
            "¡Hola!",
            "Por favor ingresa la dirección a la que se conectará.",
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

    const backAction = () => {
      Alert.alert("Espera", "Para salir de la app debes cerrar sesión.");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    getConfig();
    getBarCodeScannerPermissions();
    return () => backHandler.remove();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let apiUrl = ``;
      if (!(config.ip == "")) {
          apiUrl = `https://multishop-backend.onrender.com/lector`;
          // apiUrl = `http://${config.ip}:${config.port}/lector`;
        console.log("dirección con config: ", apiUrl);
      } else {
          apiUrl = `https://multishop-backend.onrender.com/lector`;
          // apiUrl = `http://${ip}:${port}/lector`;
        console.log("dirección con async: ", apiUrl);
      }
      const res = await postCode(movement, apiUrl);
      if (res) {
        Alert.alert("¡Muy bien!", "Registro exitoso.");
        setcode({ chijo: "" });
        setinv({ descrip: "" });
        setmovement({ conteo: "", user: UserName });
        setScanned(true);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Error en la consulta, ejecuta el servidor para continuar."
      );
    }finally{
      setIsLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setmovement({ ...movement, user: UserName, conteo: parseInt(value) });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setcode({ chijo: data });
    setmovement({ conteo: "" });
    handleSearch(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleClean = () => {
    setScanned(true);
    setdone(false);
    setcode({ chijo: "" });
    setinv({ descrip: "" });
    setmovement({ conteo: "", user: UserName });
  };

  const handleSearch = async (data) => {
    if (code.chijo == "") {
      setScanned(false);
      setTimeout(() => {
        setScanned(true);
      }, 5000);
    } else {
      setScanned(true);
      setdone(true);
      if (inv.descrip == "") {
        setIsLoading(true);
      }
    }
    try {
      // console.log(codeToSearch)
      let apiUrl = ``;
      if (!(config.ip == "")) {
          apiUrl = `http://${config.ip}:3000/lector`;
          // apiUrl = `http://${config.ip}:${config.port}/lector`;
        console.log("dirección con config: ", apiUrl);
      } else {
          apiUrl = `http://${ip}:3000/lector`;
          // apiUrl = `http://${ip}:${port}/lector`;
        console.log("dirección con async: ", apiUrl);
      }
      if(code.chijo != ''){

        const result = await getCode(code.chijo, apiUrl);
        // const apiUrlUser = `http://${config.ip}:${config.port}/lector`
        // const [user] = await getUsers(apiUrlUser)
        // setmovement({ id_user: user[0].id_user, cod_prod: code.chijo });
  
        if (typeof result === "object") {
          setinv({
            descrip: result.descrip,
          });
          setmovement({ cod_prod: result.codigo, user: UserName, conteo: "" });
          console.log(movement);
        } else {
          Alert.alert(
            "Lo siento",
            `No se encontraron productos con el código ${code.chijo}, intenta nuevamente.`
          );
          setcode({ chijo: "" });
        }
      }
    } catch (error) {}
    finally{
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.gradientOverlay} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      <View
        style={{
          padding: 10,
          marginTop: 10,
        }}
      ></View>
      <View style={styles.inputs}>
        <TextInput
          placeholder={scanned ? "Escanea o escribe el código" : "..."}
          style={styles.inputCode}
          value={code.chijo}
          keyboardType="numeric"
          editable={scanned ? true : false}
          onChangeText={(text) => {
            setcode({ chijo: text });
          }}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.search}
            disabled={inv.descrip != "" ? true : false}
            onPress={handleSearch}
          >
            <Text style={{ color: "white" }}>
              {scanned ? "Buscar" : "Buscando"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clean} onPress={handleClean}>
            <Text style={{ color: "white" }}>
              {scanned ? "Limpiar" : "Cancelar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputsOne}>
        <ScrollView style={styles.inputText}>
          <TextInput
            placeholder="Descripción"
            value={inv.descrip}
            multiline
            editable={false}
            style={{ color: "black", textAlign: "center" }}
          />
        </ScrollView>
        <TextInput
          placeholder="Ingresar conteo"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("conteo", text)}
          editable={movement.conteo == "" && inv.descrip == "" ? false : true}
          style={styles.inputAm}
          value={movement.conteo}
          maxLength={5}
        />
        {movement.conteo == "" ? (
          <View style={styles.submitDisabled}>
            <Text style={{ color: "white" }}>Registrar</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={{ color: "white" }}>Registrar</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading && <RuedaCarga />}
      <View style={styles.footer}>
        <Text style={{ marginRight: 30, fontSize: 20, color: "gray" }}>
          Designed by
        </Text>
        <Image
          source={require("../assets/MultilogoPNGR.png")}
          style={{
            width: 180,
            height: 70,
            marginLeft: -66,
            marginBottom: -27,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logoMulti-removebg-HD.png")}
          style={{
            width: "100%",
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    elevation: 120,
    backgroundColor: "#E4E4E4",
    shadowColor: "black",
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
  inputsOne: {
    alignItems: "center",
  },
  inputCode: {
    backgroundColor: "#E5E5E5",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
  },
  inputText: {
    backgroundColor: "#E5E5E5",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  inputAm: {
    backgroundColor: "#E5E5E5",
    padding: 9,
    width: "70%",
    textAlign: "center",
    borderRadius: 10,
    marginTop: 10,
    zIndex: 3,
  },
  search: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    margin: 5,
    backgroundColor: "#02A0CA",
  },
  submit: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#02A0CA",
    marginBottom: 100,
    zIndex: 3,
  },
  submitDisabled: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: "gray",
    marginBottom: 100,
    zIndex: 3,
  },
  searching: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#38DBBD",
  },
  clean: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    margin: 5,
    backgroundColor: "#0D4D80",
  },
  footer: {
    flexDirection: "row",
    zIndex: 9,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    bottom: 65,
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    left: -6,
    right: 0,
    alignItems: "center",
  },
});

export default LectorColector;
