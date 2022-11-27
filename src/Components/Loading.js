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

import commonStyles from './Style';

export default ({navigation, modalVisibleSetting, setModalVisibleSetting}) => {
	return (
        <View style={[commonStyles.flexCenter, {flexGrow: 1}]}><Image source={require('../Images/logo_text_linear.png')}/></View>
    )
}