import * as Animatable from 'react-native-animatable';
import React,{ useEffect, useState } from 'react';
import { Text,TextInput, View,StyleSheet, Alert, Image,Modal,Pressable, TouchableOpacity,BackHandler, ActivityIndicator,ScrollView,PermissionsAndroid} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global.js';



export default function HistoryScreen({navigation}){
    let count=0
    let requestOptions={}
    let tmp=[]
    const [itemSent,setItemSent]=useState(0)
    const [locData,setLocData]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    let url = global.server_url+"saveData.php";
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage,setModalImage]=useState('')
    const [username,setUserName]=useState('')
    const [data,setData]=useState([])
    let index=0
    let temp=[]
    let temp1=[]
    let temp2=[]
    const [selected,setSelected]=useState([])
    const db=openDatabase({name:'mapapp.db',location:'default'},
    function () {
      console.log('DB Connection Success');
      },
      error=>{console.log('Error',error)}
           
      );
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          
          temp=[]
          setLocData([])
          getData()
          
          // The screen is focused
          // Call any action
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


      const handleSelect=(e,id)=>{
          setSelected([...selected,{id}])
      }
      const handleDeSelect=(e,id)=>{
       let item=selected.filter(item=>item.id!==id)
       setSelected(item)
    }
      const isFound =(id)=>
     
       selected.some(element => {
        if (element.id === id) {
          return true;
        }
    
        return false;
      });

      const uploadToServer=async ()=>{
        
        
        
        if(selected.length>0){
          for(let i=0;i<selected.length;i++){
            for(let j=0;j<locData.length;j++){
            if(selected[i].id==locData[j].id){
              //console.log(locData[j])
              tmp=[...tmp,locData[j]]                
            
          }
        }   setData(tmp)
      }
        
        console.log("data:",tmp.length)
        requestOptions = {
          method: 'POST',
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
              
              body:JSON.stringify(tmp)
        
      };
      
      postRequest()
      
    }
  }       
  

          const postRequest=async ()=>{
            try { 
                  
              await fetch(
                  url, requestOptions,100)
                  .then((response) => 
                      response.json())
                          .then(response => {
                            console.log(response)
                              console.log("Message: ", 
                              response.Message);
                              if(response.Code==3){                         
                                
                                try{
                                  for(let i=0;i<selected.length;i++){
                                  db.transaction( async (tx)=>{
                                  tx.executeSql("UPDATE 'mapdb' SET sendToServer='true' WHERE id="+selected[i].id+";",
                                  (tx,results)=>{            }
                                  );
                                  
                                 },
                                 error=>{alert("Some error occurred")
                                 setIsLoading(false)
                                   console.log('Updation Error:',error)},
                                 success=>{  
                                  
                                               
                                           console.log('Updation Success:',success)
                                           setIsLoading(false)
                                           
                                           
                                   }
                                   
                                   )
                                  
                                 
          
                                 
                                }
                                Alert.alert("Data Sent to Server.") 
                                tmp=[]
                                temp=[]
                                setSelected([])
                                setLocData([])
                                getData()}
                                 catch (error) {
                                  setIsLoading(false)
                                  
                                   console.log(error)
                                   
                                 }
                                 
                                 
                                  
                             
                              }
                              else{
                                setIsLoading(false)
                                alert(response.Message)
                                
                                
                               }
                             
                          }               
                          )
                          .catch((error)=>{
                            setIsLoading(false)
                            Alert.alert("Some Error Occurred!")
                            console.log(error)
                            setIsLoading(false)
                            
                            
                          })  
                          
                          
                                       
                        
                          
                  }
                  catch (error) {
                    setIsLoading(false)
                      Alert.alert("Some Error Occurred!");
                      console.log(error)
                      return false
                    
                     
                  }
          }
         
                  

      const handleDelete=async ()=>{
          let mobile=JSON.parse(await AsyncStorage.getItem("mobile"))
          console.log("username",mobile)
          console.log("Async username",await AsyncStorage.getItem("mobile"))
        if(selected.length>0){
        
          try{
            for(let i=0;i<selected.length;i++){
            db.transaction( async (tx)=>{
            tx.executeSql("DELETE FROM 'mapdb' WHERE id="+selected[i].id+" AND username="+mobile+";",
            (tx,results)=>{            }
            );
            
           },
           error=>{alert("Some error occurred")
             console.log('Deletion Error:',error)},
           success=>{   let item=selected.filter(item=>item.id!==selected[i].id)
            setSelected([])
            setLocData([])
                          
                     console.log('Deletion Success:',success)
             }
             
             )
            
           }
           getData()
           temp=[]
           
          }
           catch (error) {
             console.log(error)
           }

        
      }else{
        Alert.alert("Please select at least one item.")
      }
      }
      
      const getData=async ()=>{
        let mobile=await AsyncStorage.getItem("mobile")
        setUserName(JSON.parse(await AsyncStorage.getItem("mobile")))
          //console.log("username",username)
          //console.log("Async username",await AsyncStorage.getItem("mobile"))
        try{
          db.transaction(async (tx)=>{
            tx.executeSql("SELECT * FROM mapdb WHERE username="+mobile+";",
            [],
            (tx,results)=>{
              var len=results.rows.length;
              console.log("Rows:",len)
              for(let i=0;i<len;i++){
              //console.log("Row:",i," ",results.rows.item(i).remarks)
              let name=results.rows.item(i)
              temp=[...temp,{ placeName:name.placeName,
                              id:name.id,
                              dateTime:name.dateTime,
                              landmark:name.landmark,
                              userName:name.userName,
                              remarks:name.remarks,
                              landuseClass:name.landuseClass,
                              shapeType:name.shapeType,
                              sendToServer:name.sendToServer,
                              locations:name.locations,
                              image1:JSON.parse(name.image1),
                              image2:name.image2}]}

              setLocData(temp.reverse())
                          
              console.log("locdata",locData)
             
            })
          })
        }
        catch (error) {
          console.log(error)
          Alert("Some error occurred.")
        }
      }
    return(

      isLoading ?
        <View style={{backgroundColor:'#ffffff',height:'100%',flexDirection:'column',justifyContent:'center'}}>
          <ActivityIndicator size={70} color="#4CAF50" style={{alignSelf:'center'}} />
        </View>:
           
           <View style={{backgroundColor:'#ffffff',flex: 1,height:'100%'
           
           }}>
            <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        
      >
          
          <View style={{flexDirection:'column',height:'100%',justifyContent:'center',backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
          <TouchableOpacity
          onPress={()=>(setModalVisible(!modalVisible))}>
                     <Icon
  name='close'
  type='evilicon'
  color='#ffffff'
  size={35}
  style={{alignSelf:'center',backgroundColor:'#000000',borderRadius:20}}
  
/>

              </TouchableOpacity>
              {console.log(modalImage)}
            <Image  style={{borderWidth:2,borderColor:'#4CAF50',width:"80%",height:"80%",alignSelf:'center',borderRadius:20}}
            source={{uri:`data:image/jpeg;base64,${modalImage}`}}
            
            ></Image>
          </View>
        
       
      </Modal>
           <View style={{ backgroundColor: "white",
        flexDirection:'column',
        }}>
           <ScrollView style={{height:'88%'}}>
            
            
              {locData.length>0 ? locData.map(({id,placeName,landmark,landuseClass,shapeType,dateTime,sendToServer,image1,locations})=>(

                <View key={index++} style={{backgroundColor:'#ffffff'}}>
                
           
        <Animatable.View animation="zoomInUp"  style={{ width:'90%',height:'auto',backgroundColor:'#d8eddc',padding:5,margin:5,alignSelf:'center',borderRadius:10,shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5}}>
        {sendToServer=="false" ? isFound(id)?
        <Fontisto style={{alignSelf:'flex-end'}}
              name='checkbox-active'
              color='#000000'
              size={30}
              onPress={(e) => {handleDeSelect(e,id)}}              
              />
              : <Fontisto style={{alignSelf:'flex-end'}}
              name='checkbox-passive'
              color='#000000'
              size={30}
              onPress={(e) => {handleSelect(e,id)}} />:null}
                   
              

            <View style={{flexDirection:'row',padding:0,margin:0}}>
            <TouchableOpacity 
            onPress={()=>{
              setModalImage(image1);
              setModalVisible(!modalVisible);}}>
            <Image  style={{borderWidth:2,borderColor:'#4CAF50',width:80,height:80,marginLeft:8,alignSelf:'center',borderRadius:50}}
            source={{uri:`data:image/jpeg;base64,${image1}`}}
            
            ></Image>
            </TouchableOpacity>
            
            <View style={{flexDirection:'column',padding:0,marginLeft:10}}>
            <Text style={{color:'#000000',fontSize:22,fontWeight:'bold',color:'#000fff'}}>{placeName}</Text>
            <Text style={{color:'#000000',fontSize:18}}>Landuse Class : {landuseClass}</Text>
            <Text style={{color:'#000000',fontSize:18}}>Date : {dateTime}</Text>
            </View>
            
            </View>
            <View style={{flexDirection:'row',padding:0,margin:10,justifyContent:'space-between'}}>
            <TouchableOpacity 
              style={{backgroundColor:'#FF9933',padding:5,flexDirection:'row',borderRadius:10}}
              onPress={()=>(navigation.navigate('ShowMap',{shapeType:shapeType,location:locations,name:placeName,landuseClass:landuseClass,type:"default",url:'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&tiled=true&version=1.1.1&request=GetMap&layers=india3&bbox={minX},{minY},{maxX},{maxY}&width={width}&height={height}&srs=EPSG%3A900913&format=image%2Fjpeg'}))}>
          <MaterialCommunityIcons
            name='map-marker-path'
            size={22}
            color='#ffffff'
          />
            <Text style={{fontSize:14,textAlign:'center',color:'#ffffff',marginLeft:5}}>
              Show on Map
            </Text>
            </TouchableOpacity>
              <Text style={{color:'#000000',textAlignVertical:'center',fontSize:18,color:'#000000'}}>  {shapeType}  </Text>
              
              <Text style={{color:sendToServer=="false"? '#FF9933':'#4CAF50',textAlignVertical:'center',fontSize:18,fontWeight:'bold'}}> {sendToServer=='false'? "Pending":"Sent to Server"} </Text>
              
              
            </View>

            
            

        </Animatable.View>
        
        </View>
        ))
      :
      <View style={{justifyContent:'center',margin:10}}>
      <Text style={{color:'#000000',textAlign:'center',fontSize:18}}>No Data Found</Text>
      
      

      </View>
      } 
        
        </ScrollView>
        <Animatable.View animation="zoomInUp" style={{flexDirection:'row',justifyContent:'center'}}>
          <TouchableOpacity style={{backgroundColor:'#FF5733', margin:10,padding:10,flexDirection:'row',borderRadius:10}}
          onPress={(e) => { if(selected.length>0){
            Alert.alert("Hold on!", "Are you sure you want to delete?", [
              {
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => {handleDelete();
                

               } }
            ]);}
            else{Alert.alert("Please select at least one item.")}}}>
          <MaterialIcons
            name='delete-outline'
            size={22}
            color='#ffffff'
          />
            <Text style={{fontSize:18,textAlign:'center',color:'#ffffff'}}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => { if(selected.length>0){
            Alert.alert("Hold on!", "Are you sure you want to proceed?", [
              {
                text: "No",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => {uploadToServer();setIsLoading(true);
                

               } }
            ]);}
            else{Alert.alert("Please select at least one item.")}}}
           style={{margin:10,padding:10,flexDirection:'row',borderRadius:10,backgroundColor:'#4CAF50'}}>
          <Ionicons 
              style={{paddingRight:10}} 
              name='cloud-upload-outline'
              type='evilicon'
              color='#ffffff'
              size={22}
              
            />
            <Text style={{fontSize:18,color:'#ffffff',textAlign:'center'}}>
              Send to Server 
            </Text>
          </TouchableOpacity>
          </Animatable.View>
        </View> 
        
        
          

        
        
        </View>
        
        
    
        
        
    )
    


}
const styles = StyleSheet.create({
  centeredView: {
    width:'auto',
    height:'auto',
  },
  modalView: {
   
   
    borderRadius: 20,
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
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});