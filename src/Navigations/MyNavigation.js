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
		<View style={{width: '30%', height: 150, backgroundColor: '#fff', marginBottom: 15, borderRadius: 10}}>
			<Text>{item.result}</Text>
		</View>
		
	)

	const Card = () => {
			return (
			<View style={{paddingLeft: '3%', paddingRight: '3%'}}>
				<FlatList
				data={cardHistoryData}
				renderItem={cardHistoryRenderItem}
				keyExtractor={item => item.what_history_idx}
				numColumns={3}
				columnWrapperStyle={{justifyContent: 'space-between'}}
				ListHeaderComponent={<View style={{height: 15}}></View>}
				ListEmptyComponent={<Text>아모것도업서</Text>}
				/>
				<View style={{width: '106%', height: 15, position: 'absolute', top: 0, left: 0,}}>
					<Image 
					style={{width: '100%', height: '100%',}} 
					source={require('../Images/list_shadow.png')}/>
				</View>
			</View>
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
