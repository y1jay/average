import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

// import Video from 'react-native-video';
// import DeviceInfo from 'react-native-device-info';

// import authStorage from '~/Libs/AuthStorage';
// import api from '~/Libs/Api';

// import CustomConfirmCodePush from '~/Components/Modals/CustomConfirmCodePush';
// import {useUserContext} from '~/Contexts/UserContext';

// import codePush from 'react-native-code-push';

let isDebug = false;

const getDeviceInfo = () => {
	// let buildNumber = DeviceInfo.getBuildNumber();
	// let bundleId = DeviceInfo.getBundleId();
	// let model = DeviceInfo.getModel();
	// let systemName = DeviceInfo.getSystemName();
	// let systemVersion = DeviceInfo.getSystemVersion();
	// let uniqueId = DeviceInfo.getUniqueId();
	// let version = DeviceInfo.getVersion();

	// const result = api.post({
	// 	url: '/user/stat/appLaunchHistoryInsert',
	// 	params: {buildNumber, bundleId, model, systemName, systemVersion, uniqueId, version},
	// });
};

export default ({}) => {
    const [visibleCustomConfirmCodePush, setVisibleCustomConfirmCodePush] = useState(false); // 앱 업데이트 확인 모달

	useEffect(() => {
		const Load = async () => {
			// const storageInfo = await authStorage.get();

			// 앱 런쳐 시, 디바이스 정보 조회 및 히스토리
			getDeviceInfo();

			// if (storageInfo) {
			// 	const result = await api.post({url: '/user/auth/reLogin'});
			// 	await setUser(null);

			// 	if (result) {
			// 		await setUser(result);
			// 		await authStorage.set(result);
			// 	} else {
			// 		await setUser(null);
			// 		await authStorage.clear();
			// 	}
			// }
		};

		Load();
	}, []);

	return (
		<View style={{flex: 1}}>
			{/* <Video
				source={require('../../Images/splash.mp4')}
				style={styles.fullScreen}
				paused={false} // 재생/중지 여부
				resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
				repeat={true} // video가 끝나면 다시 재생할 지 여부
				onAnimatedValueUpdate={() => {}}
			/> */}
			{/* <CustomConfirmCodePush
				visible={visibleCustomConfirmCodePush}
				setVisible={setVisibleCustomConfirmCodePush}
			/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#22408F',
	},
	imageTopArea: {
		width: '100%',
		height: '86%',
		flexShrink: 1,
	},
	imageBottomArea: {
		width: '100%',
		height: '100%',
		flexShrink: 1,
	},
	responseImage: {
		width: '50%',
		height: 200,
		// marginLeft: '7%',
	},
	fullScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
