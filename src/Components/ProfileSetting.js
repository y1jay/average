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
    ImageBackground,
} from "react-native";

import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import commonStyles from './Style';
import { TextInput } from "react-native-gesture-handler";

export default ({navigation, modalVisible, setModalVisible}) => {
	return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            setVisible={setModalVisible}
            >
            <View
                style={styles.modalBody}>
                <Pressable style={styles.settingItemArea} onPress={() => {setModalVisible(false)}}>
                    <Image style={{width: 20, height: 20}} source={require('../Images/back_arrow.png')} resizeMode={'contain'}/>
                    <Text style={styles.profileSettingTitle}>프로필 설정</Text>
                </Pressable>
                <View style={styles.myInfoImgArea}>
                    <Pressable onPress={() => {alert('프로필 이미지 설정')}}>
                        <ImageBackground 
                            source={require('../Images/profile.png')}
                            style={styles.myInfoImg}
                            resizeMode="cover">
                        </ImageBackground>
                    </Pressable>
                </View>
                <Text style={styles.settingTitle}>닉네임</Text>
                <View style={styles.settingInputArea}>
                    <TextInput  style={styles.settingInput}/>
                </View>
                <Text style={styles.settingTitle}>칭호</Text>
                <View style={styles.settingInputArea}>
                    <Text>칭호1</Text>
                    <Text>칭호2</Text>
                </View>
                <View style={styles.absoluteBtnArea}>
                    <Pressable style={styles.absoluteBtn}>
                        <Text style={styles.absoluteBtnText}>저장하기</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBody: {
        backgroundColor: '#FFF',
        flexGrow: 1,

    },
    profileSettingTitle: {
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 14
    },
    settingTitle: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    settingItemArea: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    myInfoImgArea: {
        alignItems: 'center'
    },
	myInfoImg: {
		width: 100,
		height: 100,
		borderRadius: 46,
		backgroundColor: '#FFF',
		overflow: 'hidden',
		shadowColor: "#212121",
		shadowOpacity: 0.2,
		shadowRadius: 3,
		shadowOffset: {
			height: 2,
			width: 0,
		},
		elevation: 3,
	},
    settingInputArea: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingInput: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 10
    },
    absoluteBtnArea: {
        width: '100%',
        padding: 20,
        paddingTop: 10,
        paddingBottom: 15,
        position: 'absolute',
        bottom: 0,
    },
    absoluteBtn: {
        backgroundColor: '#18A8C8',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center'
    },
    absoluteBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})