import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import {useNavigation} from '@react-navigation/native'
import axios from "axios";

const Main = ({config}) => {

  axios.defaults.withCredentials = true;
  const navigation = useNavigation();
  const [auth, setauth] = useState(false)
  const [message, setmessage] = useState("")
  const [nombre, setnombre] = useState("")

  useEffect(() => {
    axios.get(`https://multishop-backend.onrender.com`)
    .then(res => {
      if(res.data.Status === "Success"){
        setauth(true)
        setnombre(res.data.nombre) 
      }else{
        setauth(false)
        setmessage(res.data.Error)
        console.log(message)
        alert("Error")
      }
    })
    .catch(err => {
      console.error('Error en la solicitud Axios:', err);
      alert('Error en la solicitud Axios');
    });
  }, [])
  


  return (
    <View style={styles.vista}>

      {
        auth ? (
          <View>
            <Text>
             Bienvenido --- {nombre}
            </Text>
          </View>
        ):(
          <View>
            <Text>
              {message}
            </Text>
            <Text>
              No estás autenticado
            </Text>
          </View>
        )
      }

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('LectorAdmin')}>
        <Text style={styles.texto}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('LectorColector')}>
        <Text style={styles.texto}>Colector</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('LectorVisor')}>
        <Text style={styles.texto}>Visor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.texto}>Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.texto}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botones} onPress={() => navigation.navigate('Api')}>
        <Text style={styles.texto}>Configuración</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    vista:{
        flexDirection: 'column',
        marginVertical: 50,
        marginHorizontal: 25,
        alignItems: 'center'
    },
    botones: {
        borderWidth: 1,
        borderColor: '#CC1803',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#6A0B00',
        width: 180,
        alignItems: 'center',
        marginVertical: 5
    },
    texto:{
        color: 'white'
    }
})

export default Main;
