import "react-native-gesture-handler";
import React, { Fragment, useEffect, useState, useRef } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	StyleSheet,
	Text,
	Keyboard,
	Dimensions,
	Button,
	Alert,
	Image,
	Pressable,
    Modal,
    Animated
} from "react-native";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
// 컴포넌트
import commonStyles from './Style';
// 라이브러리
import Swiper from "react-native-swiper";

export default ({navigation, modalVisible, setModalVisible, setVisibleChargeCard}) => {
	const winWidth = Dimensions.get("window").width;
	const winHeight = Dimensions.get("window").height;
    const [testProgress, setTestProgress] = useState(-1);
    const testProgressRef = useRef(0)
    const testStart = () => {
        // 테스트 실행 시 카드 차감 or 광고재생?
        // 실행 불가 시 실행 불가 팝업생성 or 구매 팝업 연결
        // 테스트 화면으로 이동
        setTestProgress(0)
    }
    // 검사 종류
    const testTitle = [{title:'디저트 유형', img: require('../Images/type_test_01.png')}, {title:'음식 유형'}, {title:'취미 유형'}]
    const testDessertA = ['녹차', '아메리카노', '쌍화차']   // 부장님 입맛
    const testDessertB = ['요구르트', '라떼', '스무디']     // 단거 처돌이
    const testFoodA = ['라면', '파스타', '우동']            // 면 성애자
    const testFoodB = ['햄버거', '치킨', '스테이크']        // 육식파
    const testFoodC = ['짬뽕', '비빔냉면', '불닭볶음면']    // 소화기관 고문가

    // 검사지 슬라이드 애니메이션 구현
    const slideAnim = useRef(new Animated.Value(0)).current;
    const slide = (item) => {
        if (item < 0 && 0 >= testProgressRef.current) {return;}
        testProgressRef.current = testProgressRef.current + item
        setTestProgress(testProgressRef.current)
        console.log('item ======================>', item)
        console.log('testProgressRef.current ======================>', testProgressRef.current)
        Animated.timing(slideAnim, {
          toValue: - (winWidth * testProgressRef.current),
          duration: 500,
          useNativeDriver: true,
        }).start();
      };

    const testStartArea = () => {
        return (
            <View style={[styles.typeTestArea, {justifyContent: 'center'}]}>
                <View style={{alignItems: 'center', height: '60%', justifyContent: 'space-around'}}>
                <Image style={{width: 100, height: 100, marginBottom: 10}} resizeMode={'contain'} source={require('../Images/type_test_00.png')}/>
                <Text style={styles.typeTestQText}>유형검사 시작하기</Text>
                <View style={[commonStyles.chargeCardBtnArea, {width: '80%'}]}>
                {/* <View style={commonStyles.chargeCardBtnArea}> */}
                    <Pressable
                        onPress={() => {
                            // setVisibleChargeCard(true);
                            testStart();
                        }}
                        style={commonStyles.chargeCardBtn}
                    >
						<Text style={commonStyles.chargeCardCnt}>x 3</Text>
                        <Image
                            style={commonStyles.chargeCardImg}
                            source={require("../Images/chargeCard_pay.png")}
                        />
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
        //TODO: 100%를 테스트 문항의 총 개수로 나눈 값에 testProgress를 곱해야함.
        const progressPercent = (testProgressRef.current * 10);
        return (
                <View style={styles.typeTestArea}>
                    <Text style={styles.typeTestTitle}>{progressPercent} / 10</Text>
                    <View style={styles.typeTestProgressBarArea}>
                        <View style={styles.typeTestProgressBar}></View>
                        <View style={[styles.typeTestProgressCircle, {left: progressPercent}]}></View>
                    </View>

                    <View style={{width: '100%', flexGrow: 1, justifyContent: 'center'}}>
                    <Text style={styles.typeTestQText}>{testTitle[0].title}</Text>
                    <Animated.View style={[styles.slideArea, {transform: [{translateX: slideAnim}]}]}>
                        {/* 디저트 유형 */}
                        <View style={[styles.typeTestQArea, {width: winWidth}]}>
                            <Image source={testTitle[0].img}/>
                            <Pressable onPress={() => slide(1)} style={{width: '80%', padding: 30, borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30}}>
                                <Text style={styles.typeTestQText}>{testDessertA[0]}</Text>
                            </Pressable>
                            <Text style={[styles.typeTestQText, {color: '#F6D629'}]}>VS</Text>
                            <Pressable onPress={() => slide(1)} style={{width: '80%', padding: 30, borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30}}>
                                <Text style={styles.typeTestQText}>{testDessertB[0]}</Text>
                            </Pressable>
                        </View>
                        {/* 음식 유형 */}
                        <View style={[styles.typeTestQArea, {width: winWidth}]}>
                            <Image source={require('../Images/type_test_01.png')}/>
                            <Pressable onPress={() => slide(1)} style={{width: '80%', padding: 30, borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30}}>
                                <Text style={styles.typeTestQText}>{testFoodA[0]}</Text>
                            </Pressable>
                            <Text style={[styles.typeTestQText, {color: '#F6D629'}]}>VS</Text>
                            <Pressable onPress={() => slide(1)} style={{width: '80%', padding: 30, borderWidth: 1, borderColor: '#EDEDED', borderRadius: 30}}>
                                <Text style={styles.typeTestQText}>{testFoodB[0]}</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                    </View>
                    
                    {/* <View style={styles.typeTestAArea}>
                        <Pressable style={styles.typeTestA}>
                            <Image style={styles.typeTestAImg} resizeMode={'contain'} source={require('../Images/type_test_O.png')}/>
                        </Pressable>
                        <Pressable 
                            onPress={() => {slide(1)}}
                            style={styles.typeTestA}>
                            <Image style={styles.typeTestAImg} resizeMode={'contain'} source={require('../Images/type_test_X.png')}/>
                        </Pressable>
                    </View> */}
                    <View style={styles.typeTestReternArea}>
                       {testProgress > 0 && <Pressable onPress={() => {slide(-1)}}>
                            <Text>{'<'} 이전</Text>
                        </Pressable>}
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
                {0 > testProgress ? testStartArea() : testArea()}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    typeTestArea: {
        alignItems: 'center',
        flexGrow: 1,
    },
    typeTestTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    typeTestProgressBarArea: {
        width: '20%',
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
    slideArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    typeTestQArea: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeTestQText: {
		fontFamily: "UhBeecharming",
        fontSize: 22,
        color: '#212121',
        textAlign: 'center'
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