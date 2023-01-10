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
	Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import axios from "axios";
import config from "../Libs/Config";
import commonStyles from '../Components/Style';
import { useIsFocused } from "@react-navigation/native";
import { UserGetter, UserSetter } from "../User/UserInfo";


const Tab = createMaterialTopTabNavigator();

export default () => {
	const isFocused = useIsFocused();
	const winWidth = Dimensions.get("window").width;
	const winHeight = Dimensions.get("window").height;
	// 카드 이력
	const [cardHistoryData, setCardHistoryData] = useState('')

	// 유저 정보
	const userInfo = useRef({});
	// 로그인 여부 확인
	const [isLogin, setIsLogin] = useState();
	const [change, setChange] = useState(true);
	useEffect(() => {
		const Load = async () => {
			userInfo.current = ''
			userInfo.current = await UserGetter();
			setIsLogin(
				userInfo.current.member_idx !== "" &&
				userInfo.current.member_idx !== null &&
				userInfo.current.member_idx !== undefined);
			setChange(!change)
			getCardHistory()
		};
		Load();
	}, [isFocused]);

	const getCardHistory = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userCardResult`, {
				params: { member_idx: userInfo.current.member_idx },
			})
			.then(async (res) => {
				setCardHistoryData(res.data)
				console.log(res.data[0])
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};
	
	// 카드 이력 아이템
	const cardHistoryRenderItem = ({item, index}) => (
		<View 
			key={index}
			style={[styles.historyCard, {width: winWidth*0.3, height: winWidth*0.36, marginRight: winWidth*0.02 , marginBottom: winWidth*0.02, padding: winWidth*0.02}]}>
			<Pressable style={{height: winWidth*0.05, padding: winWidth*0.01}} onPress={() => {}}>
				<Image style={{height: '100%'}} resizeMode={'contain'} source={item.favorite == 0
				? require("../Images/heart_gray.png")
				: require("../Images/heart_yellow.png")}/>
			</Pressable>
			<View style={commonStyles.flexCenter}>
				<Text style={{ fontFamily: "UhBeecharming", fontSize: 12 }}>{item.type == 1 ? '뭐하나' : '뭐먹나'}</Text>
				<Text style={{ fontFamily: "UhBeecharming", fontSize: 20 }}>{item.result}</Text>
			</View>
			<Text style={{color: '#BDBDBD', fontSize: 10}}>{item.reg_date.toString().replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1.$2.$3 $4:$5:$6').slice(0,10)}</Text>
		</View>
		
	)

	// 내역이 없는 경우
	const noList = () => {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<Image source={require('../Images/warn_gray.png')} style={{marginBottom: 10}}/>
				<Text>
					내역이 없습니다
				</Text>
			</View>
		)
	}
	const Card = () => {
			return (
			<View style={{paddingLeft: '3%', paddingRight: '3%'}}>
				{cardHistoryData !== '' && 
				<FlatList
				style={{height: '100%'}}
					data={cardHistoryData}
					renderItem={cardHistoryRenderItem}
					numColumns={3}
					// columnWrapperStyle={{justifyContent: 'space-between'}}
					ListHeaderComponent={<View style={{height: 15}}></View>}
					ListEmptyComponent={noList()}
					contentContainerStyle={cardHistoryData.length == 0 && { flex: 1, alignItems: 'center'}}
					showsVerticalScrollIndicator ={false}
					showsHorizontalScrollIndicator={false}
				/>}
				<View style={{width: '106%', height: 15, position: 'absolute', top: 0, left: 0, opacity: 0.6}}>
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

const styles = StyleSheet.create({
	historyCard: {
		backgroundColor: '#fff', 
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
	}
})