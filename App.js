
import React,{ useState,useEffect } from 'react';
import { Text, TextInput, View,StyleSheet,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowMap from './src/Screens/ShowMap';
import HistoryScreen from './src/Screens/HistoryScreen';
import MapScreen from './src/Screens/MapScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FormScreen from './src/Screens/FormScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import UserScreen from './src/Screens/UserScreen';
import SupportScreen from './src/Screens/SupportScreen';
import HomeScreen from './src/Screens/HomeScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();




function App() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const [isSignedIn,setIsSignedIn]=useState(false)
  useEffect(() => {
    displayData()
  }, []);

  const displayData = async ()=>{  
    try{  
      let status = await AsyncStorage.getItem('IsLoggedIn');  
       setIsSignedIn(status)
       console.log("app status:",status)
    }  
    catch(error){  
      alert(error)  
    }  
  }


  
  return (
    <NavigationContainer>
      <Tab.Navigator
      backBehavior={'history'}
     screenOptions={{tabBarShowLabel:false,
        tabBarStyle:{
      elevation:0,
      backgroundColor:'#ffffff',
      
      height:50,
      width:'auto',
      ...styles.shadow,
      
    },
  }
    
  }
    
  
  
  
  

  >
  {isSignedIn ?
  <>
        <Tab.Screen  
          
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
              <FontAwesome5Icon
              name='map-marked-alt'
              type={FontAwesome5Icon}
              color='#000000'
              size={20}
              style={{color:focused ? '#4CAF50' : '#748c94'}}></FontAwesome5Icon>
      
              <Text style={{color:focused? '#4CAF50' : '#748c94',fontWeight:'bold'}} 
              >Map</Text>
      
            </View>
              ),
              transitionSpec: {
                open: config,
                close: config,
              },
              headerShown: false
            }} name="Map" component={MapScreen}
            initialParams={{ url:'https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJja2w5YWt5bnYwNjZmMnFwZjhtbHk1MnA1In0.eq2aumBK6JuRoIuBMm6Gew',
                type:'satellite'}} />



        <Tab.Screen options={{
          tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
              <FontAwesome5Icon
              name='history'
              type={FontAwesome5Icon}
              color='#000000'
              size={20}
              style={{color:focused ? '#4CAF50' : '#748c94'}}>
              </FontAwesome5Icon>      
              <Text 
              style={{color:focused? '#4CAF50' : '#748c94',fontWeight:'bold'}} 
              >History
              </Text>
              
      
            </View>
              ),
              transitionSpec: {
                open: config,
                close: config,
              },
              headerShown: false,
    
   
              }} name="HistoryScreen" component={HistoryScreen}
               />
          
               <Tab.Screen options={{
          tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
              <FontAwesome5Icon
              name='user'
              type={FontAwesome5Icon}
              color='#000000'
              size={20}
              style={{color:focused ? '#4CAF50' : '#748c94'}}>
              </FontAwesome5Icon>      
              <Text 
              style={{color:focused? '#4CAF50' : '#748c94',fontWeight:'bold'}} 
              >Account
              </Text>
              
      
            </View>
              ),
              transitionSpec: {
                open: config,
                close: config,
              },
              headerShown: false,
    
   
              }} name="UserScreen" component={UserScreen}
               />
                     <Tab.Screen options={{
          tabBarIcon:({focused})=>(
            <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
              <FontAwesome5Icon
              name='info'
              type={FontAwesome5Icon}
              color='#000000'
              size={20}
              style={{color:focused ? '#4CAF50' : '#748c94'}}>
              </FontAwesome5Icon>      
              <Text 
              style={{color:focused? '#4CAF50' : '#748c94',fontWeight:'bold'}} 
              >About
              </Text>
              
      
            </View>
              ),
              transitionSpec: {
                open: config,
                close: config,
              },
              headerShown: false,
    
   
              }} name="SupportScreen" component={SupportScreen}
               />
               <Tab.Screen name='FormScreen' component={FormScreen}
                  options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    transitionSpec: {
                      open: config,
                      close: config,
                    },
                    headerShown:false,
                    tabBarStyle:{display:'none'}}}/>
                <Tab.Screen name='ShowMap' component={ShowMap}
                  options={{
                    tabBarButton: () => null,
                    tabBarVisible: true,
                    transitionSpec: {
                      open: config,
                      close: config,
                    },
                    headerShown:false,
                    }}/>
                    </>:
                    <>
                    
                    <Tab.Screen name='LoginScreen' component={LoginScreen}
                  options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    transitionSpec: {
                      open: config,
                      close: config,
                    },
                    headerShown:false,
                    tabBarStyle:{display:'none'}}}/>
                     <Tab.Screen name='RegisterScreen' component={RegisterScreen}
                  options={{
                    tabBarButton: () => null,
                    tabBarVisible: false,
                    transitionSpec: {
                      open: config,
                      close: config,
                    },
                    headerShown:false,
                    tabBarStyle:{display:'none'}}}/>  

                      
                    </>  
  }
              
      </Tab.Navigator>
                
    
    </NavigationContainer>





    
  );
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
  shadow:{
    shadowColor:'#7F5DF0',
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
 
});
export default App;