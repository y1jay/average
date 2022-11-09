import React, {Component, useState, useEffect, useRef} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Dimensions,
} from 'react-native';

import Swiper from 'react-native-swiper'

export default ({navigation}) => {
	const winWidth = Dimensions.get("window").width;

	useEffect(() => {

	},[])

    return(
	<View style={styles.body}>
		<Swiper 
		style={[styles.wrapper, {borderWidth: 1}]} 
		showsButtons={false} 
		// loop={false} 
		index={0}
		onIndexChanged={() => {}}
		showsPagination={false}
		width={winWidth*0.9}
		// overflow={'visible'}
		scrollViewStyle={{overflow: 'visible'}} removeClippedSubviews={false}
		>
			<View style={styles.slide}>
				<View style={styles.slide1}>
					<Text style={styles.text}>오늘뭐하지</Text>
				</View>
			</View>
			<View style={styles.slide}>
				<View style={styles.slide2}>
					<Text style={styles.text}>오늘뭐먹지</Text>
				</View>
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
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	slide1: {
		width: '95%',
		height: '100%',
		backgroundColor: '#CAE8B2',
	},
	slide2: {
		width: '95%',
		height: '100%',
		backgroundColor: '#F6EF50',
	},
		text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	}
  })