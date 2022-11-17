/**
 * 메인 네비게이션
 */
import React, {useState, useEffect} from 'react';
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

import commonStyles from '../Components/Style';


const Tab = createMaterialTopTabNavigator();
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

	const Card = () => {
			return <Text>Search</Text>;
	}
	return (
		<Tab.Navigator
		screenOptions={{
			tabBarInactiveTintColor: '#212121',
			tabBarActiveTintColor: '#116C89',
			tabBarLabelStyle: { fontSize: 12,},
			tabBarStyle: { backgroundColor: 'transparent', shadowOpacity: 0},
		  }}>
		  <Tab.Screen name="카드" component={Card} />
		  <Tab.Screen name="제안" component={Card} />
		  <Tab.Screen name="ㅇㅇ" component={Card} />
		</Tab.Navigator>
	);
};
