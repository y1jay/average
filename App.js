import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback } from "react";
//import {StyleSheet, View, Image, Text} from 'react-native';
import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	Keyboard,
	KeyboardEvent,
	Button,
	Alert,
	AppRegistry,
} from "react-native";
// import {UserContextProvider} from '~/Contexts/UserContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from '@react-native-firebase/messaging';
// import NaviController from '~/Navigations/NaviController';

const App = () => {
	if (Platform.OS === "android") {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
	}

	const StatusBarStyle =
		Platform.OS === "ios" ? "dark-content" : "light-content";
	// const StatusBarColor = Platform.OS === 'ios' ? 'transparent' : 'transparent';

	//  ios 키보드 영역
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const [isShow, setIsShow] = useState(false);
	function onKeyboardDidShow(e) {
		setKeyboardHeight(e.endCoordinates.height);
		setIsShow(true);
	}
	function onKeyboardDidHide() {
		setKeyboardHeight(-30);
		setIsShow(false);
	}
	useEffect(() => {
		// foregroundListener();

		// checkforUpdates()
		// AppEventsLogger.logEvent(`Test-${Platform.OS ? 'android' : 'ios'}`);
		const showSubscription = Keyboard.addListener(
			"keyboardDidShow",
			onKeyboardDidShow
		);
		const hideSubscription = Keyboard.addListener(
			"keyboardDidHide",
			onKeyboardDidHide
		);
		// handlePushToken();
		// saveDeviceToken();
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);
	return (
		<Fragment>
			{/* <UserContextProvider> */}
			<SafeAreaView style={[{ flex: 1 }]}>
				<StatusBar
					barStyle={StatusBarStyle}
					backgroundColor={"transparent"}
				/>
				{/* <NaviController /> */}
			</SafeAreaView>
			{/* ios 키보드 영역 */}
			{/* </UserContextProvider> */}
		</Fragment>
	);
};

export default App;
