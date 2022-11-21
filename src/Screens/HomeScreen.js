import React,{ useState,useEffect } from 'react';
import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator,Modal,Pressable,StatusBar } from 'react-native';
import NetInfo  from "@react-native-community/netinfo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import LoginScreen from './LoginScreen';
import { ImageBackground } from 'react-native';
import './global.js';

export default function HomeScreen(){
    return (
        <View></View>
    )
}