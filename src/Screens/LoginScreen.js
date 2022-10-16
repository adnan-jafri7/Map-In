import React,{ useState } from 'react';
import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator,Modal,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function LoginScreen({route,navigation}){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisibleLayer,setModalVisibleLayer]=useState(route.params);
    const [urlTemplate,setUrlTemplate]=useState()
    
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    
  };
  const postExample = async () => {
    
    try {
        await fetch(
            'http://bijlee.tk/bijlee/api/login.php?mobile='+username+'&password='+password, requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        Alert.alert("Message: ", 
                        data.message);
                        navigation.navigate('Map',{
                          username:username,
                          password:password,
                          url:urlTemplate
                        })
                    });
                    
                  
                    
            })
    }
    catch (error) {
        Alert.alert(error);
    }
  }
  
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems:"center",        
          backgroundColor:"Transparent"               
        }}>
          <Image
    source={{ uri: 'http://bijlee.tk/bijlee/img/icon_flash.png' }}
    style={{ width: 100, height: 100 }}
  />
        <TextInput
        style={[styles.textInput]}
        onChangeText={newText => setUsername(newText)}
        placeholder="Username"
        returnKeyLabel = {"next"}
        placeholderTextColor="#000000"
        maxLength={15}
        keyboardType="text"/>
  
        <TextInput
        style={[styles.textInput]}   
        onChangeText={newText=>setPassword(newText)}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#000000"
        maxLength={25}
        returnKeyLabel = {"next"}
        keyboardType="text"/>
  
  <TouchableOpacity
    style={[styles.touchable]}
  
    onPress={() =>{if(username.length==0) {Alert.alert("Username can't be empty")}
    else if(password.length==0){
      Alert.alert("Password can't be empty")
    }
    else{
      
      postExample();
      }}}>
    <Text style={{color:'#ffffff'}}>Login</Text>
    
    </TouchableOpacity>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleLayer}
        >
        <View style={styles.centeredView}>
        <Pressable
            style={[styles.buttonCloseModal]}
            onPress={() => setModalVisibleLayer(!modalVisibleLayer)}
          >
            <Icon
  name='close'
  type='evilicon'
  color='#000000'
  size={22}
  
/>
          </Pressable>
        <View style={styles.modalViewLayer}>
        <View style={{flexDirection:'column',justifyContent:'center'}}>
          
          <Pressable
            style={[styles.buttonLayer]}
            onPress={() => {setModalVisibleLayer(!modalVisibleLayer);console.log(urlTemplate);navigation.navigate('Map',{
              url:'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg',
              type:'default'
         })
         }}
          >
            <Image
        style={styles.layerImage}
        source={require('../../assets/images/default.png')}
      />            
          </Pressable>
          <Text style={styles.textStyleLayer}>Default</Text>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
          
          <Pressable
            style={[styles.buttonLayer]}
            onPress={() => {setModalVisibleLayer(!modalVisibleLayer);console.log(urlTemplate);navigation.navigate('Map',{
              url:'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg',
              type:'default'
         })
         }}
          >
            <Image
        style={styles.layerImage}
        source={require('../../assets/images/satellite.png')}
      />            
          </Pressable>
          <Text style={styles.textStyleLayer}>Satellite</Text>
          </View>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
          
          <Pressable
            style={[styles.buttonLayer]}
            onPress={() => {setModalVisibleLayer(!modalVisibleLayer);console.log(urlTemplate);navigation.navigate('Map',{
                 url:'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
                 type:'osm'
            })
            }}
          >
            <Image
        style={styles.layerImage}
        source={require('../../assets/images/osm.png')}
      />            
          </Pressable>
          <Text style={styles.textStyleLayer}>Open Map</Text>
          </View>
         
        </View>
      </View>
    </Modal>
        
        
      </View>
      
  
      
      
    )
   
   
  }

  const styles= StyleSheet.create({
    
    textInput:{
      height: 40,
      width:350,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"white",
      color:"black"
    },
    touchable:{
      width: 350,
      height:40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      margin:10,
      borderRadius:10
  
    },
    textInput:{
      height: 40,
      width:100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      fontSize:16,
      backgroundColor:"white",
      color:"black"
    },
    touchable:{
      width: 350,
      height:40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      margin:10,
      borderRadius:10
  
    },
    map: {
        width: '100%',
        height: '120%',
        marginTop:'50%'

       },
       centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        flexDirection:'column',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        width:200,
        elevation: 2,
        margin:10,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#4CAF50",
        flexDirection:'column',
        justifyContent:'center'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:20
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20
      },
      buttonCloseModal:{
        backgroundColor:'#ffffff',
        borderRadius:10,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding:5
      },
      modalViewLayer: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        flexDirection:'row',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      layerImage:{
        width:70,
        height:70,
        borderWidth:1,
        borderRadius: 10,
        borderColor:'#000000',
        elevation: 2,
        margin:12,
      },
      textStyleLayer: {
        color: "#000000",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:16
      },
      buttonSave:{
        borderRadius: 20,
        padding: 10,
        width:100,
        elevation: 2,
        margin:10,
        backgroundColor: "#4CAF50",
        flexDirection:'column',
        justifyContent:'center'

      },
      buttonReset:{
        borderRadius: 20,
        padding: 10,
        width:100,
        elevation: 2,
        color:'#4CAF50',
        margin:10,
        backgroundColor: "#ffffff",
        flexDirection:'column',
        justifyContent:'center',
        borderColor:'4CAF50',
      },
      buttonServer:{
        width:'auto'
      },
      centeredViewSave: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      
      },
      textInput:{
        height: 40,
        width:300,        
        borderWidth: 1,
        padding: 10,
        fontSize:16,
        borderRadius:10,
        backgroundColor:"white",
        color:"black"
      },
      fieldText: {
        textAlign: "left",
        fontSize:20,
        color:'#000000'
      },
      textInputView:{
        padding:5
      }
  
   
  });

  