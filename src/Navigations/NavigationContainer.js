/**
 * 네비게이션 컨트롤러
 */
 import React, {useState, useEffect, useRef} from 'react';
 import {AppState, View, Text, Alert, Linking, Platform, NativeModules} from 'react-native';
 import {Link, NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
 
 import MainNavigation from '../Navigations/MainNavigation';
 import BottomNav from '../Components/BottomNav';
 
//  import LOAD001000 from '~/Screens/User/LOAD001000';
//  import NOTI001001 from '~/Screens/User/NOTI001001';
 // import TEST003001 from '~/Screens/User/TEST003001';
 
 export default () => {
     const appState = useRef(AppState.currentState);
     const [appStateVisible, setAppStateVisible] = useState(appState.current);
 
     const [isLoading, setIsLoading] = useState(true);
 
     const [isInspection, setIsInspection] = useState(false);
     const [inspectionMessage, setInspectionMessage] = useState(''); // 점검시간 내용
 
     const [visibleCustomSimpleAlert, setVisibleCustomSimpleAlert] = useState(false); //  모달 생성
     const [visibleCustomConfirm, setVisibleCustomConfirm] = useState(false); //  모달 생성
     const [netInfo, setNetInfo] = useState(true);

     const [store, setStore] = useState(''); // 각 플랫폼 별 스토어경로
     const [visibleCustomConfirmCodePush, setVisibleCustomConfirmCodePush] = useState(false); // 앱 업데이트 확인 모달
     const navigationRef = useNavigationContainerRef();
     const [confirmText, setConfirmText] = useState('');
     const [codePushUpdate, setCodePushUpdate] = useState(false);
  
  
         return (
             <NavigationContainer
                 ref={navigationRef}
                 onReady={() => {}}
                 onStateChange={() => {setIsLoading(true);
                 }}>
                 <MainNavigation />
                 {/* <BottomNav/> */}
             </NavigationContainer>
         );
 };
 
 