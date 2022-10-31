import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	Keyboard,
	KeyboardEvent,
	Button,
	Alert,
	Image,
	Pressable
} from "react-native";

import commonStyles from './Style';

export default ({navigation}) => {
	return (
        <View style={commonStyles.bottomNav}>
            <Pressable 
                onPress={() => {alert('채팅으로 이동')}}
                style={commonStyles.bottomNavBtn}>
                <Image source={require('../Images/Chat_icon.png')}/>
            </Pressable>
            <Pressable
                onPress={() => {navigation.navigate('MAIN01', {screen: 'MAIN01'})}} 
                style={[commonStyles.bottomNavBtn, commonStyles.bottomNavBtnHere]}>
                <Image source={require('../Images/Home_icon.png')}/>
            </Pressable>
            <Pressable 
                onPress={() => {navigation.navigate('MEMB01', {screen: 'MEMB01'})}} 
                style={commonStyles.bottomNavBtn}>
                <Image source={require('../Images/My_icon.png')}/>
            </Pressable>
        </View>
        )
    }