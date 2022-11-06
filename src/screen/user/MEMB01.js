import React, { Component, useState, useEffect, useRef } from "react";
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
} from "react-native";

import InstagramLogin from "react-native-instagram-login";

import {
	getProfile,
	login,
	logout,
	unlink,
	loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";
// 공통 컴포넌트 선언
import commonStyles from "../../Components/Style";

export default ({ navigation }) => {
	const [token, setToken] = useState("");
	const test = "";
	const tokenClear = () => {
		// CookieManager.clearAll(true).then((res) => {
		// 	setToken("");
		// });
	};
	// const instagramLogin = () => {
	// 	instagramLogin;
	// };
	const signInWithKakao = async () => {
		const token = await login();
		// setResult(JSON.stringify(token));
		// console.log(rr);
	};
	const getPP = async () => {
		await getProfile()
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e, "e");
			});
	};
	const signOutWithKakao = async () => {
		const message = await logout();

		setResult(message);
	};

	// const getKakaoProfile = async () => {
	// 	const profile = await KakaoProfile.getProfile();

	// 	setResult(JSON.stringify(profile));
	// };

	const unlinkKakao = async () => {
		const message = await KakaoProfile.unlink();

		setResult(message);
	};
	return (
		<View style={commonStyles.body}>
			<View style={commonStyles.loginTopArea}>
				<Image
					style={commonStyles.loginTopLogo}
					source={require("../../Images/Logo_lightgray.png")}
				/>
				<Text style={commonStyles.loginTopText}>로그인</Text>
			</View>
			<Text style={commonStyles.loginExplain}>SNS 계정으로 로그인</Text>
			<View style={commonStyles.loginSnsArea}>
				<Pressable
					onPress={() => {
						instagramLogin.show();
					}}
					style={commonStyles.loginSnsBtn}
				>
					<ImageBackground
						style={[
							commonStyles.loginSnsBtn,
							commonStyles.wh_100,
							{ marginBottom: 0 },
						]}
						source={require("../../Images/Insta_bg.png")}
						resizeMode="cover"
					>
						<Image
							style={commonStyles.loginSnsBtnIcon}
							source={require("../../Images/Insta_icon.png")}
						/>
						<Text style={commonStyles.loginSnsBtnText}>
							인스타로 시작하기
						</Text>
					</ImageBackground>
				</Pressable>
				<Pressable
					onPress={() => {
						signInWithKakao();
					}}
					style={[
						commonStyles.loginSnsBtn,
						{ backgroundColor: "#F9E000" },
					]}
				>
					<Image
						style={commonStyles.loginSnsBtnIcon}
						source={require("../../Images/Kakao_icon.png")}
					/>
					<Text
						style={[
							commonStyles.loginSnsBtnText,
							{ color: "#191600" },
						]}
					>
						카카오로 시작하기
					</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						getPP();
					}}
					style={[
						commonStyles.loginSnsBtn,
						{ backgroundColor: "#03CF5D" },
					]}
				>
					<Image
						style={commonStyles.loginSnsBtnIcon}
						source={require("../../Images/Naver_icon.png")}
					/>
					<Text style={commonStyles.loginSnsBtnText}>
						네이버로 시작하기
					</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						alert("애플");
					}}
					style={[
						commonStyles.loginSnsBtn,
						{ backgroundColor: "#212121" },
					]}
				>
					<Image
						style={commonStyles.loginSnsBtnIcon}
						source={require("../../Images/Apple_icon.png")}
					/>
					<Text style={commonStyles.loginSnsBtnText}>
						애플로 시작하기
					</Text>
				</Pressable>
			</View>
			<View style={commonStyles.customerServiceArea}>
				<Pressable
					onPress={() => {
						alert("카카오채널");
					}}
					style={commonStyles.customerService}
				>
					<Text>고객센터</Text>
				</Pressable>
			</View>
			<InstagramLogin
				ref={(ref) => (instagramLogin = ref)}
				appId="1532465443936934"
				appSecret="5b7811d0ef4ccbf83379ca6bb078dfba"
				redirectUrl="https://google.com/"
				scopes={["email", "user_media"]}
				onLoginSuccess={(data) => console.log(data, "ssss")}
				onLoginFailure={(data) => console.log(data, "fff")}
			/>
		</View>
	);
};
