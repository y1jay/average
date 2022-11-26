/**
 * 메인 네비게이션
 */
import React, {useState, useEffect, useRef} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button,
	ImageBackground,
	Image,
	Pressable,
	Modal,
	FlatList,
	Platform,
	ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import commonStyles from '../Components/Style';

// 분해/합성
import working from '../screen/user/MAIN01';
import LOAD01 from '../screen/user/LOAD01';
import MAIN01 from '../screen/user/MAIN01';
import MEMB01 from '../screen/user/MEMB01';

const Tab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const config = {
	animation: 'timing',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};
export default () => {
	const screen = useRef()
	return (
		<BottomTab.Navigator 
		initialRouteName="MAIN01"
		screenOptions={{
			tabBarShowLabel: false, 
			headerShown: false,
			tabBarHideOnKeyboard: true,
			}}>
				{/* 인트로/스플래시 화면 */}
			<BottomTab.Screen
				// listeners={{
				// 	tabPress: e => {
				// 		console.log(e.target)
				// 		screen.current = 'LOAD01'
				// 	}}}
				name="LOAD01"
				component={LOAD01}
				options={{
					transitionSpec: {
						open: config,
						close: config,
					},
					tabBarIcon: ({focused}) => (
						(<Image style={!focused && {opacity: 0.3}} source={require('../Images/Chat_icon.png')}/>)
						
					),
					}}
			/>
			{/* 메인 */}
			<BottomTab.Screen
				// listeners={{
				// 	tabPress: e => {
				// 		console.log(e.target)
				// 		screen.current = 'MAIN01'
				// 	}}}
				name="MAIN01"
				component={MAIN01}
				options={{
					transitionSpec: {
						open: config,
						close: config,
					},
					tabBarIcon: ({focused}) => (
						(<Image style={!focused && {opacity: 0.3}} source={require('../Images/Home_icon.png')}/>)
						
					),
					}}
			/>
			{/* 내정보 */}
			<BottomTab.Screen
				// listeners={{
				// 	tabPress: e => {
				// 		console.log(e.target)
				// 		screen.current = 'MEMB01'
				// 	}}}
				name="MEMB01"
				component={MEMB01}
				options={{
					transitionSpec: {
						open: config,
						close: config,
					},
					tabBarIcon: ({focused}) => (
						(<Image style={!focused && {opacity: 0.3}} source={require('../Images/My_icon.png')}/>)
						
					),
					}}
			/>
		</BottomTab.Navigator>
	);
};
