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
	return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            setVisible={setModalVisible}
            >
            <View
                style={commonStyles.modalBody}>
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
				</Pressable>
                    <Text>유형검사</Text>
                    <View></View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBody: {
        backgroundColor: '#F8F8F8',
        flexGrow: 1,

    },
})