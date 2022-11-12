import React, { Component, useState, useEffect, useRef } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	ImageBackground,
	Pressable,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";

export default ({ navigation }) => {
	const winWidth = Dimensions.get("window").width;
	const winHeight = Dimensions.get("window").height;

	// 공통 컬러코드
	const colorListMain = ["#007A31", "#F59300"];
	const colorListSub = ["#0FC558", "#F6D629"];
	// 백그라운드 색상 리스트
	const bgColorList = ["rgba(228, 244, 217, 1)", "#FBF7A7"];
	// 현재 스와이프 인덱스
	const [swipeIndex, setSwipeIndex] = useState(0);
	// 결과 정보
	const result = {name: '메롱'}

	// 카드 PLAY 버튼
	const cardBtn = (index) => {
		// 사용가능한 카드가 없는 경우
		// 사용가능한 무료 카드가 있는 경우
		return (
			<Pressable
				onPress={() => {
					alert((index == 0 ? '뭐하나' : '뭐먹나') + " PLAY");
				}}
				style={styles.cardBtn}
				>
				<Image
					style={{
						height: "100%",
						position: "absolute",
					}}
					source={index == 0 ? require("../../Images/MAIN01_btn1.png") : require("../../Images/MAIN01_btn2.png")}
					resizeMode="contain"
				/>
				<View style={styles.flexCenter}>
					<View style={styles.cardCntArea}>
						<Image
							style={{ height: 18 }}
							source={require("../../Images/MAIN01_card.png")}
						/>
						<Text style={styles.cardBtnText}>x 1</Text>
					</View>
					{/* <Text style={styles.cardBtnText}>오늘의 무료</Text> */}
					<Text style={styles.cardPlayText}>PLAY</Text>
				</View>
			</Pressable>
		)
	}
	// 카드 aside 영역
	const cardAside = (index) => {
		// 검사 이력이 있는 경우 닉네임 표시
		// 검사 이력이 없는 경우 검사 하기 버튼
		return(
			<Pressable style={styles.cardAsideArea}>
				{/* <Text style={styles.cardAsideText}>취향 검사 하러가기</Text> */}
				<Text style={styles.cardAsideText}>
					<Text style={[styles.cardAsideTextTitle, {color: colorListMain[index]}]}>달달러버 </Text>
					<Text>OH_123456</Text>
				</Text>
			</Pressable>
		)
	}

	return (
		<AnimatedBackgroundColorView
			color={bgColorList[swipeIndex]}
			//   initialColor={swipeIndex == 0 ? bgColorList[1] : bgColorList[0]}
			initialColor={"rgba(228, 244, 217, 1)"}
			duration={800}
			style={styles.body}
		>
			<Swiper
				style={styles.wrapper}
				showsButtons={false}
				loop={false}
				index={0}
				onIndexChanged={(index) => {
					setSwipeIndex(index);
				}}
				showsPagination={false}
				width={winWidth * 0.85}
				loadMinimal={true}
				scrollViewStyle={{ overflow: "visible" }}
				removeClippedSubviews={false}
			>
				<View style={styles.slideItem}>
					{/* CARD1 : Basic */}
					{/* <ImageBackground
						source={require("../../Images/MAIN01_bg1.png")}
						resizeMode="contain"
						style={styles.cardArea}
					>
						{cardBtn(0)}
						{cardAside(0)}
					</ImageBackground> */}
					{/* CARD2 : Play */}
					{/* <ImageBackground
						source={require("../../Images/MAIN01_bg1_1.png")}
						resizeMode="contain"
						style={styles.cardArea}
					>
						<Text style={[styles.cardAsideText, {fontSize: 20}]}>핸드폰을</Text>
						<Text style={[styles.cardAsideText, {fontSize: 20}]}>흔들어 주세요</Text>
					</ImageBackground> */}
					{/* CARD3 : Result */}
					<View style={styles.cardArea}>
						<Text style={[styles.cardAsideText, {fontSize: 20}]}>오늘은</Text>
						<Text style={[styles.cardAsideText, {fontSize: 50}]}>{result.name}</Text>
						<Text style={[styles.cardAsideText, {fontSize: 20}]}>또 뭐 넣지..</Text>
						<Pressable style={[styles.cardResultBtn, {backgroundColor: colorListMain[0]}]}>
							<Text style={styles.cardResultBtnText}>내 주변 {result.name} 할 곳 찾기</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.slideItem}>
					<ImageBackground
						source={require("../../Images/MAIN01_bg2.png")}
						resizeMode="contain"
						style={styles.cardArea}
					>
						{cardBtn(1)}
						{cardAside(1)}
					</ImageBackground>
				</View>
			</Swiper>
			<View style={styles.cntArea}>
				<Pressable 
					onPress={() => {alert('카드 충전')}}
					style={styles.cntBtnArea}>
					<View style={[styles.cntBtnTextArea, {backgroundColor: colorListSub[swipeIndex]}]}>
						<Text style={styles.cntBtnText}>999+</Text>
					</View>
					<Image 
						style={styles.cntBtnImg}
						source={swipeIndex == 0 ? require("../../Images/MAIN01_card1.png") : require("../../Images/MAIN01_card2.png")}/>
				</Pressable>
			</View>
		</AnimatedBackgroundColorView>
	);
};

const styles = StyleSheet.create({
	// #CAE8B2
	// #F6EF50
	flexCenter: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		width: '200%',
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth:1
	},
	slideItem: {
		width: "98%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "15%",
	},
	cardArea: {
		width: "98%",
		height: "98%",
		backgroundColor: "#fff",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		elevation: 3,
	},
	cardBtn: {
		width: 125,
		height: 120,
		top: "10%",
		alignItems: "center",
		justifyContent: "center",
	},
	cardCntArea: {
		flexDirection: 'row',
		// alignItems: 'center'
	},
	cardBtnText: {
		color: '#F1F528',
		marginLeft: 5,
		fontFamily: 'UhBeecharming',
		fontSize: 12,
	},
	cardPlayText: {
		color: '#FFF',
		fontFamily: 'UhBeecharming',
		fontSize: 18
	},
	cardAsideArea: {
		top: "20%",
	},
	cardAsideText: {
		fontFamily: 'UhBeecharming',
		color: '#757575',
		fontSize: 14
	},
	cardAsideTextTitle: {
		fontWeight: 'bold'
	},
	cardResultBtn: {
		width: '80%',
		height: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	cardResultBtnText: {
		color: '#FFF',
		fontSize: 16
	},
	cntArea: {
		width: "100%",
		height: "10%",
		alignItems: "center",
		justifyContent: "center",
	},
	cntBtnArea: {
		width: 68,
		height: 30,
		flexDirection: 'row',
		alignItems: "flex-end",
		position: 'relative',
	},
	cntBtnImg: {
		width: 21,
		height: 27,
		position: 'absolute',
		top: 0,
		left: 4,
	},
	cntBtnTextArea: {
		width: '100%',
		height: 20,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		alignItems: "flex-end",
		justifyContent: "center",
	},
	cntBtnText: {
		width: 45,
		fontFamily: 'UhBeecharmingBold',
		textAlign: 'center',
		fontSize: 11,
	}
});
