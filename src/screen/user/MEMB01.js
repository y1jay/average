import React, {Component, useState, useEffect, useRef} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Button,
	ImageBackground,
	Image,
	Pressable,
	Modal,
	FlatList,
	Platform,
	ActivityIndicator,
} from 'react-native';

export default ({navigation}) => {
    const test = ''
    return(
	<View style={styles.body}>
		<View style={styles.loginTopArea}><Text>로그인 화면입니다</Text></View>
		<Pressable 
			onPress={() => {alert('애플')}}
			style={styles.loginBtn}>
			<Text>애플</Text>
		</Pressable>
		<Pressable 
			onPress={() => {}}
			style={styles.loginBtn}>
			<Text>네이버</Text>
		</Pressable>
		<Pressable 
			onPress={() => {}}
			style={styles.loginBtn}>
			<Text>카카오</Text>
		</Pressable>
		<Pressable 
			onPress={() => {}}
			style={styles.loginBtn}>
			<Text>인스타</Text>
		</Pressable>
	</View>
	)
}


const styles = StyleSheet.create({
	body: {
		width: '100%',
		borderWidth: 1,
		borderColor: 'red',
		flexGrow: 1,
	},
	loginTopArea: {
		width: '100%',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginBtn: {
		width: '100%',
		height: '15%',
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})