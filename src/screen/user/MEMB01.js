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
import { useIsFocused } from '@react-navigation/native';
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
import MyNavigation from "../../Navigations/MyNavigation";
import Setting from "../../Components/Setting";
import ProfileSetting from "../../Components/ProfileSetting";
import Loading from "../../Components/Loading";
import commonStyles from "../../Components/Style";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default ({ navigation }) => {
	const isFocused = useIsFocused();
	// 유저 정보
	const userInfo = useRef({})
	// 로그인 여부 확인
	const [isLogin, setIsLogin] = useState();
	const [change, setChange] = useState(true);
	// 설정모달
	const [modalVisibleSetting, setModalVisibleSetting] = useState(false)
	const [modalVisibleProfileSetting, setModalVisibleProfileSetting] = useState(false)
	useEffect(() => {
		const Load = async () => {
			userInfo.current = ''
			userInfo.current = await UserGetter()
			setIsLogin(
				userInfo.current.member_idx !== "" 
				&& userInfo.current.member_idx !== null
				&& userInfo.current.member_idx !== undefined);
			setChange(!change)
		}
		Load();
	}, [isFocused, modalVisibleSetting])

	const memberInfo = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userInfoSelect`, {
				params: {
					member_idx: userInfo.current.member_idx,
				},
			})
			.then(async (res) => {
				await UserSetter(res.data, null);
				userInfo.current = await UserGetter();
				console.log('memberInfo!!!!!!!!!!!!!!!!', userInfo.current.paid_count)
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};

	// 공통 컬러코드
	const colorListMain = ["#F1F528", "#116C89"];

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
					const resUserInfo = res.data.DATA;
					let user = await UserSetter(resUserInfo, token);
					if (
						tokenSetting.data.CODE == 10 ||
						tokenSetting.data.CODE == 0 ||
						user == 10
					) {
						// ERROR ERROR ERROR 후처리 요망
						await UserRemover();
						return;
					} 
						// await navigation.navigate("MEMB01", {
						// 	screen: "MEMB01",
						// });
						userInfo.current = ''
						userInfo.current = await UserGetter()
						setIsLogin(true)
					
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

	// 로그인 페이지
	const Login = () => {
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
		)
	}
	
	// 내 정보 페이지
	const Mypage = () => {
		return (
			<View style={commonStyles.body}>
				<View style={styles.myInfoArea}>
					<View style={styles.myInfoMoreArea}>
						<Pressable style={styles.myInfoMoreBtn}>
							<Image source={require('../../Images/notice_white.png')}/>
						</Pressable>
						<Pressable 
							onPress={async () => {
								setModalVisibleSetting(true)
							}
							}
							style={styles.myInfoMoreBtn}>
							<Image source={require('../../Images/setting_white.png')}/>
						</Pressable>
					</View>
					<View style={{flexDirection: 'row'}}>
						<Pressable onPress={() => {setModalVisibleProfileSetting(true)}}>
							<ImageBackground 
								source={require('../../Images/profile.png')}
								style={styles.myInfoImg}
								resizeMode="cover">
							</ImageBackground>
						</Pressable>
						<View style={{flexGrow: 1, marginLeft: 15, justifyContent: 'flex-end', flexShrink: 1}}>
							<Text style={styles.myInfoNick}>
								<Text style={[styles.myInfoTitle, {color: colorListMain[0]}]}>{userInfo.current.crown} </Text>
								<Text>{isLogin && userInfo.current.nick}</Text>
							</Text>
							<View style={{flexDirection: 'row'}}>
								<Text style={styles.myInfoCardCnt}>남은카드 
									<Text style={{fontWeight: 'bold'}}>
										{(isLogin && (change || !change)) ? userInfo.current.paid_count : "0"}
									</Text>
								</Text>
								<Text style={styles.myInfoGoTest}>유형검사 하러가기 {">"}</Text>
							</View>
						</View>
					</View>
					<View style={styles.myInfoCntArea}>
						<View style={styles.myInfoCntItem}>
							<View style={styles.myInfoCntItemTitleArea}>
								<Text style={styles.myInfoCntItemTitle}>좋아</Text>
								<Image source={require('../../Images/heart_white.png')}/>
							</View>
							<Text style={styles.myInfoCntItemText}>00</Text>
						</View>
						<View style={styles.myInfoCntItem}>
							<View style={styles.myInfoCntItemTitleArea}>
								<Text style={styles.myInfoCntItemTitle}>채택</Text>
								<Image source={require('../../Images/good_white.png')}/>
							</View>
							<Text style={styles.myInfoCntItemText}>00</Text>
						</View>
						<View style={styles.myInfoCntItem}>
							<View style={styles.myInfoCntItemTitleArea}>
								<Text style={styles.myInfoCntItemTitle}>칭호</Text>
								<Image source={require('../../Images/heart_white.png')}/>
							</View>
							<Text style={styles.myInfoCntItemText}>00</Text>
						</View>
					</View>
				</View>
				<View style={styles.myListArea}>
					<MyNavigation/>
				</View>
				{/* 모달 */}
				<Setting
					modalVisible={modalVisibleSetting}
					setModalVisible={setModalVisibleSetting}/>
				<ProfileSetting
					modalVisible={modalVisibleProfileSetting}
					setModalVisible={setModalVisibleProfileSetting}/>
			</View>
		)
	}
	return ( 
		<View style={commonStyles.body}>
			{isLogin == undefined && <Loading/>}
			{isLogin && Mypage()}
			{isLogin == false && Login()}
		</View>
		
	);
};

const styles = StyleSheet.create({
	myInfoArea : {
		height: '40%',
		backgroundColor: '#18A8C8',
		padding: '3%',
		paddingTop: '10%', // 상태바 영역으로 대치
		justifyContent: 'space-between',
		position: 'relative'
	},
	myListArea: {
		height: '60%',
		backgroundColor: '#F8F8F8'
	},
	myInfoMoreArea: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	myInfoMoreBtn: {
		padding: 8,
	},
	myInfoImg: {
		width: 70,
		height: 70,
		borderRadius: 33,
		backgroundColor: '#FFF',
		overflow: 'hidden'
	},
	myInfoNick: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	myInfoCardCnt: {
		color: '#FFF',
		fontSize: 11,
		flexGrow: 1
	},
	myInfoGoTest: {
		color: '#FFF',
		fontSize: 11,
		textAlign: 'right'
	},
	myInfoCntArea: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 10,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent: 'center',
		paddingTop: '3%',
		paddingBottom: '3%'
	},
	myInfoCntItem: {
		flexGrow: 1,
		alignItems:'center',
		justifyContent: 'center'
	},
	myInfoCntItemTitleArea: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	myInfoCntItemTitle: {
		color: '#fff',
		fontSize: 12,
		marginRight: 5,
	},
	myInfoCntItemText: {
		color: '#fff',
		fontSize: 18,
		marginTop: 3,
	}
})