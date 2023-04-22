import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Keyboard,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Page, LoadScreen, PageContent, sendToast} from '../../utils/AppTor';
import {Logo, Button} from '../../ui';
import {PhoneInput, CodeInput} from '../../ui/Input';
import {LittleText} from '../../ui/Text';

import SwiperFlatList from 'react-native-swiper-flatlist';
import {observer, inject} from 'mobx-react';

let {width, height} = Dimensions.get('window');
let screen = Dimensions.get('screen');

console.log('WINDOW:' + height);
console.log('SCREEN:', screen);

@inject('appStore')
@observer
export default class AuthScreen extends Component {
  state = {
    phone: '',
    code: '',
    sending: false,
  };

  handlePhone = text => this.setState({phone: text});
  handleCode = text => this.setState({code: text});

  handlePressPhone = () => {
    const {phone} = this.state;
    if (!phone) {
      sendToast('Укажите телефон');
      return;
    }

    const successCallback = json => {
      // sendToast(json.data.sms_code);
      this.setState({sending: false}, () => {
        this.swiper.scrollToIndex({index: 1});
      });
    };
    const errorCallback = error => {
      this.setState({sending: false});
    };
    this.setState({sending: true}, () => {
      this.props.appStore.fetchSmsCode(
        {phone},
        {successCallback, errorCallback},
      );
    });
  };

  handleResendCode = () => {
    const {phone} = this.state;

    const successCallback = json => {
      this.setState({code: ''});
      sendToast(`Новый код отправлен на номер ${phone}`);
    };

    this.props.appStore.fetchSmsCode({phone}, {successCallback});
  };

  handlePressCode = () => {
    let {code, phone} = this.state;
    const {
      setToken,
      fetchRegions,
      setProfile,
      initPusher,
      fetchToken,
      setUserId,
      fetchSupportPhone,
      fetchUserApproveWiki,
    } = this.props.appStore;
    if (!code) {
      sendToast('Введите код SMS');
      return;
    }

    const body = {
      phone,
      code,
      client_id: '3',
      client_secret: 'Jts9vOlNhea5nuTx6cOo2VK3OqwJzeYRYvzPHOF8',
    };

    const successCallback = json => {
      console.log(json);
      this.setState({sending: false}, () => {
        setToken(json.access_token);
        setUserId(json.data.id);
        setProfile(json.data);
        fetchSupportPhone();
        initPusher();
        fetchUserApproveWiki();
        if (json.data.full_name == '') {
          LoadScreen('RegScreen', {}, true);
        } else {
          AsyncStorage.setItem('apis_access_token', json.access_token);
          AsyncStorage.setItem('apis_profile_id', JSON.stringify(json.data.id));
          LoadScreen('MainScreen', {}, true);
        }
      });
    };
    const errorCallback = error => {
      this.setState({sending: false});
    };
    this.setState({sending: true}, () => {
      fetchToken(body, {successCallback, errorCallback});
    });
  };

  handleChangePhone = () => {
    this.setState({phone: '', code: ''}, () => {
      this.swiper.scrollToIndex({index: 0});
    });
  };

  onSwipeEnd = () => {
    Keyboard.dismiss();
  };

  render() {
    let {phone, code, sending} = this.state;
    return (
      <Page>
        <PageContent style={{flex: 1, justifyContent: 'center'}} onePageAware>
          <View style={{height: 450}}>
            <SwiperFlatList
              ref={node => (this.swiper = node)}
              disableGesture
              showPagination
              paginationActiveColor={'#FDB541'}
              paginationDefaultColor={'#e5e5e5'}
              paginationStyleItem={{width: 8, height: 8, marginHorizontal: 6}}
              onMomentumScrollEnd={this.onSwipeEnd}>
              <View key={'slide1'} style={{width: width}}>
                <Logo />
                <View style={{paddingHorizontal: 32}}>
                  <PhoneInput
                    onSubmitEditing={this.handlePressPhone}
                    onChangeText={this.handlePhone}
                    value={phone}
                  />
                  {/* <LittleText style={{ marginTop: 20 }}>Мы отправим вам код на номер +7 927 666-66-66</LittleText> */}
                  <Button
                    loading={sending}
                    onPress={this.handlePressPhone}
                    style={{marginTop: 76}}>
                    Отправить
                  </Button>
                </View>
              </View>
              <View key={'slide2'} style={{width: width}}>
                <Logo />
                <View style={{paddingHorizontal: 32}}>
                  <CodeInput
                    onSubmitEditing={this.handlePressCode}
                    onChangeText={this.handleCode}
                    value={code}
                  />
                  <LittleText
                    style={{
                      marginTop: 20,
                    }}>{`Мы отправили вам код на номер ${phone}`}</LittleText>
                  <Button
                    loading={sending}
                    onPress={this.handlePressCode}
                    style={{marginTop: 25}}>
                    Отправить
                  </Button>
                  <TouchableOpacity
                    onPress={this.handleResendCode}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <Text style={styles.text}>Отправить код еще раз</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.handleChangePhone}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <Text style={styles.text}>Сменить номер телефона</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SwiperFlatList>
          </View>
        </PageContent>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#FCB540',
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    fontWeight: '600',
  },
});
