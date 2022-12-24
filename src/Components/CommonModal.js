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
	// 타입
	// 제목
	// 내용
	}) => {
		const type = [
			// 
			{titleIcon: 'require("../Images/safe.png")', color: '#0FC558'},
		]
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
				<View style={commonStyles.modalArea}>
					<View style={[commonStyles.flexCenter, {flexDirection: 'row', padding: 35}]}>
						<Image source={require("../Images/safe.png")} style={{marginRight: 10}}/>
						<Text style={commonStyles.commonModalTitle}>모달 제목</Text>
					</View>
					<Text style={commonStyles.commonModalText}>모달 내용</Text>
					<View style={{flexDirection: 'row'}}>
						<Pressable style={commonStyles.commonModalBtn}>
							<Text style={commonStyles.commonModalBtnText}>닫기</Text>
						</Pressable>
						<Pressable style={commonStyles.commonModalBtn}>
							<Text style={commonStyles.commonModalBtnText}>확인</Text>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</Modal>
	);
};
const styles = StyleSheet.create({
});
