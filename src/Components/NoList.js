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

import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import commonStyles from './Style';

export default ({navigation, modalVisible, setModalVisible}) => {
	return (
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <Image source={require('../Images/warn_gray.png')} style={{marginBottom: 10}}/>
            <Text>
                내역이 없습니다
            </Text>
        </View>
    )
}