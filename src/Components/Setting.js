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

export default ({navigation, modalVisibleSetting, setModalVisibleSetting}) => {
	return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleSetting}
            setVisible={setModalVisibleSetting}
            >
            <View
                style={styles.modalBody}>
                <Pressable style={styles.settingItemArea} onPress={() => {setModalVisibleSetting(false)}}>
                    <Image style={{width: 20, height: 20}} source={require('../Images/back_arrow.png')} resizeMode={'contain'}/>
                </Pressable>
                <Text style={styles.settingTitle}>계정</Text>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>칭호 관리</Text></Pressable>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>닉네임 변경</Text></Pressable>
                <Pressable style={styles.settingItemArea} onPress={async () => {await UserRemover(); setModalVisibleSetting(false)}}><Text style={styles.settingItemText}>로그아웃</Text></Pressable>

                <Text style={styles.settingTitle}>고객지원</Text>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>공지사항</Text></Pressable>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>오뭐나 서비스 안내</Text></Pressable>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>카카오채널로 문의하기</Text></Pressable>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>개인정보 취급방침</Text></Pressable>
                
                <Text style={styles.settingTitle}></Text>
                <Pressable style={styles.settingItemArea}><Text style={styles.settingItemText}>회원탈퇴</Text></Pressable>
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
    settingItemText: {
        fontSize: 16,
        color: '#212121'
    }
})