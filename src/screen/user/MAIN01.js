import React, {Component, useState, useEffect, useRef} from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Animated,
} from 'react-native';

import Swiper from 'react-native-swiper'
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';


export default ({navigation}) => {
	const winWidth = Dimensions.get("window").width;

	const bgColorList = ['#CAE8B2', '#F6EF50'];
	const [bgColorIndex, setBbgColorIndex] = useState(true)

    return(
	<AnimatedBackgroundColorView  
		color={bgColorList[bgColorIndex ? 0 : 1]}
		initialColor={bgColorList[bgColorIndex ? 1 : 0]}
		duration={300}
		style={styles.body}
		>
		<Swiper 
		style={[styles.wrapper, {borderWidth: 1}]} 
		showsButtons={false} 
		loop={false} 
		index={0}
		onIndexChanged={() => {setBbgColorIndex(!bgColorIndex)}}
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
	</AnimatedBackgroundColorView>
	)
}

const styles = StyleSheet.create({
	// #CAE8B2
	// #F6EF50
	body: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	slide: {
		marginTop: '10%',
		height: '90%',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		// backgroundColor: '#fff',
	},
	slide1: {
		width: '92%',
		height: '90%',
		borderWidth:1
	},
	slide2: {
		width: '92%',
		height: '90%',
		borderWidth:1
	},
		text: {
		fontSize: 30,
		fontWeight: 'bold'
	}
  })