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

	const bgColorList = ["#CAE8B2", "#F6EF50"];
	const [swipeIndex, setSwipeIndex] = useState(0);

	// useEffect(async () => {}, []);

	return (
		<AnimatedBackgroundColorView
			color={bgColorList[swipeIndex]}
			initialColor={swipeIndex == 0 ? bgColorList[1] : bgColorList[0]}
			duration={1000}
			style={styles.body}
		>
			<Swiper
				style={[styles.wrapper]}
				showsButtons={false}
				loop={false}
				index={0}
				onIndexChanged={(index) => {
					setSwipeIndex(index);
				}}
				showsPagination={false}
				width={winWidth * 0.9}
				// overflow={'visible'}
				scrollViewStyle={{ overflow: "visible" }}
				removeClippedSubviews={false}
			>
				<View style={styles.slideItem}>
					<ImageBackground
						source={require("../../Images/MAIN01_bg1.png")}
						resizeMode="contain"
						style={styles.contentsArea}
					>
						<Pressable
							onPress={() => {
								alert("PLAY");
							}}
							style={styles.contentsBtn}
						>
							<Image
								style={{ height: "100%" }}
								source={require("../../Images/MAIN01_btn1.png")}
							/>
						</Pressable>
						<Pressable style={styles.contentsText}>
							<Text>취향 검사 하러가기</Text>
						</Pressable>
					</ImageBackground>
				</View>
				<View style={styles.slideItem}>
					<ImageBackground
						source={require("../../Images/MAIN01_bg2.png")}
						resizeMode="contain"
						style={styles.contentsArea}
					>
						<Pressable
							onPress={() => {
								alert("PLAY");
							}}
							style={styles.contentsBtn}
						>
							<Image
								style={{ height: "100%" }}
								source={require("../../Images/MAIN01_btn2.png")}
							/>
						</Pressable>
						<Pressable style={styles.contentsText}>
							<Text>달달러버 OH_123456</Text>
						</Pressable>
					</ImageBackground>
				</View>
			</Swiper>
			<Pressable style={styles.cardCntArea}>
				<Text>보유 횟수</Text>
			</Pressable>
		</AnimatedBackgroundColorView>
	);
};

const styles = StyleSheet.create({
	// #CAE8B2
	// #F6EF50
	body: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	slideItem: {
		width: "95%",
		// height: '80%',
		marginTop: "12%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignItems: "center",
		marginLeft: "5%",
	},
	contentsArea: {
		width: "98%",
		height: "98%",
		backgroundColor: "#fff",
		borderRadius: 10,
		alignItems: "center",
		// justifyContent: 'center',
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 5,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 3,
		overflow: "hidden",
	},
	contentsBtn: {
		height: "25%",
		top: "45%",
	},
	contentsText: {
		top: "55%",
	},
	cardCntArea: {
		width: "100%",
		height: "8%",
		justifyContent: "center",
		alignItems: "center",
	},
});
