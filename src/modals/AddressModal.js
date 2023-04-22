import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, ModalContainer} from '../ui';
import {AddressInput} from '../ui/Input';
import {debounce} from 'lodash';
import {observer, inject} from 'mobx-react/native';
import BottomSheet from 'reanimated-bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';

const HEIGHT_ADDRESS_MODAL = 200;

@inject('appStore', 'orderStore')
@observer
export default class AddressModal extends Component {
  state = {
    address: '',
    loading: false,
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

  handleSetAddress = () => {
    if (this.state.loading === false) {
      this.props.onPress();
    }
  };

  renderContent = () => {
    const {address, loading} = this.state;
    return (
      <ModalContainer height={HEIGHT_ADDRESS_MODAL}>
        <View style={{paddingHorizontal: 32, paddingTop: 32}}>
          <AddressInput
            onChangeText={this.handleInput}
            value={address}
            style={{marginBottom: 8}}
          />
          <Button
            disabled={address === '' ? true : false}
            loading={loading}
            onPress={this.handleSetAddress}
            style={{marginTop: 8}}>
            Далее
          </Button>
        </View>
      </ModalContainer>
    );
  };

  open = () => {
    console.log(124);
    this.modal.snapTo(1);
    // this.modal.open();
  };

  close = () => {
    this.setState({
      address: '',
      loading: false,
    });
    // this.modal.close();
    this.modal.snapTo(0);
  };

  componentDidMount() {
    console.log(this.modal);
  }

  render() {
    return (
      <>
        <BottomSheet
          ref={node => (this.modal = node)}
          initialSnap={1}
          snapPoints={[0, HEIGHT_ADDRESS_MODAL]}
          enabledContentGestureInteraction={false}
          renderContent={this.renderContent}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopLeftRadius: 47,
    borderTopRightRadius: 47,

    position: 'relative',
    overflow: 'visible',
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
});
