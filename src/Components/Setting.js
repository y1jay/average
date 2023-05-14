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

import config from "../Libs/Config";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import commonStyles from "./Style";
import api from "../Libs/Api";
import axios from "axios";
import { unlink } from "@react-native-seoul/kakao-login";
export default ({ navigation, modalVisible, setModalVisible }) => {
	useEffect(() => {
		// const userInfo = useRef({});
		const Load = async () => {
			let aa = await UserGetter();
			// userInfo.current = "";
			// userInfo.current = await UserGetter();
			// setInputNick(userInfo.current.nick);
			// setIsLogin(
			// 	userInfo.current.member_idx !== "" &&
			// 		userInfo.current.member_idx !== null &&
			// 		userInfo.current.member_idx !== undefined
			// );
			// setChange(!change);
			// nickCount();
			// crownList();
			// setSelectedCrown(userInfo.current.crown);
			console.log("AAAA", aa);
		};
		Load();
	}, [modalVisible]);
	const signOut = async () => {
		//
		const userInfo = await UserGetter();
		console.log(userInfo.member_idx, "@@@@");
		console.log(userInfo.uid, "@@@@");
		console.log(userInfo.join_type, "@@@@");
		if (userInfo.join_type == "kakao") {
			// await unlink();
		}
		// let result = await api.post("/user/member/userSignOut", {
		// 	member_idx: userInfo.member_idx,
		// 	uid: userInfo.uid,
		// });
		let response = await axios.post(
			`${config.apiUrl}/user/member/userSignOut`,
			{
				member_idx: userInfo.member_idx,
				uid: userInfo.uid,
			}
		);

		if (response.CODE == 20) {
			await UserRemover();
			setModalVisible(false);
		}
		console.log(response.data, "@@@");
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			setVisible={setModalVisible}
		>
			<View
				style={[
					commonStyles.modalBodyFull,
					{ backgroundColor: "#F8F8F8" },
				]}
			>
				<Pressable
					style={commonStyles.commonModalTopArea}
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Image
						style={{ width: 20, height: 20 }}
						source={require("../Images/back_arrow.png")}
						resizeMode={"contain"}
					/>
				</Pressable>
				{/* <Text style={styles.settingTitle}>계정</Text>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>칭호 관리</Text></Pressable>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>닉네임 변경</Text></Pressable> */}

				<Text style={styles.settingTitle}>고객지원</Text>
				<Pressable style={styles.settingItemArea}>
					<Text style={styles.settingItemText}>공지사항</Text>
				</Pressable>
				<Pressable style={styles.settingItemArea}>
					<Text style={styles.settingItemText}>
						오뭐나 서비스 안내
					</Text>
				</Pressable>
				<Pressable style={styles.settingItemArea}>
					<Text style={styles.settingItemText}>
						카카오채널로 문의하기
					</Text>
				</Pressable>
				<Pressable style={styles.settingItemArea}>
					<Text style={styles.settingItemText}>
						개인정보 취급방침
					</Text>
				</Pressable>

				<Text style={styles.settingTitle}></Text>
				<Pressable
					style={styles.settingItemArea}
					onPress={async () => {
						await UserRemover();
						setModalVisible(false);
					}}
				>
					<Text style={styles.settingItemText}>로그아웃</Text>
				</Pressable>
				<Pressable
					style={styles.settingItemArea}
					onPress={async () => {
						await signOut();
					}}
				>
					<Text style={styles.settingItemText}>회원탈퇴</Text>
				</Pressable>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	settingTitle: {
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		fontWeight: "bold",
	},
	settingItemArea: {
		padding: 20,
		borderBottomWidth: 1,
		borderColor: "#F8F8F8",
		backgroundColor: "#FFF",
	},
	settingItemText: {
		fontSize: 16,
		color: "#212121",
	},
});
