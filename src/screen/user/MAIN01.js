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

import axios from "axios";
import config from "../../Libs/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from "@react-native-firebase/admob";
import Swiper from "react-native-swiper";
import { useIsFocused } from "@react-navigation/native";
import RNShake from "react-native-shake";
import { AnimatedBackgroundColorView } from "react-native-animated-background-color-view";
import { UserGetter, UserSetter } from "../../User/UserInfo";
import commonStyles from "../../Components/Style";

import Loading from "../../Components/Loading";
// 모달
import ChargeCard from "../../Components/ChargeCard";

export default ({ navigation }) => {
	const isFocused = useIsFocused();
	const winWidth = Dimensions.get("window").width;
	const winHeight = Dimensions.get("window").height;
	// 카드 충전 모달
	const [visibleChargeCard, setVisibleChargeCard] = useState(false);
	// 유저 정보
	const userInfo = useRef({});
	// 로그인 여부 확인
	const [isLogin, setIsLogin] = useState();
	const [change, setChange] = useState(true);
	const [loadingVisible, setLoadingVisible] = useState(false);
	useEffect(() => {
		const Load = async () => {
			userInfo.current = "";
			userInfo.current = await UserGetter();
			setIsLogin(
				userInfo.current.member_idx !== "" &&
					userInfo.current.member_idx !== null &&
					userInfo.current.member_idx !== undefined
			);
			setChange(!change);
		};
		Load();
	}, [isFocused, loadingVisible]);

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
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};

	// 공통 컬러코드
	const colorListMain = ["#007A31", "#F59300"];
	const colorListSub = ["#0FC558", "#F6D629"];
	// 백그라운드 색상 리스트
	const bgColorList = ["rgba(228, 244, 217, 1)", "#FBF7A7"];
	// 현재 스와이프 인덱스
	const [swipeIndex, setSwipeIndex] = useState(0);
	// 결과 정보
	const [doResult, setDoResult] = useState({});
	const [eatResult, setEatResult] = useState({});
	// 현재 카드 상태 (카드인덱스, 상태)
	const [doCardState, setDoCardState] = useState(0);
	const [eatCardState, setEatCardState] = useState(0);

	// 카드 PLAY 버튼
	const cardBtn = (index) => {
		// 사용가능한 카드가 없는 경우
		// 사용가능한 무료 카드가 있는 경우
		return (
			<Pressable
				onPress={() => {
					isLogin
						? // 카드를 Play 상태로 변경
						  // index == 0 ? setDoCardState(1) : setEatCardState(1)
						  playCard(index)
						: navigation.navigate("MEMB01", { screen: "MEMB01" });
				}}
				style={styles.cardBtn}
			>
				<Image
					style={{
						height: "100%",
						position: "absolute",
					}}
					source={
						index == 0
							? require("../../Images/MAIN01_btn1.png")
							: require("../../Images/MAIN01_btn2.png")
					}
					resizeMode="contain"
				/>
				<View style={styles.flexCenter}>
					{userInfo.current.free_count > 0 ? (
						<Text style={styles.cardBtnText}>오늘의 무료</Text>
					) : (
						<View style={styles.cardCntArea}>
							<Image
								style={{ height: 18 }}
								source={require("../../Images/MAIN01_card.png")}
							/>
							<Text style={styles.cardBtnText}>x 1</Text>
						</View>
					)}
					<Text style={styles.cardPlayText}>PLAY</Text>
				</View>
			</Pressable>
		);
	};
	// 카드 aside 영역
	const cardAside = (index) => {
		// 검사 이력이 있는 경우 닉네임 표시
		// 검사 이력이 없는 경우 검사 하기 버튼
		return (
			<Pressable style={styles.cardAsideArea}>
				{!isLogin && (
					<Text style={styles.cardAsideText}>로그인을 해 주세요</Text>
				)}
				{/* {isLogin && <Text style={styles.cardAsideText}>취향 검사 하러가기</Text>} */}
				{isLogin && (
					<View style={{ flexDirection: "row" }}>
						<Text
							style={[
								styles.cardAsideText,
								{ color: colorListMain[index], marginRight: 5 },
							]}
						>
							{userInfo.current.crown}
						</Text>
						<Text style={styles.cardAsideText}>
							{userInfo.current.nick}
						</Text>
					</View>
				)}
			</Pressable>
		);
	};
	// 카드
	const cardArea = (index, state) => {
		const type = index == 0 ? doResult : eatResult;
		// heart
		const heartImg = () => {
			return type.favorite == 0
				? require("../../Images/heart_gray.png")
				: require("../../Images/heart_yellow.png");
		};
		// CARD1 : Basic
		if (state == 0 || !isLogin) {
			return (
				<ImageBackground
					source={
						index == 0
							? require("../../Images/MAIN01_bg1.png")
							: require("../../Images/MAIN01_bg2.png")
					}
					resizeMode="contain"
					style={styles.cardArea}
				>
					{cardBtn(index)}
					{cardAside(index)}
				</ImageBackground>
			);
		}
		// CARD2 : Play
		if (state == 1) {
			return (
				<ImageBackground
					source={
						index == 0
							? require("../../Images/MAIN01_bg1_1.png")
							: require("../../Images/MAIN01_bg2_1.png")
					}
					resizeMode="contain"
					style={styles.cardArea}
				>
					<Text style={[styles.cardAsideText, { fontSize: 20 }]}>
						핸드폰을
					</Text>
					<Text style={[styles.cardAsideText, { fontSize: 20 }]}>
						흔들어 주세요
					</Text>
				</ImageBackground>
			);
		}
		// CARD3 : Result
		if (state == 2) {
			return (
				<View style={[styles.cardArea, styles.cardResultArea]}>
					<Pressable
						onPress={() => {
							alert(index + "좋아");
						}}
						style={styles.cardResultHeart}
					>
						<Image
							style={{ width: 20, height: 17 }}
							source={heartImg()}
							resizeMode={"contain"}
						/>
					</Pressable>
					<View style={{ alignItems: "center" }}>
						<Text style={[styles.cardAsideText, { fontSize: 20 }]}>
							오늘은
						</Text>
						<Text style={[styles.cardAsideText, { fontSize: 50 }]}>
							{type.result}
						</Text>
					</View>
					<View style={styles.cardResultAgainBtn}>
						<Text
							style={[
								styles.cardAsideText,
								styles.cardResultAgainBtnText,
							]}
						>
							한번 더!
						</Text>
						{cardBtn(index)}
						<Image
							style={styles.cardResultAgainBtnImg}
							source={require("../../Images/btn_aside_arrow.png")}
						/>
					</View>
					<Pressable
						onPress={() => {
							// alert("검색창 연결");
							// getAds();
						}}
						style={styles.cardResultBtn}
					>
						<Text style={styles.cardResultBtnText}>
							내 주변 {type.result}{" "}
							{index == 0 ? "할 곳" : "맛집"} 찾기
						</Text>
						<View style={styles.cardResultBtnArrow}></View>
					</Pressable>
				</View>
			);
		}
	};
	// test 일정시간 후 result
	useEffect(() => {
		if (doCardState == 1) {
			setTimeout(() => {
				setDoCardState(2);
			}, 1000);
		}
		if ((eatCardState == 1) == 1) {
			setTimeout(() => {
				setEatCardState(2);
			}, 1000);
		}
	}, [doCardState, eatCardState]);
	// useEffect(() => {
	// 	const subscription = RNShake.addListener(() => {
	//   alert('핸드폰이 흔들릴때 이게 동작을 할까?')
	// 	})

	// 	return () => {
	// 	  // Your code here...
	// 	  subscription.remove()
	// 	}
	//   }, [])

	const playCard = async (type) => {
		if (
			userInfo.current.free_count == 0 &&
			userInfo.current.paid_count == 0
		) {
			setVisibleChargeCard(true);
		} else {
			const url =
				type == 0 ? "/user/what/whatAction" : "/user/what/whatEat";
			await axios
				.get(`${config.apiUrl}${url}`, {
					params: {
						taste: 1,
						member_idx: userInfo.current.member_idx,
						use_count: 1,
					},
				})
				.then(async (res) => {
					type == 0 ? setDoCardState(1) : setEatCardState(1);
					// 성공 doResult
					type == 0
						? setDoResult(res.data.DATA)
						: setEatResult(res.data.DATA);
					memberInfo();
				})
				.catch((e) => {
					console.log(e, "e2");
				});
		}
	};

	return (
		<View style={{ flexGrow: 1 }}>
			{loadingVisible == true ? (
				<Loading loadingVisible={loadingVisible} />
			) : (
				<AnimatedBackgroundColorView
					color={bgColorList[swipeIndex]}
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
							// Play 상태에서 Result로 진행되지 않고 swipe한 경우 Basic 상태로 되돌리기
							index == 0 &&
								eatCardState == 1 &&
								setEatCardState(0);
							index == 1 && doCardState == 1 && setDoCardState(0);
						}}
						showsPagination={false}
						width={winWidth * 0.85}
						loadMinimal={true}
						scrollViewStyle={{ overflow: "visible" }}
						removeClippedSubviews={false}
					>
						{/* 뭐하나 */}
						<View style={styles.slideItem}>
							{cardArea(0, doCardState)}
						</View>
						{/* 뭐먹나 */}
						<View style={styles.slideItem}>
							{/* <ImageBackground
						source={require("../../Images/MAIN01_bg2.png")}
						resizeMode="contain"
						style={styles.cardArea}
					>
						{cardBtn(1)}
						{cardAside(1)}
					</ImageBackground> */}

							{cardArea(1, eatCardState)}
						</View>
					</Swiper>
					<View style={styles.cntArea}>
						<Pressable
							onPress={() => {
								isLogin
									? setVisibleChargeCard(true)
									: navigation.navigate("MEMB01", {
											screen: "MEMB01",
									  });
							}}
							style={styles.cntBtnArea}
						>
							<View
								style={[
									styles.cntBtnTextArea,
									{
										backgroundColor:
											colorListSub[swipeIndex],
									},
								]}
							>
								<Text style={styles.cntBtnText}>
									{isLogin
										? userInfo.current.paid_count
										: "0"}
								</Text>
							</View>
							<Image
								style={styles.cntBtnImg}
								source={
									swipeIndex == 0
										? require("../../Images/MAIN01_card1.png")
										: require("../../Images/MAIN01_card2.png")
								}
							/>
						</Pressable>
					</View>

					<ChargeCard
						modalVisible={visibleChargeCard}
						setModalVisible={setVisibleChargeCard}
						setLoadingVisible={setLoadingVisible}
					/>
				</AnimatedBackgroundColorView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	// #CAE8B2
	// #F6EF50
	flexCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	wrapper: {
		width: "200%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
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
		shadowColor: "#212121",
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
		flexDirection: "row",
		// alignItems: 'center'
	},
	cardBtnText: {
		color: "#F1F528",
		marginLeft: 5,
		fontFamily: "UhBeecharming",
		fontSize: 12,
	},
	cardPlayText: {
		color: "#FFF",
		fontFamily: "UhBeecharming",
		fontSize: 18,
	},
	cardAsideArea: {
		top: "20%",
	},
	cardAsideText: {
		fontFamily: "UhBeecharming",
		color: "#757575",
		fontSize: 14,
	},
	cardAsideTextTitle: {
		marginRight: 10,
	},
	cardResultArea: {
		justifyContent: "space-between",
		paddingTop: "10%",
		paddingBottom: "10%",
	},
	cardResultHeart: {
		width: "20%",
		height: "8%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: "10%",
	},
	cardResultAgainBtn: {
		justifyContent: "flex-end",
		paddingBottom: "5%",
		marginTop: "10%",
	},
	cardResultAgainBtnText: {
		fontSize: 16,
		color: "#BDBDBD",
		position: "absolute",
		top: "0%",
		transform: [{ rotate: "-30deg" }],
	},
	cardResultAgainBtnImg: {
		position: "absolute",
		right: -50,
		top: "10%",
	},
	cardResultBtn: {
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 2,
		borderColor: "#BDBDBD",
		padding: 10,
		paddingRight: 20,
		paddingBottom: 0,
		top: 0,
	},
	cardResultBtnArrow: {
		width: 10,
		height: 10,
		position: "absolute",
		right: 2,
		bottom: -5,
		borderRightWidth: 2,
		borderColor: "#BDBDBD",
		transform: [{ rotate: "-45deg" }],
	},
	cardResultBtnText: {
		color: "#757575",
		fontSize: 12,
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
		flexDirection: "row",
		alignItems: "flex-end",
		position: "relative",
	},
	cntBtnImg: {
		width: 21,
		height: 27,
		position: "absolute",
		top: 0,
		left: 4,
	},
	cntBtnTextArea: {
		width: "100%",
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
		fontFamily: "UhBeecharming",
		textAlign: "center",
		fontSize: 11,
	},
});
