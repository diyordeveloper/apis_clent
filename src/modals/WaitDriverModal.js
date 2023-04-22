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
import {throttle} from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';

let {width, height} = Dimensions.get('window');

const HEIGHT_DRIVER_MODAL = 280;

@inject('appStore', 'orderStore')
@observer
export default class WaitDriverModal extends Component {
  state = {
    cost: 0,
    paymentMethod: 2,
    loading: false,
  };

  closeTimer;

  open = (cost, paymentMethod) => {
    console.log('openModalWait');
    this.setState({cost, paymentMethod}, () => {
      // this.bsDriverWait.open();
      this.bsDriverWait.snapTo(1);
      this.closeTimer = setTimeout(() => {
        this.props.onPressCancel(() => {
          this.setState({loading: false});
        });
      }, 20000);
    });
  };
  close = () => {
    console.log('closeModalWait');
    // this.bsDriverWait.close();
    this.bsDriverWait.snapTo(0);
    this.setState({cost: 0, paymentMethod: 2, loading: false});
    clearTimeout(this.closeTimer);
  };

  handleCancelOrder = () => {
    if (this.state.loading === false) {
      this.setState({loading: true}, () => {
        this.props.onPressCancel(() => {
          this.setState({loading: false});
        });
      });
    }
  };

  renderContent = () => {
    const {cost, paymentMethod, loading} = this.state;
    return (
      <ModalContainer height={HEIGHT_DRIVER_MODAL}>
        <View
          style={{
            paddingHorizontal: 32,
            paddingTop: 32,
            paddingBottom: 20,
            justifyContent: 'center',
            height: HEIGHT_DRIVER_MODAL - 20,
          }}>
          {paymentMethod == 1 && (
            <React.Fragment>
              <Text
                style={
                  styles.textTitle
                }>{`Предоплата по заказу - ${cost}₽`}</Text>
              <Text style={styles.textContainer}>
                В случае отмены деньги вернутся на карту
              </Text>
            </React.Fragment>
          )}
          <Text style={styles.searchDriverText}>Идет поиск водителя</Text>
          <ActivityIndicator />
          <Button
            loading={loading}
            onPress={this.handleCancelOrder}
            style={{marginTop: 10}}>
            Отменить заказ
          </Button>
        </View>
        <View style={{height: 20}} />
      </ModalContainer>
    );
  };

  render() {
    return ( 
      <BottomSheet
          ref={node => this.bsDriverWait = node}
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
    color: '#D8D8D8',
    fontFamily: 'Gilroy-Regular',
    marginTop: 10,
  },
  car: {
    fontSize: 14,
    color: '#9D9D9D',
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
  },

  statusIcon: {
    height: 12,
    width: 12,
    marginRight: 8,
  },
  statusTitle: {
    fontFamily: 'Gilroy-Regular',
    color: '#D8D8D8',
  },
  searchDriverText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    marginBottom: 10,
  },
  textContainer: {
    textAlign: 'center',
    fontFamily: 'Gilroy-Regular',
    marginBottom: 30,
  },
});

{
  /* <View style={{ paddingHorizontal: 32, paddingTop: 32, paddingBottom: 20, height: 200, justifyContent: 'center', alignItems: 'center' }}>
<Text style={styles.searchDriverText}>Идет поиск водителя</Text>
<ActivityIndicator/>
</View> */
}
