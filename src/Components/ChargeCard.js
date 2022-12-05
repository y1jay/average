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

import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import commonStyles from "./Style";

export default ({ navigation, modalVisible, setModalVisible }) => {
	const getAds = () => {
		try {
			const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
				requestNonPersonalizedAdsOnly: true,
			});

			rewarded.onAdEvent((type, error, reward) => {
				if (error) {
					console.log(error, reward);
				}
				if (type === RewardedAdEventType.LOADED) {
					// 동영상 로드 완료
					rewarded.show(); // 동영상 광고 띄우기
				}
				if (type === RewardedAdEventType.EARNED_REWARD) {
					console.log("User earned reward of ", reward);
				}
			});
			rewarded.load();
		} catch (error) {
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
				style={styles.modalBody}
				onPress={() => {
					setModalVisible(false);
				}}
			>
				<Pressable style={styles.modalArea}>
					<Text style={styles.modalTitle}>카드 구매</Text>
					<View style={styles.chargeCardBtnArea}>
						<Pressable
							onPress={() => {
								alert("결제!");
							}}
							style={styles.chargeCardBtn}
						>
							<Text style={styles.chargeCardCnt}>x 3</Text>
							<Image
								style={styles.chargeCardImg}
								source={require("../Images/chargeCard_pay.png")}
							/>
							<Text
								style={[
									styles.chargeCardText,
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
							style={styles.chargeCardBtn}
						>
							<Text style={styles.chargeCardCnt}>x 1</Text>
							<Image
								style={styles.chargeCardImg}
								source={require("../Images/chargeCard_free.png")}
							/>
							<Text
								style={[
									styles.chargeCardText,
									{ color: "#007A31" },
								]}
							>
								무료
							</Text>
						</Pressable>
					</View>
					<Pressable
						onPress={() => {
							setModalVisible(false);
						}}
						style={styles.modalCloseBtn}
					>
						<Image source={require("../Images/black_x.png")} />
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalBody: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalArea: {
		width: "90%",
		backgroundColor: "#F8F8F8",
		borderRadius: 15,
		padding: "5%",
	},
	modalTitle: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: "5%",
	},
	chargeCardBtnArea: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	chargeCardBtn: {
		width: "48%",
		backgroundColor: "#FFF",
		borderRadius: 15,
		alignItems: "center",
		padding: "3%",
		shadowColor: "#212121",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		elevation: 3,
	},
	chargeCardCnt: {
		fontSize: 14,
		color: "#757575",
	},
	chargeCardImg: {
		marginTop: 5,
		marginBottom: 5,
	},
	chargeCardText: {
		fontSize: 18,
		fontFamily: "UhBeecharming",
	},
	modalCloseBtn: {
		width: 40,
		height: 40,
		backgroundColor: "#fff",
		borderRadius: 15,
		position: "absolute",
		top: -10,
		right: -10,
		shadowColor: "#212121",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		elevation: 3,
		alignItems: "center",
		justifyContent: "center",
	},
});
