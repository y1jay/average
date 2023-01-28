import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet,
	Text,
	Keyboard,
	KeyboardEvent,
	Button,
	Alert,
	Image,
	Pressable,
	Modal,
} from "react-native";
import {
	RewardedAd,
	RewardedAdEventType,
	TestIds,
} from "@react-native-firebase/admob";
import config from "../Libs/Config";
import axios from "axios";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import commonStyles from "./Style";

export default ({
	navigation,
	modalVisible,
	setModalVisible,
	setLoadingVisible,
	setLoadingType,
}) => {
	const getAds = () => {
		setModalVisible(false);
		setLoadingType(1)
		setLoadingVisible(true);
		try {
			const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
				requestNonPersonalizedAdsOnly: true,
			});

			rewarded.onAdEvent(async (type, error, reward) => {
				if (error) {
					console.log(error, reward);
					setLoadingVisible(false);
				}
				if (type === RewardedAdEventType.LOADED) {
					// 동영상 로드 완료
					rewarded.show(); // 동영상 광고 띄우기
				}
				if (type === RewardedAdEventType.EARNED_REWARD) {
					console.log("User earned reward of ", reward);
					if (reward) {
						//
						console.log("AAAAAA");
						let user = await UserGetter();
						await axios
							.post(`${config.apiUrl}/user/member/userReward`, {
								member_idx: user.member_idx,
								paid_count: user.paid_count,
								reward_count: 1,
								type: 0,
							})
							.then(async (res) => {
								console.log(res.data, "로그인 성공");
								if (res.data.CODE == 10) {
									// ERROR ERROR ERROR ERROR ERROR
									// 리워드 지급 오류
								} else {
									let userInfo = {
										paid_count:
											parseInt(user.paid_count) + 1,
									};
									await UserSetter(userInfo);
									// logIn(token, uid, type);
									setLoadingVisible(false);
								}
							})
							.catch((e) => {
								console.log(e, "e");
							});
					}
				}
			});
			rewarded.load();
		} catch (error) {
			// 광고 로드 오류 (광고 없을때도 나옴)
			setLoadingVisible(false);
			console.log("catch error", error);
		}
	};
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			setVisible={setModalVisible}
		>
			<Pressable
				style={commonStyles.modalBody}
				onPress={() => {
					setModalVisible(false);
				}}
			>
				<Pressable style={commonStyles.modalArea}>
					<Text style={commonStyles.modalTitle}>카드 구매</Text>
					<View style={commonStyles.chargeCardBtnArea}>
						<Pressable
							onPress={() => {
								alert("결제!");
							}}
							style={commonStyles.chargeCardBtn}
						>
							<Text style={commonStyles.chargeCardCnt}>x 3</Text>
							<Image
								style={commonStyles.chargeCardImg}
								source={require("../Images/chargeCard_pay.png")}
							/>
							<Text
								style={[
									commonStyles.chargeCardText,
									{ color: "#F59300" },
								]}
							>
								₩1000
							</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								getAds();
							}}
							style={commonStyles.chargeCardBtn}
						>
							<Text style={commonStyles.chargeCardCnt}>x 1</Text>
							<Image
								style={commonStyles.chargeCardImg}
								source={require("../Images/chargeCard_free.png")}
							/>
							<Text
								style={[
									commonStyles.chargeCardText,
									{ color: "#007A31" },
								]}
							>
								무료
							</Text>
						</Pressable>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};
