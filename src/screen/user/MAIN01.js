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

import Swiper from 'react-native-swiper'

export default ({navigation}) => {
    return(
	<View style={styles.body}>
		<Swiper 
		style={[styles.wrapper]} 
		showsButtons={false} 
		loop={false} 
		index={1}
		onIndexChanged={() => {}}
		showsPagination={false}
		>
			<View style={styles.slide1}>
			<Text style={styles.text}>오늘뭐하지</Text>
			</View>
			<View style={styles.slide2}>
			<Text style={styles.text}>오늘뭐먹지</Text>
			</View>
      	</Swiper>
	</View>
	)
}

const styles = StyleSheet.create({
	body: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		overflow: 'visible'
	},
	wrapper: {
		width: '180%',
	},
	slide1: {
		width: '90%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#CAE8B2',
	},
	slide2: {
		width: '90%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F6EF50',
		left: '-10%',
	},
		text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	}
  })