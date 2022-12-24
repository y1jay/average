import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    // 공통 스타일
	body: {
		width: '100%',
		flexGrow: 1,
	},
    wh_100: {
        width: '100%',
        height: '100%'
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    // 공통 텍스트
    textWhite: {
        color: '#FFF'
    },
    // 배너 광고 영역
    bannerArea: {
        height: 40,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // 하단 네비게이션
    bottomNav: {
        height: 50,
        backgroundColor: "#ffffff",
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    bottomNavBtn: {
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.3
    },
    bottomNavBtnHere: {
        opacity:1,
    },

    // MEMB01 | 로그인
    loginTopArea: {
		width: '100%',
		flexGrow: 4,
		alignItems: 'center',
		justifyContent: 'center',
    },
    loginTopLogo: {
        marginBottom: 15
    },
    loginTopText:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#212121'
    },
    loginExplain: {
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 10
    },
    loginSnsArea: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginSnsBtn: {
        width:'80%',
        height: 45,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
        overflow: 'hidden',
    },
    loginSnsBtnIcon:{
        marginRight: 10,
    },
    loginSnsBtnText: {
        width: 120,
        color: '#FFF',
    },
    customerServiceArea: {
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    customerService: {
        height: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // 모달
	modalBody: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalArea: {
		width: "90%",
		backgroundColor: "#F8F8F8",
		borderRadius: 15,
		// padding: "5%",
	},
	modalTitle: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
		borderBottomWidth: 1,
		borderColor: '#E8E5E5',
		padding: 12,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15
	},
})
