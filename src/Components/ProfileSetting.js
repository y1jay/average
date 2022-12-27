import "react-native-gesture-handler";
import React, {
	Fragment,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
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
	ScrollView,
} from "react-native";

import axios from "axios";
import config from "../Libs/Config";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";
import { useIsFocused } from "@react-navigation/native";
import commonStyles from "./Style";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import * as ImagePicker from "react-native-image-picker"

export default ({ navigation, modalVisible, setModalVisible }) => {
	const isFocused = useIsFocused();
	// 입력된 닉네임
	const [inputNick, setInputNick] = useState("");
	// 닉네임 수정 가능 여부
	const [editable, setEditable] = useState(false);
	// 칭호 리스트
	const [crownListData, setCrownListData] = useState("");
	// 선택된 칭호
	const [selectedCrown, setSelectedCrown] = useState("");
	const [selectedCrownIdx, setSelectedCrownIdx] = useState("");
	const bookMarkCrownIdx = useRef("");
	// 유저 정보
	const userInfo = useRef({});
	// 로그인 여부 확인
	const [isLogin, setIsLogin] = useState();
	const [change, setChange] = useState(true);
	useEffect(() => {
		const Load = async () => {
			userInfo.current = "";
			userInfo.current = await UserGetter();
			setInputNick(userInfo.current.nick);
			setIsLogin(
				userInfo.current.member_idx !== "" &&
					userInfo.current.member_idx !== null &&
					userInfo.current.member_idx !== undefined
			);
			setChange(!change);
			nickCount();
			crownList();
			setSelectedCrown(userInfo.current.crown);
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
	// 프로필 이미지 변경
	const openPicker = () => {
		const options = {
			title: "Load Photo",
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};
		launchImageLibrary(options, (response) => {
			// Use launchImageLibrary to open image gallery
			console.log("Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log(
					"User tapped custom button: ",
					response.customButton
				);
			} else {
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				console.log(source);
			}
		});
	};
	// 닉네임 변경 횟수 체크
	const nickCount = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userNickCount`, {
				params: {
					member_idx: userInfo.current.member_idx,
				},
			})
			.then(async (res) => {
				if (res.data.cnt == 0) {
					setEditable(true);
				} else {
					setEditable(false);
				}
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};
	// 칭호 리스트
	const crownList = async () => {
		await axios
			.get(`${config.apiUrl}/user/member/userCrownList`, {
				params: {
					page: 1,
					member_idx: userInfo.current.member_idx,
				},
			})
			.then(async (res) => {
				setCrownListData(res.data.DATA);
			})
			.catch((e) => {
				console.log(e, "e2");
			});
	};
	// 칭호 리스트 아이템
	const crownListRenderItem = ({ item, index }) => (
		<Pressable
			onPress={() => {
				setSelectedCrown(item.crown);
				setSelectedCrownIdx(item.crown_idx);
			}}
			key={index}
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderWidth: 1,
					marginBottom: 20,
				},
				selectedCrown == item.crown && { borderColor: "red" },
			]}
		>
			<Text>{item.crown}</Text>
			<Pressable
				onPress={() => {
					bookMarkCrownIdx.current = item.crown_idx;
					crownBookMark(item.bookmark);
				}}
			>
				<Image
					source={
						item.bookmark == 0
							? require("../Images/Star_gray.png")
							: require("../Images/Star_yellow.png")
					}
				/>
			</Pressable>
		</Pressable>
	);
	// 칭호 즐겨찾기
	const crownBookMark = async (bookmarkYn) => {
		console.log("0000000000000000000000000", bookMarkCrownIdx.current);
		console.log("0000000000000000000000000", bookmarkYn == 0 ? 1 : 0);
		await axios
			.post(`${config.apiUrl}/user/member/userCrownBookMark`, {
				member_idx: userInfo.current.member_idx,
				crown_idx: bookMarkCrownIdx.current,
				bookmark: bookmarkYn == 0 ? 1 : 0,
			})
			.then(async (res) => {
				console.log(res.data);
				setCrownListData("");
				crownList();
			})
			.catch((e) => {
				console.log(e, "e");
			});
	};
	// 저장하기 버튼 클릭
	const memberInfoUpdate = async () => {
		// 닉네임이 변경된 경우
		if (inputNick !== userInfo.current.nick) {
			// 공백이 있는 경우
			var blank_pattern = /[\s]/g;
			// 이모지가 있는 경우
			var emoji_pattern = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
			if (blank_pattern.test(inputNick) == true) {
				alert("공백이 입력되었습니다.");
			} else if (emoji_pattern.test(inputNick) == true) {
				alert("특수문자가 입력되었습니다.");
			} else {
				await axios
					.post(`${config.apiUrl}/user/member/userNickUpdate`, {
						member_idx: userInfo.current.member_idx,
						before_nick: userInfo.current.nick,
						after_nick: inputNick,
					})
					.then(async (res) => {
						if (res.data.CODE == 20) {
							alert(res.data.MSG);
							memberInfo();
							// 10 : 사용 불가 닉네임
							// 11 : 닉네임 변경 횟수 초과
							// 12 : 중복 닉네임
							// 13: 닉네임 변경 실패
							// 14: 변경 히스토리 오류
							// 20 : after_nick (으)로 변경이 완료되었습니다
						} else {
							alert(res.data.MSG);
							memberInfo();
						}
					})
					.catch((e) => {
						console.log(e, "e");
					});
			}
		}
		// 칭호가 변경된 경우
		if (selectedCrown !== userInfo.current.crown) {
			await axios
				.post(`${config.apiUrl}/user/member/userCrownChange`, {
					member_idx: userInfo.current.member_idx,
					crown_idx: selectedCrownIdx,
				})
				.then(async (res) => {
					memberInfo();
				})
				.catch((e) => {
					console.log(e, "e");
				});
		}
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			setVisible={setModalVisible}
		>
			<View style={styles.modalBody}>
				<Pressable
					style={styles.settingItemArea}
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Image
						style={{ width: 20, height: 20 }}
						source={require("../Images/back_arrow.png")}
						resizeMode={"contain"}
					/>
					<Text style={styles.profileSettingTitle}>프로필 설정</Text>
				</Pressable>
				<View style={styles.myInfoImgArea}>
					<Pressable
						onPress={() => {
							openPicker();
						}}
					>
						<ImageBackground
							source={require("../Images/profile.png")}
							style={styles.myInfoImg}
							resizeMode="cover"
						></ImageBackground>
						<View style={styles.myInfoCamera}>
							<Image
								style={styles.myInfoCameraImg}
								resizeMode={"contain"}
								source={require("../Images/camera.png")}
							/>
						</View>
					</Pressable>
				</View>
				<Text style={styles.settingTitle}>닉네임</Text>
				<Pressable
					onPress={() => {
						!editable && alert("닉네임 변경횟수를 초과하셨습니다.");
					}}
					style={styles.settingInputArea}
				>
					<TextInput
						value={inputNick}
						onChangeText={setInputNick}
						onFocus={() => {
							setInputNick("");
						}}
						placeholder="닉네임 변경은 월 1회 가능합니다."
						style={styles.settingInput}
						maxLength={9}
						editable={editable}
					/>
				</Pressable>
				<Text style={styles.settingTitle}>칭호</Text>
				<FlatList
					style={{ padding: 20, paddingTop: 10, paddingBottom: 10 }}
					data={crownListData}
					renderItem={crownListRenderItem}
					// numColumns={3}
					// columnWrapperStyle={{justifyContent: 'space-between'}}
					// ListHeaderComponent={<View style={{height: 15}}></View>}
					ListEmptyComponent={<Text>아모것도업서</Text>}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				/>
				<View style={styles.absoluteBtnBlank}></View>
				<View style={styles.absoluteBtnArea}>
					<Pressable
						onPress={() => {
							memberInfoUpdate();
						}}
						style={styles.absoluteBtn}
					>
						<Text style={styles.absoluteBtnText}>저장하기</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalBody: {
		height: "100%",
		backgroundColor: "#FFF",
		flexGrow: 1,
		flexShrink: 0,
	},
	profileSettingTitle: {
		fontWeight: "bold",
		marginLeft: 15,
		fontSize: 14,
	},
	settingTitle: {
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		fontWeight: "bold",
		marginTop: 20,
	},
	settingItemArea: {
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	myInfoImgArea: {
		alignItems: "center",
	},
	myInfoImg: {
		width: 100,
		height: 100,
		borderRadius: 46,
		backgroundColor: "#FFF",
		overflow: "hidden",
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
		backgroundColor: "rgba(255,255,255,0.9)",
		borderRadius: 13,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
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
	myInfoCameraImg: {
		width: "60%",
	},
	settingInputArea: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	settingInput: {
		backgroundColor: "#f8f8f8",
		padding: 10,
		borderRadius: 10,
		fontSize: 16,
	},
	settingCrownListArea: {
		paddingLeft: 20,
		paddingRight: 20,
		flexGrow: 1,
		flexShrink: 1,
	},
	absoluteBtnBlank: {
		height: 70,
	},
	absoluteBtnArea: {
		width: "100%",
		padding: 20,
		paddingTop: 10,
		paddingBottom: 15,
		position: "absolute",
		bottom: 0,
	},
	absoluteBtn: {
		height: 50,
		backgroundColor: "#18A8C8",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	absoluteBtnText: {
		color: "#FFF",
		fontWeight: "bold",
		fontSize: 16,
	},
});
