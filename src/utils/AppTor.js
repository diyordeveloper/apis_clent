import Page from './ui/Page';
import PageContent from './ui/PageContent';
import Navbar from './ui/Navbar';
import TabItem from './ui/TabItem';
import React, {Component, createRef} from 'react';
import NavbarItem from './ui/NavbarItem';
import Icon from './ui/Icon';
import {toJS} from 'mobx';
import Text from './ui/CustomText';
import Toolbar from './ui/Toolbar';
import {Provider} from 'mobx-react/native';
import Tabbar from './ui/Tabbar';

import {
  NativeModules,
  Dimensions,
  Keyboard,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {View, Alert} from 'react-native';

import DrawerLayout from 'react-native-drawer-layout';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import _ from 'lodash';
import ActionSheet from 'react-native-actionsheet-api';

import * as Stores from '../stores';
//import AppMetrica from 'react-native-appmetrica';
import {AppmetricaKey} from '../config';
import NotificationPopup from 'react-native-push-notification-popup';
//import OneSignal from 'react-native-onesignal';
import moment from 'moment';
import 'moment/min/locales';
import LoadingScreen from '../screens/Start/LoadingScreen';

import ScalingDrawer from 'react-native-scaling-drawer';

let {width, height} = Dimensions.get('window');

import {COLORS} from '../colors';

import {FrontView} from '../ui';
import {EventEmitter} from '../utils';
moment.locale('ru');

ActionSheet.show = (option, buttons) => {
  if (this.blockActionSheet) return;

  this.blockActionSheet = true;
  ActionSheet.showActionSheetWithOptions(option, buttons);
  setTimeout(() => {
    this.blockActionSheet = false;
  }, 1000);
};

//--------- App colors
console.log('APP COLORS:');
let {
  TAB_ICON_ACTIVE_COLOR,
  TAB_ICON_INACTIVE_COLOR,
  TABBAR_BACK_COLOR,
  TABBAR_BORDER_COLOR,
  TAB_LABEL_ACTIVE_COLOR,
  TAB_LABEL_INACTIVE_COLOR,
} = COLORS;

//--------- App stores

let timeOutLoadScreen = {};

const drawer = createRef();

//--------- Icons for tabbar
const TabIcon = ({title, focused, iconName}) => {
  return (
    <Icon
      name={iconName}
      size={22}
      color={focused ? TAB_ICON_ACTIVE_COLOR : TAB_ICON_INACTIVE_COLOR}
    />
  );
};

const AppInit = data => {
  let defaultScalingDrawerConfig = {
    scalingFactor: 0.9,
    minimizeFactor: 0.8,
    swipeOffset: 20,
  };

  console.disableYellowBox = true;
  console.log(data.screens);

  console.log(NativeModules);
  window.NativeModules = NativeModules;

  return (App = () => {
    return (
      <Provider {...Stores}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ActionSheet />
          <NotificationPopup ref={ref => (this.popup = ref)} />
          <ScalingDrawer
            ref={drawer}
            content={data.swipeMenu}
            {...defaultScalingDrawerConfig}
            // frontStyle={{
            //   elevation: 40,
            //   borderRadius: 48,
            //   shadowColor: '#000',
            //   shadowOffset: {
            //     width: 0,
            //     height: -15,
            //   },
            //   shadowOpacity: 0.08,
            //   shadowRadius: 31.0,
            // }}
            onOpen={() => {
              EventEmitter.execute('menu_opened');
            }}
            onClose={() => {
              EventEmitter.execute('menu_closed');
            }}>
            <FrontView>
              <Router>
                <Stack key="root">
                  {_.map(data.screens, (name, key) => {
                    return (
                      <Scene
                        initial={key == data.initScreen ? true : false}
                        hideNavBar
                        key={key}
                        component={name}
                      />
                    );
                  })}
                </Stack>
              </Router>
            </FrontView>
          </ScalingDrawer>
        </View>
      </Provider>
    );
  });
};

const NullControl = (val, result) => {
  if (val != undefined && val != 'null' && val != '')
    return result ? val : true;
  else return result ? result : false;
};

const sendToast = (msg, title) => {
  this.popup.show({
    title: title,
    body: msg,
  });
};

const declOfNum = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};

const goBack = refresh => {
  Actions.pop();
  if (refresh)
    setTimeout(() => {
      Actions.refresh({key: Math.random()});
    }, 500);
};

const refreshScreen = () => {
  Actions.refresh({key: Math.random()});
};

const LoadScreen = (screen, props, main) => {
  console.log('<-----' + screen + '------->');

  if (timeOutLoadScreen[screen]) return;

  timeOutLoadScreen[screen] = true;
  if (!main) {
    if (drawer.current) if (drawer.current.state.isOpen) drawer.current.close();
    Actions.push(screen, props || {});
  } else {
    if (drawer.current) if (drawer.current.state.isOpen) drawer.current.close();
    Actions.reset(screen, props || {});
  }

  //  AppMetrica.reportEvent(screen);

  Actions.drawerClose();

  this.setTimeout(() => {
    timeOutLoadScreen[screen] = false;
  }, 1000);
};

const openSwipeMenu = () => {
  Keyboard.dismiss();
  if (drawer.current) drawer.current.open();
};

const closeSwipeMenu = () => {
  Keyboard.dismiss();
  if (drawer.current) drawer.current.close();
};

const parsePhone = phone => {
  let temp = phone;
  temp = temp.replace(/\(/g, '');
  temp = temp.replace(/\)/g, '');
  temp = temp.replace(/ /g, '');
  temp = temp.replace(/-/g, '');
  return temp;
};

const fetchDirectionInfo = props => {
  const fetchRoute = async (
    directionsServiceBaseUrl,
    origin,
    waypoints,
    destination,
    apikey,
    mode,
    language,
    region,
    precision,
    timePrecision,
    channel,
  ) => {
    // Define the URL to call. Only add default parameters to the URL if it's a string.
    let url = directionsServiceBaseUrl;
    if (typeof directionsServiceBaseUrl === 'string') {
      url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apikey}&mode=${mode.toLowerCase()}&language=${language}&region=${region}`;
      if (timePrecision) {
        url += `&departure_time=${timePrecision}`;
      }
      if (channel) {
        url += `&channel=${channel}`;
      }
    }

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.status !== 'OK') {
        const errorMessage =
          json.error_message || json.status || 'Unknown error';
        return Promise.reject(errorMessage);
      }

      if (json.routes.length) {
        const route = json.routes[0];
        return Promise.resolve(route);
      } else {
        return Promise.reject();
      }
    } catch (err) {
      return Promise.reject(`Error on GMAPS route request: ${err}`);
    }
  };

  let {
    origin: initialOrigin,
    destination: initialDestination,
    waypoints: initialWaypoints = [],
    apikey,
    onStart,
    onReady,
    mode = 'DRIVING',
    language = 'en',
    optimizeWaypoints,
    splitWaypoints,
    directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json',
    region,
    precision = 'low',
    timePrecision = 'none',
    channel,
    onSuccess = noop,
    onError = noop,
  } = props;

  if (!apikey) {
    console.warn(`MapViewDirections Error: Missing API Key`); // eslint-disable-line no-console
    return;
  }

  if (!initialOrigin || !initialDestination) {
    return;
  }

  const timePrecisionString = timePrecision === 'none' ? '' : timePrecision;

  // Routes array which we'll be filling.
  // We'll perform a Directions API Request for reach route
  const routes = [];

  // We need to split the waypoints in chunks, in order to not exceede the max waypoint limit
  // ~> Chunk up the waypoints, yielding multiple routes
  if (
    splitWaypoints &&
    initialWaypoints &&
    initialWaypoints.length > WAYPOINT_LIMIT
  ) {
    // Split up waypoints in chunks with chunksize WAYPOINT_LIMIT
    const chunckedWaypoints = initialWaypoints.reduce(
      (accumulator, waypoint, index) => {
        const numChunk = Math.floor(index / WAYPOINT_LIMIT);
        accumulator[numChunk] = [].concat(
          accumulator[numChunk] || [],
          waypoint,
        );
        return accumulator;
      },
      [],
    );

    // Create routes for each chunk, using:
    // - Endpoints of previous chunks as startpoints for the route (except for the first chunk, which uses initialOrigin)
    // - Startpoints of next chunks as endpoints for the route (except for the last chunk, which uses initialDestination)
    for (let i = 0; i < chunckedWaypoints.length; i++) {
      routes.push({
        waypoints: chunckedWaypoints[i],
        origin:
          i === 0
            ? initialOrigin
            : chunckedWaypoints[i - 1][chunckedWaypoints[i - 1].length - 1],
        destination:
          i === chunckedWaypoints.length - 1
            ? initialDestination
            : chunckedWaypoints[i + 1][0],
      });
    }
  }

  // No splitting of the waypoints is requested/needed.
  // ~> Use one single route
  else {
    routes.push({
      waypoints: initialWaypoints,
      origin: initialOrigin,
      destination: initialDestination,
    });
  }

  // Perform a Directions API Request for each route
  Promise.all(
    routes.map((route, index) => {
      let {origin, destination, waypoints} = route;

      if (origin.latitude && origin.longitude) {
        origin = `${origin.latitude},${origin.longitude}`;
      }

      if (destination.latitude && destination.longitude) {
        destination = `${destination.latitude},${destination.longitude}`;
      }

      waypoints = waypoints
        .map(waypoint =>
          waypoint.latitude && waypoint.longitude
            ? `${waypoint.latitude},${waypoint.longitude}`
            : waypoint,
        )
        .join('|');

      if (optimizeWaypoints) {
        waypoints = `optimize:true|${waypoints}`;
      }

      if (index === 0) {
        onStart &&
          onStart({
            origin,
            destination,
            waypoints: initialWaypoints,
          });
      }

      return fetchRoute(
        directionsServiceBaseUrl,
        origin,
        waypoints,
        destination,
        apikey,
        mode,
        language,
        region,
        precision,
        timePrecisionString,
        channel,
      )
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(errorMessage => {
          return Promise.reject(errorMessage);
        });
    }),
  )
    .then(results => {
      console.log(results);
      onSuccess(results);
    })
    .catch(errorMessage => {
      console.warn(`MapViewDirections Error: ${errorMessage}`); // eslint-disable-line no-console
      onError();
    });
};

const callPhone = phone => {
  Linking.openURL(`tel:${phone}`);
  // Linking.openSettings();
};

const sendSms = (phone, text) => {
  let string = `sms:${phone}${Platform.OS === 'ios' ? '&' : '?'}body=${''}`;
  if (text) string = string + text;
  console.log(string);
  Linking.openURL(string);
};

export const getPaymentName = number => {
  let doubleNumber = number[0] + number[1];

  switch (number[0]) {
    case '2':
      return 'Мир';
    case '3':
      if (doubleNumber == 30 || doubleNumber == 36 || doubleNumber == 38) {
        return 'Diners Club';
      } else if (doubleNumber == 31 || doubleNumber == 35) {
        return 'JCB International';
      } else if (doubleNumber == 34 || doubleNumber == 37) {
        return 'American Express';
      }
    case '4':
      return 'Visa';
    case '5':
      if (
        doubleNumber == 50 ||
        doubleNumber == 56 ||
        doubleNumber == 57 ||
        doubleNumber == 58
      ) {
        return 'Maestro';
      } else if (
        doubleNumber == 51 ||
        doubleNumber == 52 ||
        doubleNumber == 53 ||
        doubleNumber == 54 ||
        doubleNumber == 55
      ) {
        return 'MasterCard';
      }
    case '6':
      if (doubleNumber == 60) {
        return 'Discover';
      } else if (doubleNumber == 62) {
        return 'China UnionPay';
      } else if (doubleNumber == 63 || doubleNumber == 67) {
        return 'China UnionPay';
      }
    case '7':
      return 'УЭК';
    default:
      return '';
  }
};

export {
  AppInit,
  LoadScreen,
  ActionSheet,
  NullControl,
  refreshScreen,
  Toolbar,
  sendToast,
  Text,
  goBack,
  openSwipeMenu,
  closeSwipeMenu,
  Page,
  PageContent,
  Navbar,
  NavbarItem,
  Icon,
  Tabbar,
  TabItem,
  parsePhone,
  fetchDirectionInfo,
  callPhone,
  sendSms,
};
