import React, {Component} from 'react';

import {AppInit} from './utils/AppTor';

import {
  //USER
  MainScreen,
  ProfileScreen,
  OptionsScreen,
  AnotherPassengerScreen,
  HistoryScreen,
  AddAddressScreen,
  PaymentScreen,
  FaqScreen,
  FaqTextScreen,
  CommentScreen,
  TimeScreen,
  ChatScreen,
  DetailScreen,
  AddCardScreen,
  ContactToDriverScreen,
  SupportChatScreen,
  CarsScreen,
  DetailNewScreen,
  ChangeOrderScreen,
  CancelScreen,
  TrackScreen,
  HistoryPreorderScreen,
  DriverPreOrderScreen,
  //////////////////////

  //STARTS SCREEN
  LoadingScreen,
  AuthScreen,
  RegScreen,
  ///////////////
} from './screens';

import SwipeMenu from './SwipeMenu';
import 'react-native-gesture-handler';

export default AppInit({
  initScreen: 'LoadingScreen', //Старт экран
  screens: {
    LoadingScreen,
    AuthScreen,
    MainScreen,
    ProfileScreen,
    OptionsScreen,
    AnotherPassengerScreen,
    HistoryScreen,
    AddAddressScreen,
    PaymentScreen,
    FaqScreen,
    FaqTextScreen,
    CommentScreen,
    TimeScreen,
    ChatScreen,
    DetailScreen,
    AddCardScreen,
    ContactToDriverScreen,
    SupportChatScreen,
    CarsScreen,
    DetailNewScreen,
    ChangeOrderScreen,
    CancelScreen,
    TrackScreen,
    RegScreen,
    HistoryPreorderScreen,
    DriverPreOrderScreen,
  }, //Все экраны
  swipeMenu: <SwipeMenu />, //Свайп меню
  // globalFooter: ()=>{return <View style={{height:100, backgroundColor:'red'}}><Text>123</Text></View>} //Глобальный футер
});
