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
import axios from "axios";
import config from "../../Libs/Config";
import { UserGetter, UserSetter, UserRemover } from "../../User/UserInfo";
import InstagramLogin from "react-native-instagram-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getProfile,
	login,
	logout,
	unlink,
	loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";
// 공통 컴포넌트 선언
import commonStyles from "../../Components/Style";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default ({ navigation }) => {
	const signInWithKakao = async () => {
		const token = await login();
		// setResult(JSON.stringify(token));
		if (token.accessToken) {
			const profile = await getProfile();
			if (profile.id) {
				signIn("kakao", token.accessToken, profile.id);
			}
		}
	};
	const signInWithInstagram = async (data) => {
		console.log(data.user_id, "!@!@");
		if (data.access_token) {
			if (data.user_id) {
				signIn("instagram", data.access_token, data.user_id);
			}
		}
	};
	const signIn = async (type, token, uid) => {
		await axios
			.post(`${config.apiUrl}/user/member/signIn`, {
				token: token,
				state_code: 20,
				uid: uid,
				join_type: type,
			})
			.then(async (res) => {
				console.log(res.data.CODE, "로그인 성공");
				if (res.data.CODE == 10) {
					// ERROR ERROR ERROR ERROR ERROR
				} else {
					logIn(token, uid, type);
				}
			})
			.catch((e) => {
				console.log(e, "e");
			});
	};
	const logIn = async (token, uid, type) => {
		await axios
			.get(`${config.apiUrl}/user/member/userLogIn`, {
				params: { uid: uid, join_type: type },
			})
			.then(async (res) => {
				// console.log(res.data.DATA.paid_count, "로그인 성공");
				let user = await UserGetter();
				if (user.token != token) {
					tokenSetting = await axios.post(
						`${config.apiUrl}/user/member/userTokenSetting`,
						{
							uid: uid,
							join_type: type,
							token: token,
							member_idx: res.data.DATA.member_idx,
						}
					);
				}
				if (res.data.CODE == 20) {
					const userInfo = res.data.DATA;
					// console.log(userInfo, "uuu");
					let user = await UserSetter(userInfo, token);
					console.log(user);
					if (
						tokenSetting.data.CODE == 10 ||
						tokenSetting.data.CODE == 0 ||
						user == 10
					) {
						// ERROR ERROR ERROR 후처리 요망
						await UserRemover();
					} else {
						await navigation.navigate("MAIN01", {
							screen: "MAIN01",
						});
					}
				}
			})
			.catch((e) => {
				console.log(e, "e2");
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
					onPress={async () => {
						console.log(await UserGetter());
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
				// scopes={["email", "user_media"]}
				onLoginSuccess={(data) => {
					console.log("AAAAA", data);
					signInWithInstagram(data);
				}}
				onLoginFailure={(data) => console.log(data, "로그인 실패 처리")}
			/>
		</View>
	);
};
