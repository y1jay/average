import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserSetter = async (userInfo, token) => {
	let result;
	await AsyncStorage.setItem("user_fc", JSON.stringify(userInfo.free_count));
	await AsyncStorage.setItem("user_pc", JSON.stringify(userInfo.paid_count));
	await AsyncStorage.setItem("user_jt", userInfo.join_type);
	await AsyncStorage.setItem("user_mi", JSON.stringify(userInfo.member_idx));
	await AsyncStorage.setItem("user_sc", userInfo.state_code);
	await AsyncStorage.setItem("user_nick", userInfo.nick);
	await AsyncStorage.setItem("user_tk", token);
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
	data = {
		free_count: free_count,
		paid_count: paid_count,
		join_type: join_type,
		member_idx: member_idx,
		state_code: state_code,
		token: token,
		nick: nick,
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
};

module.exports = {
	UserSetter,
	UserGetter,
	UserRemover,
};
