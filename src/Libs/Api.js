import axios from "axios";
import config from "./Config";
import Util from "./Util";
import { UserGetter, UserSetter, UserRemover } from "../User/UserInfo";

const get = async (url, params) => {
	// console.log("url=========>", url);
	// console.log("params=========>", params);
	const userInfo = await UserGetter();
	const deviceUuid = await Util.deviceUuid();
	let res = null;
	console.log("22222userINfo====>", userInfo);
	if (
		userInfo.uid != null &&
		userInfo.join_type != null &&
		userInfo.member_idx != null
	) {
		// console.log("AAAAA");
		const duplicate = await axios.get(
			`${config.apiUrl}/user/member/DuplaicateLogin`,
			{
				params: {
					//
					uid: userInfo.uid,
					join_type: userInfo.join_type,
					device_uuid: deviceUuid,
				},
			}
		);
		// console.log("duplicate ===>", duplicate.data);
		if (duplicate.data.CODE == 20) {
			let resonse = await axios.get(`${config.apiUrl}${url}`, {
				params,
			});
			res = resonse.data;
		} else {
			res = { CODE: -700, MSG: "중복로그인 되어 로그아웃 됩니다." };
			await UserRemover();
		}
	} else {
		res = { CODE: -999, MSG: "회원정보가 존재하지 않습니다." };
		await UserRemover();
	}
	return res;
};
const post = async (url, params) => {
	const userInfo = await UserGetter();
	const deviceUuid = await Util.deviceUuid();
	let res = null;
	console.log("userInfo====>>", userInfo);
	console.log(params, "@@@");
	if (
		userInfo.uid != null &&
		userInfo.join_type != null &&
		userInfo.member_idx != null
	) {
		const duplicate = await axios.get(
			`${config.apiUrl}/user/member/DuplaicateLogin`,
			{
				params: {
					uid: userInfo.uid,
					join_type: userInfo.join_type,
					device_uuid: deviceUuid,
				},
			}
		);
		if (duplicate.data.CODE == 20) {
			let response = await axios.post(`${config.apiUrl}${url}`, {
				params: params,
			});
			console.log(response, "@@@@");
			res = response.data;
		} else {
			res = { CODE: -700, MSG: "중복로그인 되어 로그아웃 됩니다." };
			await UserRemover();
		}
	} else {
		res = { CODE: -999, MSG: "회원정보가 존재하지 않습니다." };
		await UserRemover();
	}
	return res;
};

export default { get, post };
