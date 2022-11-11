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
	const width = winWidth * 0.85;

	const bgColorList = ["rgba(228, 244, 217, 1)", "#FBF7A7"];
	const [swipeIndex, setSwipeIndex] = useState(0);

	useEffect(() => {
		console.log(bgColorList[swipeIndex]);
	}, [swipeIndex]);

	return (
		<AnimatedBackgroundColorView
			color={bgColorList[swipeIndex]}
			//   initialColor={swipeIndex == 0 ? bgColorList[1] : bgColorList[0]}
			initialColor={"rgba(228, 244, 217, 1)"}
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
				width={width}
				// overflow={'visible'}
				loadMinimal={true}
				scrollViewStyle={{ overflow: "visible" }}
				removeClippedSubviews={false}
			>
				<View style={[styles.slideItem, {}]}>
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
								style={{
									height: "100%",
									position: "absolute",
									//   left: 0,
									//   top: 0,
								}}
								source={require("../../Images/MAIN01_btn1.png")}
								resizeMode="contain"
							/>
							<Image
								style={{ height: 18 }}
								source={require("../../Images/MAIN01_card.png")}
							/>
							<Text>x 1</Text>
							<Text>PLAY</Text>
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
		// alignItems: 'flex-start',
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// marginTop: '20%',
		// height: '90%',
		// flexGrow: 0.1,
	},
	slideItem: {
		width: "98%",
		// height: '80%',
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignItems: "center",
		marginTop: "20%",
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
		shadowRadius: 3,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		elevation: 3,
		// overflow: 'hidden',
	},
	contentsBtn: {
		width: 125,
		height: 120,
		top: "45%",
		alignItems: "center",
		justifyContent: "center",
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
