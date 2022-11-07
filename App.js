import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	Keyboard,
	KeyboardEvent,
	Button,
	Alert,
	Image,
	Pressable,
	Platform,
} from "react-native";

import commonStyles from "./src/Components/Style";
import Login from "./src/screen/user/MEMB01";
import NavigationContainer from "./src/Navigations/NavigationContainer";
import MainNavigation from "./src/Navigations/MainNavigation";

// 안드로이드 시스템 바 제거
import SystemNavigationBar from "react-native-system-navigation-bar";
const App = ({ navigation }) => {
	if (Platform.OS === "android") {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
		SystemNavigationBar.stickyImmersive();
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

				<NavigationContainer />
				<View style={commonStyles.bannerArea}>
					<Text style={commonStyles.textWhite}>배너 광고</Text>
				</View>
			</SafeAreaView>
			{/* ios 키보드 영역 */}
			{/* </UserContextProvider> */}
		</Fragment>
	);
};

export default App;
