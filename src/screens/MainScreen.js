import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  PixelRatio,
  AppState,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  Page,
  openSwipeMenu,
  PageContent,
  parsePhone,
  LoadScreen,
  sendToast,
} from '../utils/AppTor';

import NavbarButton from '../ui/NavbarButton';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {isIphoneX} from 'react-native-push-notification-popup/src/utils';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  AddressModal,
  OrderModal,
  DriverModal,
  WaitDriverModal,
  OptionsModal,
} from '../modals';
import {KeyboardAvoidingChat} from '../ui';
import {observer, inject} from 'mobx-react/native';
import Geolocation from '@react-native-community/geolocation';
import {toJS} from 'mobx';
import {throttle, debounce, noop} from 'lodash';
import PointMarker from '../ui/Map/PointMarker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapViewDirections from '../../react-native-maps-directions-master';
import {GOOGLE_MAPS_APIKEY} from '../config';
import {appStore} from '../stores';
import DriverMarker from '../ui/Map/DriverMarker';
import Sound from 'react-native-sound';
import {COLORS} from '../colors';

let {width, height} = Dimensions.get('window');

const HEIGHT_ORDER_MODAL = 470;
const HEIGHT_ADDRESS_MODAL = 210;
const HEIGHT_DRIVER_MODAL = 200;

@inject('appStore', 'orderStore', 'userStore')
@observer
export default class MainScreen extends Component {
  state = {
    controls: true,
    bottomMargin: 0,
    addressToObject: undefined,
    openedModal: 'addressModal',
    // appState: 'active',
    orderGeodata: undefined,
    visibleOptions: false,
    allowAnimate: true,
  };

  componentDidMount() {
    // AppState.addEventListener("change", this.handleAppStateChange);
    if (this.props.orderStore.orderActive === false) this.fetchCurrentOrder();
    this.props.userStore.fetchPreorderHistory();
  }

  fetchCurrentOrder = () => {
    const {orderCoordinates} = this.props.orderStore;
    const successCallback = order => {
      this.setState({openedModal: 'driverModal'});
      this.startOrderChannel();
      this.addressModal.wrappedInstance.close();
      this.driverModal.wrappedInstance.open();
    };
    this.props.orderStore.fetchCurrentOrder(successCallback);
  };

  // handleAppStateChange = (nextAppState) => {
  //   console.log('APP_STATE_CHANGE => ', AppState.currentState, nextAppState);
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === "active") {
  //     // this.onMapReady();
  //   }
  //   this.setState({ appState: nextAppState });
  // }

  // componentWillUnmount() {
  //   AppState.removeEventListener("change", this.handleAppStateChange);
  // }

  onMapReady = () => {
    console.log('mapReady');
    const {myCoords} = this.props.appStore;

    const getCachesCoords = () => {
      if (myCoords) {
        if (this.mapRef && this.mapRef.animateCamera)
          this.mapRef.animateCamera({
            center: {
              latitude: myCoords.latitude,
              longitude: myCoords.longitude,
            },
            zoom: 17,
          });
        this.handleChangeRegion({
          latitude: myCoords.latitude,
          longitude: myCoords.longitude,
        });
      }
    };

    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Разрешение геолокации',
            message:
              'Для корректной работы приложения требуется разрешить использование геолокации.',
            buttonNeutral: 'Спросить позже',
            buttonNegative: 'Не разрешать',
            buttonPositive: 'Разрешить',
          },
        ).then(granted => {
          console.log(granted, PermissionsAndroid.RESULTS.GRANTED);
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('You can use the camera');
            getCachesCoords();
            this.getCurrentPosition();
          } else {
            // console.log('Camera permission denied');
            getCachesCoords();
            this.getCurrentPosition();
          }
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCachesCoords();
      this.getCurrentPosition();
    }
  };

  handleGetCurrentGeoposition = throttle(() => {
    if (this.state.allowAnimate === false) {
      this.setState({allowAnimate: true}, () => {
        this.getCurrentPosition(0);
      });
    } else {
      this.getCurrentPosition(0);
    }
  }, 1000);

  getCurrentPosition = (timer = 0) => {
    console.log('get position');
    const successCallback = ({coords: {latitude, longitude, heading}}) => {
      console.log(latitude, longitude);
      this.props.appStore.setMyCoords({latitude, longitude, heading});

      if (this.state.allowAnimate === true) {
        if (this.mapRef && this.mapRef.animateCamera)
          this.mapRef.animateCamera({
            center: {
              latitude,
              longitude,
            },
            zoom: 17,
          });

        if (
          this.state.openedModal != 'driverModal' &&
          this.state.openedModal != 'waitDriverModal'
        )
          this.handleChangeRegion({latitude, longitude});
      }
    };
    const errorCallback = error => {
      console.log('error coords => ', error);
      if (timer < 5) {
        setTimeout(() => {
          this.getCurrentPosition(timer + 1);
        }, 1000);
      }
      // if (this.mapRef && this.mapRef.animateCamera) this.mapRef.animateCamera({
      //   center: {
      //     latitude: this.props.appStore.init_region.latitude,
      //     longitude: this.props.appStore.init_region.longitude
      //   }
      // });
    };
    const options = {
      timeout: 30000,
      // maximumAge: 3600000,
      maximumAge: 0,
      // enableHighAccuracy: true
    };
    Geolocation.getCurrentPosition(successCallback, errorCallback, options);
  };

  onPressOrder = () => {
    const {
      setActiveOrder,
      orderCoordinates,
      setOrderCoordinates,
      setOrderActive,
      setDriverSearchState,
      cars,
      orderedUser,
      inning_at,
      tariff_id,
      comment,
      selectedOptions,
    } = this.props.orderStore;
    const {phone, full_name, payment_method} = this.props.appStore.profile;

    const successCallback = data => {
      console.log(data);
      if (data.type === 1) {
        this.handleCancelOrder();
        sendToast('Предварительный заказ создан.', 'Предварительный заказ');
        this.props.userStore.setPreorderTotal(
          this.props.userStore.preorderHistory.total_orders + 1,
        );
        return;
      }
      this.orderModal.wrappedInstance.close();
      this.setState({
        openedModal: 'waitDriverModal',
        bottomMargin: 200,
        addressToObject: undefined,
        controls: true,
      });
      this.waitDriverModal.wrappedInstance.open(data.cost, data.payment_method);

      const {from, to} = orderCoordinates;
      let coords = [];
      if (from.address) coords.push({latitude: from.lat, longitude: from.lng});
      if (to.length > 0)
        to.forEach(item => {
          coords.push({latitude: +item.lat, longitude: +item.lng});
        });
      console.log(coords);

      setActiveOrder(data);
      setDriverSearchState(true);

      this.startOrderChannel();

      setTimeout(() => {
        if (Platform.OS === 'ios') {
          this.mapRef.fitToCoordinates(coords, {
            edgePadding: {
              top: (height - 200) * 0.23,
              right: 100,
              bottom: (height - 200) * 0.23,
              left: 100,
            },
            animated: true,
          });
        } else {
          if (this.mapRef && this.mapRef.fitToCoordinates)
            this.mapRef.fitToCoordinates(coords, {
              edgePadding: {
                top: PixelRatio.getPixelSizeForLayoutSize(
                  (height - 200) * 0.23,
                ),
                right: PixelRatio.getPixelSizeForLayoutSize(100),
                bottom: PixelRatio.getPixelSizeForLayoutSize(
                  (height - 200) * 0.23,
                ),
                left: PixelRatio.getPixelSizeForLayoutSize(100),
              },
              animated: true,
            });
        }
      }, 500);
    };

    const errorCallback = () => {
      setOrderActive(false);

      let newCoords = {...orderCoordinates};
      newCoords.to.pop();
      setOrderCoordinates(newCoords);

      this.orderModal.wrappedInstance.handleErrorOrder();
    };

    Keyboard.dismiss();

    let newCoords = {...orderCoordinates};
    newCoords.to.push(this.state.addressToObject);
    setOrderCoordinates(newCoords);

    setOrderActive(true);

    let cost = this.props.appStore.tariffs.find(
      item => item.price_id == tariff_id,
    ).cost;

    let sendedData = {
      cars: cars,
      phone: orderedUser.phone ? parsePhone(orderedUser.phone) : phone,
      name: orderedUser.name || full_name,
      type: inning_at ? 1 : 2,
      inning_at: inning_at,
      payment_method: payment_method || 1,
      price_id: tariff_id,
      cost: cost,
      total_distance: this.props.appStore.total_distance,
      total_minutes: this.props.appStore.total_duration,
      comment: comment || '',
      driver_id: null,
      from: toJS(orderCoordinates).from,
      to: toJS(orderCoordinates).to,
      options: toJS(selectedOptions),
    };

    console.log(sendedData);

    this.props.orderStore.createNewOrder(sendedData, {
      successCallback,
      errorCallback,
    });
  };

  handlePressAddress = () => {
    const {orderCoordinates, setOrderCoordinates, orderCoordsArray} =
      this.props.orderStore;
    this.setState({controls: false, openedModal: 'orderModal'}, () => {
      Keyboard.dismiss();

      let newCoords = {...orderCoordinates};
      newCoords.from = this.state.addressToObject;
      setOrderCoordinates(newCoords);

      this.addressModal.wrappedInstance.close();
      this.orderModal.wrappedInstance.open();

      this.setState({bottomMargin: 300, addressToObject: undefined});
    });
  };

  handleChangeAddress = address => {
    console.log(address);
    const {lat, lng} = address.geometry.location;
    this.setState({
      addressToObject: {address: address.formatted_address, lat: lat, lng: lng},
    });
    if (this.mapRef && this.mapRef.animateCamera)
      this.mapRef.animateCamera({
        center: {
          latitude: lat,
          longitude: lng,
        },
        zoom: 17,
      });
  };

  handleChangeRegion = debounce(coords => {
    console.log(coords);
    const successCallback = json => {
      console.log('json geocode', json, json.results[0]);
      if (this.state.openedModal === 'orderModal') {
        let coordinates = this.props.orderStore.orderCoordsArray.map(item => {
          return {lat: item.lat + '', lng: item.lng + ''};
        });

        coordinates.push({
          lat: coords.latitude + '',
          lng: coords.longitude + '',
        });
        this.props.appStore.setTariffsLoading(true);
        this.props.appStore.fetchGeoRegionTariffs({coordinates});
        // this.props.appStore.searchRegionToTariff(json.results[0]);
      }
      console.log({
        address: json.results[0].formatted_address,
        lat: coords.latitude,
        lng: coords.longitude,
      });
      this.setState({
        addressToObject: {
          address: json.results[0].formatted_address,
          lat: coords.latitude,
          lng: coords.longitude,
        },
      });
      if (this[this.state.openedModal].wrappedInstance.handleInput)
        this[this.state.openedModal].wrappedInstance.handleInput(
          json.results[0].formatted_address,
          false,
        );
    };
    const errorCallback = error => {
      console.log(error);
    };

    let string = coords.latitude + ',' + coords.longitude;
    const params = {
      string,
      type: 'latlng',
    };
    if (
      this.state.openedModal != 'driverModal' &&
      this.state.openedModal != 'waitDriverModal'
    )
      this.props.appStore.fetchGeocode(params, {
        successCallback,
        errorCallback,
      });
  });

  handlePlusAddress = () => {
    const {orderCoordinates, setOrderCoordinates} = this.props.orderStore;

    let newCoords = {...orderCoordinates};
    newCoords.to.push(this.state.addressToObject);
    setOrderCoordinates(newCoords);

    this.setState({addressToObject: undefined});
  };

  handleCancelOrder = (waitModal = false) => {
    const {
      setOrderActive,
      clearOrderInfo,
      setDriverSearchState,
      unsubscribeActiveOrder,
      setActiveOrder,
    } = this.props.orderStore;
    this.setState(
      {
        bottomMargin: 0,
        addressToObject: undefined,
        openedModal: 'addressModal',
        controls: true,
        orderGeodata: undefined,
      },
      () => {
        if (waitModal === true) {
          this.driverModal.wrappedInstance.close();
          unsubscribeActiveOrder();
        } else {
          this.orderModal.wrappedInstance.close();
        }
        this.addressModal.wrappedInstance.open();

        setActiveOrder({});
        setDriverSearchState(false);
        setOrderActive(false);
        clearOrderInfo();
      },
    );
  };

  fetchGeocodeInfo = () => {};

  startOrderChannel = () => {
    const {
      activeOrder,
      setActiveOrder,
      unsubscribeActiveOrder,
      setOrderActive,
      clearOrderInfo,
      setDriverSearchState,
      orderCoordinates,
    } = this.props.orderStore;
    let channelOrder = this.props.appStore.pusher.subscribe(
      `order.${this.props.orderStore.activeOrder.id}`,
    );

    channelOrder.bind('order.updated', order => {
      //слушатель на апдейт текущего заказа
      console.log(order);
      if (activeOrder.status !== 2 && order.status === 2) {
        this.setState({openedModal: 'driverModal'});
        setActiveOrder(order);
        this.waitDriverModal.wrappedInstance.close();

        let whoosh = new Sound('getdriver.mp3', Sound.MAIN_BUNDLE, error => {
          // инициализация плагина с звуком
          whoosh.play(); //запуск звука нового заказа
          setTimeout(() => {
            whoosh.release(); //выгружает плагин со звуками
          }, 5000);
        });

        setDriverSearchState(false);
        this.driverModal.wrappedInstance.open();

        let cordsToFit = [
          {latitude: +order.driver.lat, longitude: +order.driver.lng},
          {
            latitude: orderCoordinates.from.lat,
            longitude: orderCoordinates.from.lng,
          },
        ];
        if (Platform.OS === 'ios') {
          this.mapRef.fitToCoordinates(cordsToFit, {
            edgePadding: {
              top: (height - 200) * 0.23,
              right: 100,
              bottom: (height - 200) * 0.23,
              left: 100,
            },
            animated: true,
          });
        } else {
          if (this.mapRef && this.mapRef.fitToCoordinates)
            this.mapRef.fitToCoordinates(cordsToFit, {
              edgePadding: {
                top: PixelRatio.getPixelSizeForLayoutSize(
                  (height - 200) * 0.23,
                ),
                right: PixelRatio.getPixelSizeForLayoutSize(100),
                bottom: PixelRatio.getPixelSizeForLayoutSize(
                  (height - 200) * 0.23,
                ),
                left: PixelRatio.getPixelSizeForLayoutSize(100),
              },
              animated: true,
            });
        }
      } else if (activeOrder.status !== 4 && order.status === 4) {
        this.handleCancelOrder(true);
      } else if (activeOrder.status !== 3 && order.status === 3) {
        LoadScreen('DetailScreen', {id: order.id});

        this.setState(
          {
            bottomMargin: 0,
            addressToObject: undefined,
            openedModal: 'addressModal',
            controls: true,
          },
          () => {
            this.driverModal.wrappedInstance.close();
            unsubscribeActiveOrder();
            this.addressModal.wrappedInstance.open();

            setDriverSearchState(false);
            setOrderActive(false);
            clearOrderInfo();
          },
        );
      }
      // else if (activeOrder.status !== 6 && order.status === 6) {
      //   sendToast('Предварительный заказ принят!', 'Предварительный заказ');
      //   this.handleCancelOrder(true);
      // }
    });
  };

  onFetchRoute = result => {
    console.log('ON_FETCH_ROUTE => ', result);
    this.props.orderStore.setOrderGeodata(result.legs[0]);
  };

  handlePressHomeAddress = () => {
    this.fetchAddress(this.props.appStore.profile.address_home);
  };

  handlePressWorkAddress = () => {
    this.fetchAddress(this.props.appStore.profile.address_work);
  };

  fetchAddress = address => {
    console.log(address);
    const successCallback = json => {
      console.log(json);
      this.handleChangeAddress(json.results[0]);
    };

    const errorCallback = error => {
      console.log(error);
    };

    this.props.appStore.fetchGeocode(
      {string: address, type: 'address'},
      {successCallback, errorCallback},
    );
  };

  handleVisibleOptions = () => {
    this.setState({visibleOptions: !this.state.visibleOptions});
  };

  openPreorderScreen = () => {
    LoadScreen('HistoryPreorderScreen');
  };

  handlePressDeleteAddress = () => {
    let coordinates = this.props.orderStore.orderCoordsArray.map(item => {
      return {lat: item.lat + '', lng: item.lng + ''};
    });

    if (this.state.addressToObject && this.state.addressToObject.address) {
      coordinates.push({
        lat: this.state.addressToObject.lat.toString(),
        lng: this.state.addressToObject.lng.toString(),
      });
    }

    this.props.appStore.setTariffsLoading(true);
    this.props.appStore.fetchGeoRegionTariffs({coordinates});
  };

  handlePressCancelWhenWait = (callback = noop) => {
    const {
      cancelOrder,
      activeOrder,
      setActiveOrder,
      setDriverSearchState,
      setOrderActive,
      orderCoordinates,
      setOrderCoordinates,
      unsubscribeActiveOrder,
    } = this.props.orderStore;
    const {userId} = this.props.appStore;

    const successCallback = () => {
      console.log(orderCoordinates);
      unsubscribeActiveOrder();
      this.setState(
        {
          openedModal: 'orderModal',
          controls: false,
          orderGeodata: undefined,
          bottomMargin: 300,
          addressToObject: orderCoordinates.to[orderCoordinates.to.length - 1],
        },
        () => {
          this.waitDriverModal.wrappedInstance.close();
          setActiveOrder({});
          setDriverSearchState(false);
          setOrderActive(false);

          let newCoords = {...toJS(orderCoordinates)};
          newCoords.to.pop();
          setOrderCoordinates(newCoords);
          this.handlePressDeleteAddress();
          this.orderModal.wrappedInstance.handleInput(
            this.state.addressToObject.address,
            false,
          );
          if (this.mapRef && this.mapRef.animateCamera)
            this.mapRef.animateCamera({
              center: {
                latitude: this.state.addressToObject.lat,
                longitude: this.state.addressToObject.lng,
              },
              zoom: 17,
            });
          this.orderModal.wrappedInstance.open();
        },
      );
    };
    const errorCallback = () => {
      callback();
    };
    cancelOrder(userId, activeOrder.id, undefined, {
      successCallback,
      errorCallback,
    });
    // successCallback();
  };

  handlePanDragRegion = throttle((type = 'pan') => {
    console.log('change', type);
    if (this.state.allowAnimate === true) {
      this.setState({allowAnimate: false});
    }
  }, 1000);

  render() {
    const {appStore, orderStore, userStore} = this.props;
    const {init_region, tariffs, tariffsLoading, profile} = appStore;
    const {
      orderCoordsArray,
      orderCoordinates,
      pointFrom,
      destinationPoint,
      waypointsPoint,
      orderActive,
      driverSearchState,
      tariff_id,
      inning_at,
      orderedUser,
      comment,
      activeOrder,
      orderGeodata,
    } = orderStore;
    const {bottomMargin, openedModal, visibleOptions} = this.state;
    const {preorderHistory, loadingPreorderHistory} = userStore;
    console.log('111111111111111111111111111111111');
    console.log('111111111111111111111111111111111');
    console.log(activeOrder.driver?.lat);
    console.log('111111111111111111111111111111111');
    console.log('111111111111111111111111111111111');
    return (
      <Page>
        {/* <KeyboardAwareScrollView enabled extraHeight={100} keyboardShouldPersistTaps={'handled'} style={[styles.container]}> */}
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          keyboardShouldPersistTaps={'handled'}
          style={[styles.container]}>
          <View
            style={{
              height: height - bottomMargin,
              width: width,
              position: 'relative',
            }}>
            <MapView
              onPress={Keyboard.dismiss}
              onMapReady={this.onMapReady}
              provider={PROVIDER_GOOGLE}
              ref={ref => (this.mapRef = ref)}
              showsCompass={false}
              style={{flex: 1}}
              initialRegion={toJS(init_region)}
              zoomEnabled={true}
              onRegionChangeComplete={this.handleChangeRegion}
              onPanDrag={this.handlePanDragRegion}>
              {(!activeOrder.driver ||
                activeOrder.driver.state == 2 ||
                activeOrder.driver.state == 4 ||
                activeOrder.driver.state == 6) &&
                orderCoordinates.from.address && (
                  <PointMarker
                    innerText={orderGeodata ? orderGeodata.duration.text : 'А'}
                    coords={{
                      latitude: orderCoordinates.from.lat,
                      longitude: orderCoordinates.from.lng,
                    }}
                  />
                )}
              {orderActive === true && activeOrder.status === 2 && (
                <DriverMarker
                  coords={{
                    latitude: +activeOrder.driver.lat,
                    longitude: +activeOrder.driver.lng,
                  }}
                />
              )}
              {/* {
              orderCoordinates.from.address &&
              <DriverMarker coords={{ latitude: orderCoordinates.from.lat, longitude: orderCoordinates.from.lng }} />
            } */}
              {(!activeOrder.driver || activeOrder.driver.state == 3) &&
                orderCoordinates.to.length > 0 &&
                orderCoordinates.to.map((item, index) => {
                  return (
                    <PointMarker
                      key={index + '_order_marker_to'}
                      innerText={index + 1}
                      coords={{latitude: item.lat, longitude: item.lng}}
                    />
                  );
                })}

              {orderActive === true && driverSearchState === true && (
                <MapViewDirections
                  origin={pointFrom[0]}
                  destination={destinationPoint[1]}
                  waypoints={waypointsPoint}
                  apikey={GOOGLE_MAPS_APIKEY}
                  language={'ru'}
                  mode={'DRIVING'}
                  precision={'high'}
                  strokeWidth={5}
                  strokeColor={'#32CD32'}
                />
              )}
              {activeOrder.driver && activeOrder.driver.state == 2 && (
                <MapViewDirections
                  onFetchRoute={this.onFetchRoute}
                  origin={pointFrom}
                  destination={{
                    latitude: +activeOrder.driver.lat,
                    longitude: +activeOrder.driver.lng,
                  }}
                  // waypoints={waypointsPoint}+79653878885
                  apikey={GOOGLE_MAPS_APIKEY}
                  language={'ru'}
                  mode={'DRIVING'}
                  precision={'high'}
                  strokeWidth={5}
                  strokeColor={'#32CD32'}
                />
              )}
              {activeOrder.driver && activeOrder.driver.state == 3 && (
                <MapViewDirections
                  origin={{
                    latitude: +activeOrder.driver.lat,
                    longitude: +activeOrder.driver.lng,
                  }}
                  destination={destinationPoint}
                  waypoints={waypointsPoint}
                  apikey={GOOGLE_MAPS_APIKEY}
                  language={'ru'}
                  mode={'DRIVING'}
                  precision={'high'}
                  strokeWidth={5}
                  strokeColor={'#32CD32'}
                />
              )}
            </MapView>
            {orderActive === false && (
              <Image
                source={require('../source/point_order.png')}
                resizeMode={'contain'}
                style={{
                  width: 56,
                  height: 56,
                  marginBottom: 40,
                  position: 'absolute',
                  left: width / 2 - 28,
                  top: height / 2 - 56 - bottomMargin / 2,
                }}
              />
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              top: isIphoneX() ? 44 : 22,
              left: 16,
            }}>
            <NavbarButton
              onPress={openSwipeMenu}
              icon={require('../source/icons/icon-menu.png')}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: isIphoneX() ? 44 : 22,
              right: 16,
            }}>
            <TouchableOpacity
              onPress={this.openPreorderScreen}
              style={{
                height: 43,
                width: 43,
                borderRadius: 50,
                borderColor: COLORS.LOADER_IOS_COLOR,
                borderWidth: 5,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {loadingPreorderHistory === true ? (
                <ActivityIndicator
                  size="small"
                  color={COLORS.LOADER_IOS_COLOR}
                />
              ) : (
                <Text style={[styles.text]}>
                  {preorderHistory.total_orders}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 16,
              bottom: this.state.controls ? 270 : 370,
            }}>
            {profile.address_home && (
              <TouchableOpacity
                onPress={this.handlePressHomeAddress}
                style={styles.controls}>
                <Image
                  source={require('../source/home-button.png')}
                  style={{width: 48, height: 48}}
                />
              </TouchableOpacity>
            )}
            {profile.address_work && (
              <TouchableOpacity
                onPress={this.handlePressWorkAddress}
                style={styles.controls}>
                <Image
                  source={require('../source/button.png')}
                  style={{width: 48, height: 48}}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.controls}
              onPress={this.handleGetCurrentGeoposition}>
              <Image
                source={require('../source/geo-button.png')}
                style={{width: 48, height: 48}}
              />
            </TouchableOpacity>
          </View>
          <AddressModal
            onPress={this.handlePressAddress}
            onChangeAddress={this.handleChangeAddress}
            ref={node => (this.addressModal = node)}
            appStore={appStore}
            onEnterAddress={this.handlePanDragRegion}
          />
          <OrderModal
            onPress={this.onPressOrder}
            onChangeAddress={this.handleChangeAddress}
            ref={node => (this.orderModal = node)}
            onPressPlus={this.handlePlusAddress}
            onCancelOrder={this.handleCancelOrder}
            onDeleteAddress={this.handlePressDeleteAddress}
            onEnterAddress={this.handlePanDragRegion}
            orderCoordsArray={orderCoordsArray}
            tariff_id={tariff_id}
            tariffs={tariffs}
            tariffsLoading={tariffsLoading}
            inning_at={inning_at}
            orderedUser={orderedUser}
            comment={comment}
            orderActive={orderActive}
            onVisibleOptions={this.handleVisibleOptions}
          />
          <DriverModal
            ref={node => (this.driverModal = node)}
            activeOrder={activeOrder}
            onPress={() => {}}
          />
          <WaitDriverModal
            ref={node => (this.waitDriverModal = node)}
            onPressCancel={this.handlePressCancelWhenWait}
          />
        </KeyboardAvoidingView>
        <Modal visible={visibleOptions} animated={'slide'}>
          <OptionsModal onClose={this.handleVisibleOptions} />
        </Modal>
        {/* </KeyboardAwareScrollView> */}
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 19.84,

    elevation: 5,
    marginBottom: 8,
  },
  text: {
    color: COLORS.LOADER_IOS_COLOR,
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    fontWeight: '700',
  },
});
