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
    const [testProgress, setTestProgress] = useState(0)
    const testStart = () => {
        // 테스트 실행 시 카드 차감 or 광고재생?
        // 실행 불가 시 실행 불가 팝업생성 or 구매 팝업 연결
        // 테스트 화면으로 이동
        setTestProgress(1)
    }
    const testStartArea = () => {
        return (
            <View style={[styles.typeTestArea, {justifyContent: 'center'}]}>
                <View style={{alignItems: 'center', height: '60%'}}>
                <Image style={{width: 100, height: 100, marginBottom: 10}} resizeMode={'contain'} source={require('../Images/type_test_00.png')}/>
                <Text style={styles.typeTestQText}>유형검사 시작하기</Text>
                <View style={[commonStyles.chargeCardBtnArea, {width: '80%'}]}>
                    <Pressable
                        onPress={() => {
                            alert("결제!");
                        }}
                        style={commonStyles.chargeCardBtn2}
                    >
                        <Image
                            style={commonStyles.chargeCardImg}
                            source={require("../Images/chargeTest_pay.png")}
                        />
                        <Text
                            style={[
                                commonStyles.chargeCardText,
                                { color: "#F59300" },
                            ]}
                        >
                            ₩1000
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            alert("광고!");
                            // getAds();
                        }}
                        style={commonStyles.chargeCardBtn2}
                    >
                        <Image
                            style={commonStyles.chargeCardImg}
                            source={require("../Images/chargeTest_free.png")}
                        />
                        <Text
                            style={[
                                commonStyles.chargeCardText,
                                { color: "#007A31" },
                            ]}
                        >
                            무료
                        </Text>
                    </Pressable>
                </View>
                </View>
                <View style={{alignItems: 'center', height: '20%'}}>
                <Text style={{fontSize: 16, fontFamily: "UhBeecharming" }}>아직 검사 기록이 없네요!</Text>
                <Text style={{fontSize: 12}}>유형검사를 하면 취향에 맞게 추천 해줘요!</Text>
                </View>
            </View>
        )
    }
    const testArea = () => {
        return (
            <View style={styles.typeTestArea}>
                <Text style={styles.typeTestTitle}>0 / 10</Text>
                <View style={styles.typeTestProgressBarArea}>
                    <View style={styles.typeTestProgressBar}></View>
                    <View style={styles.typeTestProgressCircle}></View>
                </View>
                <View style={styles.typeTestQArea}>
                    <Image source={require('../Images/type_test_01.png')}/>
                    <Text style={styles.typeTestQText}>밥 먹고 나서</Text>
                    <Text style={[styles.typeTestQText, {fontSize: 36, top: -10}]}>디저트 먹을거야?</Text>
                </View>
                <View style={styles.typeTestAArea}>
                    <Pressable style={styles.typeTestA}>
                        <Image style={styles.typeTestAImg} resizeMode={'contain'} source={require('../Images/type_test_O.png')}/>
                    </Pressable>
                    <Pressable style={styles.typeTestA}>
                        <Image style={styles.typeTestAImg} resizeMode={'contain'} source={require('../Images/type_test_X.png')}/>
                    </Pressable>
                </View>
                
                <View style={styles.typeTestReternArea}>
                    <Pressable onPress={() => {setTestProgress(testProgress -1)}}>
                        <Text>{'<'} 이전</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
	return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            setVisible={setModalVisible}
            >
            <View
                style={commonStyles.modalBodyFull}>
				<Pressable
					style={commonStyles.commonModalTopArea}
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Image
							style={{ width: 20, height: 20 }}
							source={require("../Images/back_arrow.png")}
							resizeMode={"contain"}
						/>
        			<Text style={commonStyles.commonModalTopTitle}>유형검사</Text>
				</Pressable>
                {0 >= testProgress ? testStartArea() : testArea()}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    typeTestArea: {
        alignItems: 'center',
        flexGrow: 1
    },
    typeTestTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    typeTestProgressBarArea: {
        width: '30%',
        height: 20,
        justifyContent: 'center',
    },
    typeTestProgressBar: {
        height: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 4
    },
    typeTestProgressCircle: {
        width: 20, 
        height: 20,
        position: 'absolute',
        borderWidth: 5,
        borderRadius: 10,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFF',
        transform: [{translateX: -10}],
        left: '0%',
    },
    typeTestQArea: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeTestQText: {
		fontFamily: "UhBeecharming",
        fontSize: 28,
        color: '#212121'
    },
    typeTestAArea: {
        width: '90%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flexGrow: 1,
    },
    typeTestA: {
        width: '50%',
        height: 80,
        alignItems: 'center',
    },
    typeTestAImg: {
        width: 80,
        height: '100%'
    },
    typeTestReternArea: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})