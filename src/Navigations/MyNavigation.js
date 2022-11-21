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

import axios from "axios";
import config from "../Libs/Config";
import commonStyles from '../Components/Style';


const Tab = createMaterialTopTabNavigator();

export default () => {
	const [cardHistoryData, setCardHistoryData] = useState({})

	useEffect(() => {
		getCardHistory()
	}, [])

	const getCardHistory = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userCardResult`, {
				params: { member_idx: 1 },
			})
			.then(async (res) => {
				console.log(res.data)
				setCardHistoryData(res.data)
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};
	const cardHistoryRenderItem = ({item}) => (
		<Text>{item.result}</Text>
	)

	const Card = () => {
			return (
				<FlatList
				data={cardHistoryData}
				renderItem={cardHistoryRenderItem}
				keyExtractor={item => item.what_history_idx}
				/>
			);
	}
	return (
		<Tab.Navigator
		
		screenOptions={{
			tabBarIndicatorStyle: {backgroundColor: '#116C89', height: 3,},
			tabBarInactiveTintColor: '#212121',
			tabBarActiveTintColor: '#116C89',
			tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold',},
			tabBarStyle: { backgroundColor: 'transparent', shadowOpacity: 0, marginLeft: '3%', marginRight: '3%',},
			tabBarItemStyle: { borderBottomWidth: 1, borderColor: '#BDBDBD'},

		  }}>
		  <Tab.Screen name="카드" component={Card} />
		  <Tab.Screen name="제안" component={Card} />
		  <Tab.Screen name="ㅇㅇ" component={Card} />
		</Tab.Navigator>
	);
};
