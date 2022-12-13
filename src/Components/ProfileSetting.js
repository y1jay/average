import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useCallback, useRef } from "react";
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
    ScrollView
} from "react-native";

import axios from "axios";
import config from "../Libs/Config";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import { useIsFocused } from "@react-navigation/native";
import commonStyles from './Style';
import { TextInput } from "react-native-gesture-handler";

export default ({navigation, modalVisible, setModalVisible}) => {
	const isFocused = useIsFocused();
    const [inputNick, setInputNick] = useState('')

	// 유저 정보
	const userInfo = useRef({});
	// 로그인 여부 확인
	const [isLogin, setIsLogin] = useState();
	const [change, setChange] = useState(true);
	useEffect(() => {
		const Load = async () => {
			userInfo.current = "";
			userInfo.current = await UserGetter();
            setInputNick(userInfo.current.nick)
			setIsLogin(
				userInfo.current.member_idx !== "" &&
					userInfo.current.member_idx !== null &&
					userInfo.current.member_idx !== undefined
			);
			setChange(!change);
		};
		Load();
	}, [modalVisible]);

	const memberInfo = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userInfoSelect`, {
				params: {
					member_idx: userInfo.current.member_idx,
				},
			})
			.then(async (res) => {
				await UserSetter(res.data, null);
				userInfo.current = await UserGetter();
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};
    // 저장하기 버튼 클릭
    const memberInfoUpdate = async () => {
		await axios
			.post(`${config.apiUrl}/user/member/userNickUpdate`, {
				member_idx: userInfo.current.member_idx,
                before_nick: userInfo.current.nick,
                after_nick: inputNick,
			})
			.then(async (res) => {
                console.log(userInfo.current.member_idx)
                console.log(userInfo.current.nick)
                console.log(inputNick)
                console.log(res.data)
				if (res.data.CODE == 20) {
                    alert(res.data.MSG)
                    memberInfo()
					// 10 : 사용 불가 닉네임
                    // 11 : 닉네임 변경 횟수 초과
                    // 12 : 중복 닉네임
                    // 13: 닉네임 변경 실패
                    // 14: 변경 히스토리 오류
                    // 20 : after_nick (으)로 변경이 완료되었습니다
				} else {
                    alert(res.data.MSG)
                    memberInfo()
				}
			})
			.catch((e) => {
				console.log(e, "e");
			});
    }

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
                        <View 
                            style={styles.myInfoCamera}>
                            <Image source={require('../Images/pencil.png')}/>
                        </View>
                    </Pressable>
                </View>
                <Text style={styles.settingTitle}>닉네임</Text>
                <View style={styles.settingInputArea}>
                    <TextInput 
                        value={inputNick} 
                        onChangeText={setInputNick}
                        placeholder="2글자 이상 입력해 주세요"
                        style={styles.settingInput}
                        maxLength={9}
                        />
                </View>
                <Text>월 1회 변경 가능합니다.</Text>
                <Text>횟수 없을 시 인풋창 비활성화, 클릭 시 변경불가 안내 모달</Text>
                <Text style={styles.settingTitle}>칭호</Text>
                <ScrollView style={styles.settingCrownListArea}>
                    <Text>칭호1</Text>
                    <Text>칭호2</Text>
                </ScrollView>
                <View style={styles.absoluteBtnBlank}></View>
                <View style={styles.absoluteBtnArea}>
                    <Pressable 
                        onPress={() => {memberInfoUpdate()}}
                        style={styles.absoluteBtn}>
                        <Text style={styles.absoluteBtnText}>저장하기</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBody: {
        height: '100%',
        backgroundColor: '#FFF',
        flexGrow: 1,
        flexShrink: 0
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
	myInfoCamera: {
		width: 26, 
		height: 26, 
		backgroundColor: 'rgba(255,255,255,0.8)', 
		borderRadius: 13,
		alignItems: 'center',
		justifyContent:'center',
		position: 'absolute',
		right: 0,
		bottom: 0,
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
        borderRadius: 10,
        fontSize: 16,
    },
    settingCrownListArea: {
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: 1,
        flexShrink: 1
    },
    absoluteBtnBlank: {
        height: 70
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
        height: 50,
        backgroundColor: '#18A8C8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    absoluteBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})