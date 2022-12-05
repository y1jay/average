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
                </Pressable>
                <Text style={styles.settingTitle}>프로필 설정</Text>

                <Pressable onPress={() => {setModalVisibleProfileSetting(true)}}>
                    <ImageBackground 
                        source={require('../Images/profile.png')}
                        style={styles.myInfoImg}
                        resizeMode="cover">
                    </ImageBackground>
                </Pressable>
                
                <Text style={styles.settingTitle}>닉네임</Text>
                <Text style={styles.settingTitle}>칭호</Text>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBody: {
        backgroundColor: '#F8F8F8',
        flexGrow: 1,

    },
    settingTitle: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold',
    },
    settingItemArea: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#F8F8F8',
        backgroundColor: '#FFF',
    },
	myInfoImg: {
		width: 100,
		height: 100,
		borderRadius: 46,
		backgroundColor: '#FFF',
		overflow: 'hidden'
	},
})