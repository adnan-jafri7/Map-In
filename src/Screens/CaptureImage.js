import React,{ useState } from 'react';
import { Text,RefreshControl, TextInput,Button, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator,Dimensions,Modal,ScrollView,PermissionsAndroid} from 'react-native';
import MapView,{ MAP_TYPES, PROVIDER_DEFAULT, UrlTile,Marker,MapUrlTile, WMSTile, Polygon, Polyline} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {attributes} from './attributes';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';




const CaptureImage = () => {
  const [imagePath,setImagePath]=useState('')
      return (
        <Image style={{borderWidth:3,borderColor:10,width:50,height:50,marginLeft:8,alignSelf:'center'}}
          
          source={{uri:imagePath}}></Image>
      );
    }
    export default CaptureImage