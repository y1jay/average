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
	modalTitle,
	modalText,
	modalType,
	modalAction,
	}) => {
		const type = [
			// 안내
			{titleIcon: '', color: '#0FC558'},
			// 완료
			{titleIcon: require("../Images/safe.png"), color: '#0FC558'},
			// 주의
			{titleIcon: require("../Images/care.png"), color: '#F59300'},
			// 경고
			{titleIcon: require("../Images/warn.png"), color: '#E50000'},
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
						{type[modalType].titleIcon !== '' && <Image source={type[modalType].titleIcon} style={{marginRight: 10}}/>}
						<Text style={commonStyles.commonModalTitle}>{modalTitle}</Text>
					</View>
					{modalText !== '' && <Text style={commonStyles.commonModalText}>{modalText}</Text>}
					{modalAction !== undefined && <View style={{flexDirection: 'row'}}>
						<Pressable onPress={() => setModalVisible(false)} style={commonStyles.commonModalBtn}>
							<Text style={commonStyles.commonModalBtnText}>닫기</Text>
						</Pressable>
						<Pressable onPress={modalAction} style={commonStyles.commonModalBtn}>
							<Text style={[commonStyles.commonModalBtnText, {color: type[modalType].color}]}>확인</Text>
						</Pressable>
					</View>}
				</View>
			</Pressable>
		</Modal>
	);
};
const styles = StyleSheet.create({
});
