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
	const [swipeIndex, setSwipeIndex] = useState(0)

    return(
	<AnimatedBackgroundColorView  
		color={bgColorList[swipeIndex]}
		initialColor={swipeIndex == 0 ? bgColorList[1] : bgColorList[0]}
		duration={500}
		style={styles.body}
		>
		<Swiper 
		style={[styles.wrapper]} 
		showsButtons={false} 
		loop={false} 
		index={0}
		onIndexChanged={(index) => {setSwipeIndex(index)}}
		showsPagination={false}
		width={winWidth*0.9}
		// overflow={'visible'}
		scrollViewStyle={{overflow: 'visible'}} removeClippedSubviews={false}
		>
			<View style={styles.slideItem}>
				<View style={styles.contentsArea}>
					<Text style={styles.text}>오늘뭐하지</Text>
				</View>
			</View>
			<View style={styles.slideItem}>
				<View style={styles.contentsArea}>
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
		alignItems: 'center',
		justifyContent: 'center',
	},
	slideItem: {
		marginTop: '10%',
		height: '90%',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	contentsArea: {
		width: '92%',
		height: '90%',
		backgroundColor: '#fff',
		borderRadius: 10,
		alignItems:'center',
		justifyContent: 'center'
	},
  })