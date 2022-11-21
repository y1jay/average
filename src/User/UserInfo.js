import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserSetter = async (userInfo, token) => {
	let result;
	if (userInfo.free_count != undefined && userInfo.free_count != null) {
		await AsyncStorage.setItem(
			"user_fc",
			JSON.stringify(userInfo.free_count)
		);
	}
	if (userInfo.paid_count != undefined && userInfo.paid_count != null) {
		await AsyncStorage.setItem(
			"user_pc",
			JSON.stringify(userInfo.paid_count)
		);
	}
	if (userInfo.join_type != undefined && userInfo.join_type != null) {
		await AsyncStorage.setItem("user_jt", userInfo.join_type);
	}
	if (userInfo.member_idx != undefined && userInfo.member_idx != null) {
		await AsyncStorage.setItem(
			"user_mi",
			JSON.stringify(userInfo.member_idx)
		);
	}
	if (userInfo.state_code != undefined && userInfo.state_code != null) {
		await AsyncStorage.setItem("user_sc", userInfo.state_code);
	}
	if (userInfo.nick != undefined && userInfo.nick != null) {
		await AsyncStorage.setItem("user_nick", userInfo.nick);
	}
	if (token != undefined && token) {
		await AsyncStorage.setItem("user_tk", token);
	}
	if (userInfo.crown != undefined && userInfo.crown != null) {
		await AsyncStorage.setItem("crown", JSON.stringify(userInfo.crown));
	}

	if (userInfo == null) {
		result = 10;
	} else if (token == null) {
		result = 10;
	} else {
		result = 20;
	}

	return result;
};
export const UserGetter = async () => {
	let data = {};

	let free_count = await AsyncStorage.getItem("user_fc");
	let paid_count = await AsyncStorage.getItem("user_pc");
	let join_type = await AsyncStorage.getItem("user_jt");
	let member_idx = await AsyncStorage.getItem("user_mi");
	let state_code = await AsyncStorage.getItem("user_sc");
	let token = await AsyncStorage.getItem("user_tk");
	let nick = await AsyncStorage.getItem("user_nick");
	let crown = await AsyncStorage.getItem("crown");
	data = {
		free_count: free_count,
		paid_count: paid_count,
		join_type: join_type,
		member_idx: member_idx,
		state_code: state_code,
		token: token,
		nick: nick,
		crown: crown,
	};
	return data;
};
export const UserRemover = async () => {
	await AsyncStorage.removeItem("user_fc");
	await AsyncStorage.removeItem("user_pc");
	await AsyncStorage.removeItem("user_jt");
	await AsyncStorage.removeItem("user_mi");
	await AsyncStorage.removeItem("user_sc");
	await AsyncStorage.removeItem("user_tk");
	await AsyncStorage.removeItem("user_nick");
};

module.exports = {
	UserSetter,
	UserGetter,
	UserRemover,
};
