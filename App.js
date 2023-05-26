import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios
 from 'axios';
import { useState } from 'react';
export default function App() {
const [urlImage, setUrlImage] = useState("")
const [state, setState] = useState(false)
  const getCoffee = async () =>{
    setState(true)
    const fetch = await axios.get("https://coffee.alexflipnote.dev/random.json")
    .then((response)=> setUrlImage(response.data.file))
    .catch((err)=> console.log(err))
    .finally(()=>setState(false))


  }

  return (
    <View style={styles.container}>
      {
        urlImage == "" ? <View 
        style={styles.containerNoImage}> 
        <Image source={require("./image-files.png")} style={{width:150, height:150}}/>
        <Text style={{color:"#323232", fontWeight:"bold", fontSize:18}}>Seu Café ficara aqui!</Text>
        </View> : <Image
        style={styles.image}
        source={{
          uri:urlImage
        }}/>

      }
      <TouchableOpacity style={styles.button} onPress={getCoffee}>
      {state == false ? <Text style={{color:"#323232", fontWeight:"bold", fontSize:18}}>Generate new coffee</Text> : <ActivityIndicator color={"#FFF"} size={32} />}
      </TouchableOpacity>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20
  },
  containerNoImage:{
    height:300,
    width:'80%',
    borderRadius:8,
    backgroundColor:"#a6dced",
    justifyContent:"center",
    alignItems:"center"
  },
  button:{
    width:'80%',
    height:60,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#a6dced"
  },
  image:{
    height:300,
    width:'80%',
    borderRadius:8,
  }
});
