// import config from "~/Libs/Config";
// import moment from "moment-timezone";
import DeviceInfo from "react-native-device-info";
/**
 * 숫자형 콤마 표시
 * @param val Object
 * @returns string
 */
// const comma = (val) => {
// 	if (val || val == 0) {
// 		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// 	} else {
// 		return "-";
// 	}
// };

// /**
//  * JSON Object -> Query String 변환
//  * @param json object
//  * @returns query string
//  */
// export const json2query = (jsonObj) => {
// 	const reducer = (obj, parentPrefix = null) => (prev, key) => {
// 		const val = obj[key];
// 		key = encodeURIComponent(key);
// 		const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key;

// 		if (val == null || typeof val === "function") {
// 			prev.push(`${prefix}=`);
// 			return prev;
// 		}

// 		if (["number", "boolean", "string"].includes(typeof val)) {
// 			//prev.push(`${prefix}=${encodeURIComponent(val)}`);
// 			prev.push(`${prefix}=${val}`);
// 			return prev;
// 		}

// 		prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join("&"));
// 		return prev;
// 	};

// 	return Object.keys(jsonObj).reduce(reducer(jsonObj), []).join("&");
// };

// /**
//  * 랜덤 문자열 생성
//  * @param
//  * @returns string
//  */
// const setStateCode = () => {
// 	return Math.random().toString(36).substring(2, 11);
// };

// /**
//  * 현재 시간
//  * @param
//  * @returns YYYYMMDDHHmmssSSS
//  */
// export const getNow = () => {
// 	const m = moment.tz("Asia/Seoul");

// 	return m.format("YYYYMMDDHHmmssSSS");
// };
export const deviceUuid = async () => {
	const uuid = await DeviceInfo.getUniqueId();
	return uuid;
};
export const isEmulator = async () => {
	const eamulator = await DeviceInfo.isEmulator();
	return eamulator;
};
export default {
	// comma,
	// json2query,
	// setStateCode,
	// getNow,
	deviceUuid,
	isEmulator,
};
