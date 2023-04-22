import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  AddressLine,
  FlatButton,
  SmallCard,
  OrderOptionsButton,
  Button,
  ModalContainer,
  CustomTouchableOpacity,
} from '../ui';
import {LoadScreen} from '../utils/AppTor';
import BottomSheet from 'reanimated-bottom-sheet';
import {observer, inject} from 'mobx-react/native';
import {toJS} from 'mobx';
import {AddressInput} from '../ui/Input';
import {debounce} from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';

let {width, height} = Dimensions.get('window');

const HEIGHT_ORDER_MODAL = 355;

@inject('appStore', 'orderStore')
@observer
export default class OrderModal extends Component {
  state = {
    address: '',
    loading: false,
  };

  open = () => {
    // this.modal.open();
    this.modal.snapTo(1);
  };

  close = () => {
    // this.modal.close();
    this.modal.snapTo(0);
    this.modalContainer.scrollTo({y: 0});
    this.setState({
      address: '',
      loading: false,
    });
  };

  searchAddress = debounce(text => {
    if (text.length < 3) return;

    const successCallback = json => {
      console.log(json);

      this.setState({loading: false}, () => {
        this.props.onChangeAddress(json.results[0]);
      });
    };

    const errorCallback = () => {
      this.setState({loading: false});
    };

    this.setState({loading: true}, () => {
      this.props.appStore.fetchGeocode(
        {string: text, type: 'address'},
        {successCallback, errorCallback},
      );
    });
  }, 5000);

  handleInput = (text, withSearch = true) => {
    this.setState({address: text}, () => {
      if (withSearch === true) {
        this.searchAddress(text);
        this.props.onEnterAddress('modal');
      }
    });
  };

  handlePlus = () => {
    if (this.state.address.length > 0) {
      this.setState({address: ''}, () => {
        this.props.onPressPlus();
      });
    }
  };

  handleCallDriver = () => {
    if (this.state.loading === false) {
      this.setState({loading: true}, () => {
        this.props.onPress();
      });
    }
  };

  handleErrorOrder = () => {
    this.setState({loading: !this.state.loading});
  };

  handleDelete = index => {
    const {orderCoordinates, setOrderCoordinates} = this.props.orderStore;

    let newCoords = {...toJS(orderCoordinates)};
    newCoords.to.splice(index, 1);
    setOrderCoordinates(newCoords);
    this.props.onDeleteAddress();
  };

  handleCancelOrder = () => {
    this.setState(
      {
        address: '',
        loading: false,
      },
      () => {
        this.modalContainer.scrollTo({y: 0});
        this.props.onCancelOrder();
      },
    );
  };

  renderTariffImage = id => {
    switch (id) {
      case 1:
        return require('../source/cars/small/car1.png');
      case 2:
        return require('../source/cars/small/car2.png');
      case 3:
        return require('../source/cars/small/car3.png');
      case 4:
        return require('../source/cars/small/car4.png');
      case 5:
        return require('../source/cars/small/car5.png');
      case 6:
        return require('../source/cars/small/car6.png');
      case 7:
        return require('../source/cars/small/car7.png');
    }
  };

  handlePickTariff = tariff_id => {
    const {setTariffId} = this.props.orderStore;
    setTariffId(tariff_id);
    console.log(this.modalContainer);
    this.modalContainer.scrollToEnd();
  };

  renderContent = () => {
    const {
      orderCoordsArray,
      tariff_id,
      tariffs,
      tariffsLoading,
      comment,
      inning_at,
      orderedUser,
      orderActive,
      onVisibleOptions,
    } = this.props;
    const {loading, address} = this.state;
    return (
      <ModalContainer height={HEIGHT_ORDER_MODAL}>
        <ScrollView ref={node => (this.modalContainer = node)}>
          <View
            style={{paddingHorizontal: 32, paddingTop: 32, paddingBottom: 16}}>
            <AddressLine
              coordinates={orderCoordsArray}
              withDelete
              onPressDelete={this.handleDelete}
            />
            {orderActive === false && (
              <AddressInput
                onChangeText={this.handleInput}
                value={address}
                withPlus={orderCoordsArray.length < 5 ? true : false}
                onPressPlus={this.handlePlus}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 32,
              justifyContent: 'space-between',
            }}>
            <FlatButton
              // icon={require('../source/icons/icon-chat.png')}
              title={
                comment === undefined ? 'Добавить заметку' : 'Изменить заметку'
              }
              onPress={() => LoadScreen('CommentScreen')}
              style={{width: (width - 64 - 8) / 3}}
            />
            <FlatButton
              // icon={require('../source/icons/icon-users.png')}
              title={
                orderedUser.phone === undefined
                  ? 'Близкому человеку'
                  : 'Изменить пассажира'
              }
              style={{width: (width - 64 - 8) / 3}}
              onPress={() => LoadScreen('AnotherPassengerScreen')}
            />
            <FlatButton
              // icon={require('../source/icons/icon-time.png')}
              title={
                inning_at === undefined
                  ? 'Планировать поездку'
                  : 'Изменить дату'
              }
              onPress={() => LoadScreen('TimeScreen')}
              style={{width: (width - 64 - 8) / 3}}
            />
          </View>
          {toJS(tariffsLoading) === true ? (
            <View
              style={{
                paddingVertical: 12,
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color="#000" style={{height: 45}} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{overflow: 'visible', paddingVertical: 12}}>
              {tariffs.map((item, index) => {
                return (
                  <SmallCard
                    active={tariff_id === item.price_id}
                    key={'smallcards-tariff-' + index}
                    image={
                      item.images.png
                        ? {uri: item.images.png.s}
                        : this.renderTariffImage(item.id)
                    }
                    name={item.name}
                    cost={item.cost}
                    id={item.price_id}
                    onPress={this.handlePickTariff}
                    onLongPress={() => LoadScreen('CarsScreen', {item, index})}
                    style={{marginLeft: index == 0 ? 32 : 8}}
                  />
                );
              })}
            </ScrollView>
          )}
          {/* <View style={{ paddingHorizontal: 32 }}>
                        <OrderOptionsButton onPress={() => LoadScreen('OptionsScreen')} />
                    </View>
                    <View style={{ paddingHorizontal: 32, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button disabled={(address === '' || tariff_id == undefined) ? true : false} loading={loading} onPress={this.handleCallDriver} style={{ marginVertical: 16, flex: 1, marginRight: 20 }}>Вызвать водителя</Button>
                        <Button style={{ marginVertical: 16, width: 100}} onPress={this.handleCancelOrder}>Назад</Button> */}
          {/* <TouchableOpacity onPress={this.handleCancelOrder} style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={styles.text}>Назад</Text></TouchableOpacity> */}
          <View style={{paddingHorizontal: 32}}>
            <OrderOptionsButton onPress={onVisibleOptions} />
            <Button
              disabled={address === '' || tariff_id == undefined ? true : false}
              loading={loading}
              onPress={this.handleCallDriver}
              style={{marginVertical: 20, flex: 1}}>
              Вызвать водителя
            </Button>
          </View>
        </ScrollView>
      </ModalContainer>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={node => (this.modal = node)}
        initialSnap={0}
        snapPoints={[0, HEIGHT_ORDER_MODAL + 20]}
        enabledContentGestureInteraction={false}
        renderContent={this.renderContent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  text: {
    color: '#FCB540',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    fontWeight: '600',
  },
});
