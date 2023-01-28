import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet,
	Text,
	Keyboard,
	KeyboardEvent,
	Button,
	Alert,
	Image,
	Pressable,
    Modal,
} from "react-native";

import commonStyles from './Style';

export default ({navigation, type}) => {
	const text = () => {
		switch (type) {
			case 0 :
				return('오늘도 오뭐나!');
				break;
			case 1 : 
				return('광고가 곧 시작됩니다.');
				break;
			default : 
				return('잠시만 기다려주세요.');
				break;
			}	

	}
	return (
        <View style={[commonStyles.flexCenter, {flexGrow: 1}]}>
			<Image source={require('../Images/logo_text_linear.png')}/>
			<Text style={{marginTop: 20, color: '#757575', fontSize: 16}}>{text()}</Text>
		</View>
    )
}