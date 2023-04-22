import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modalbox';
import {
  AddressLine,
  FlatButton,
  SmallCard,
  OrderOptionsButton,
  Button,
  Rating,
  ModalContainer,
} from '../ui';
import {LoadScreen} from '../utils/AppTor';
import BottomSheet from 'reanimated-bottom-sheet';

import {observer, inject} from 'mobx-react/native';
import RBSheet from 'react-native-raw-bottom-sheet';

let {width, height} = Dimensions.get('window');

const HEIGHT_DRIVER_MODAL = 250;

const StatusItem = ({icon, style, title}) => {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
        style,
      ]}>
      <Image source={icon} style={styles.statusIcon} />
      <Text style={styles.statusTitle}>{title}</Text>
    </View>
  );
};

@inject('appStore', 'orderStore')
@observer
export default class DriverModal extends Component {
  state = {
    heightDriverModal: 200,
    currentDriverId: undefined,
  };

  open = () => {
    console.log('openModal');
    // this.bsDriver.open();
    this.bsDriver.snapTo(1);
    this.startDriverWatch();
  };
  close = () => {
    console.log('closeModal');
    // this.bsDriver.close();
    this.bsDriver.snapTo(0);

    this.props.appStore.pusher.unsubscribe(
      `driver.${this.state.currentDriverId}`,
    );
  };

  renderStateDriver = () => {
    const {driver} = this.props.activeOrder;
    switch (driver.state) {
      case 2:
        return (
          <StatusItem
            icon={require('../source/icons/arrow-gray.png')}
            title={'Водитель направляется к вам'}
          />
        );
      case 3:
        return (
          <StatusItem
            icon={require('../source/icons/arrow-gray.png')}
            title={'Вы в пути'}
          />
        );
      case 4:
      case 6:
        return (
          <StatusItem
            icon={require('../source/icons/time-gray.png')}
            title={'Вас ожидает'}
          />
        );
    }
  };

  startDriverWatch = () => {
    const {activeOrder, setActiveOrder, setOrderGeodata} =
      this.props.orderStore;
    this.setState({currentDriverId: this.props.activeOrder.driver.id});
    let channelDriver = this.props.appStore.pusher.subscribe(
      `driver.${this.props.activeOrder.driver.id}`,
    );
    channelDriver.bind('driver.updated', driver => {
      console.log(driver);
      if (driver.state !== 2) setOrderGeodata(undefined);
      setActiveOrder({...activeOrder, driver: driver});
    });
  };

  renderContent = () => {
    const {driver} = this.props.activeOrder;
    return (
      <ModalContainer height={HEIGHT_DRIVER_MODAL}>
        {driver && driver.id && (
          <View
            style={{
              paddingHorizontal: 32,
              paddingTop: 32,
              paddingBottom: 20,
              flex: 1,
            }}>
            {this.renderStateDriver()}
            {/* <StatusItem icon={require('../source/icons/arrow-gray.png')} title={'Вы в пути'} /> */}
            {/* <StatusItem icon={require('../source/icons/time-gray.png')} title={'Вас ожидает'} /> */}

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.name}>{driver.user.first_name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Rating rating={driver.rating} />
                    <Text style={styles.rate}>{driver.rating}</Text>
                  </View>
                </View>
                <Text
                  style={
                    styles.number
                  }>{`${driver.car.gos_number} (${driver.car.color_name})`}</Text>
                <Text style={styles.car}>
                  {driver.car.brand.name + ' ' + driver.car.model.name}
                </Text>
              </View>
              {driver.user.avatar ? (
                <Image
                  source={{uri: driver.user.avatar}}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require('../source/user_placeholder.png')}
                  style={styles.image}
                />
              )}
            </View>

            <View style={{flexDirection: 'row', marginTop: 16}}>
              <Button
                onPress={() => LoadScreen('ContactToDriverScreen')}
                style={{marginRight: 8, flex: 1}}>
                Связаться
              </Button>
              <Button
                onPress={() => LoadScreen('ChangeOrderScreen')}
                style={{marginLeft: 8, flex: 1}}>
                Изменить
              </Button>
            </View>
          </View>
        )}
        {/* <View style={{ height: 20 }} /> */}
      </ModalContainer>
    );
  };

  render() {
    const {driverSearchState} = this.props;
    return ( 
      <BottomSheet
          ref={node => this.bsDriver = node}
          initialSnap={0}
          snapPoints={[0, HEIGHT_DRIVER_MODAL]}
          enabledContentGestureInteraction={false}
          renderContent={this.renderContent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 20,
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47,

    backgroundColor: '#ffffff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowOpacity: 0.08,
    shadowRadius: 31.0,

    elevation: 12,
  },

  number: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
    marginTop: 10,
  },
  car: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Gilroy-Regular',
    marginTop: 13,
  },
  name: {
    fontSize: 16,
  },
  rate: {
    color: '#FDB541',
    fontFamily: 'Gilroy-Regular',
    marginLeft: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 16,
    borderRadius: 50,
  },

  statusIcon: {
    height: 12,
    width: 12,
    marginRight: 8,
  },
  statusTitle: {
    fontFamily: 'Gilroy-Regular',
    color: '#000',
  },
  searchDriverText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 20,
  },
});
