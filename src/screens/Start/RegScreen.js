import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PageContent,
  Page,
  openSwipeMenu,
  LoadScreen,
  NavbarItem,
  Navbar,
  goBack,
  sendToast,
} from '../../utils/AppTor';
import {Divider, ListItem, SwitchItem, Button} from '../../ui';
import {LittleText} from '../../ui/Text';
import {PhoneInput, NameInput} from '../../ui/Input';
import {observer, inject} from 'mobx-react/native';

@inject('appStore', 'orderStore')
@observer
export default class RegScreen extends Component {
  state = {
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    sending: false,
  };

  handleChangeFirstName = value => this.setState({first_name: value});
  handleChangeLastName = value => this.setState({last_name: value});
  handleChangeMiddleName = value => this.setState({middle_name: value});

  handleChangeEmail = value => this.setState({email: value});

  handleSaveInfo = () => {
    const {first_name, last_name, middle_name, email} = this.state;
    const {updateUser, setProfile, profile, token, userId} =
      this.props.appStore;

    const successCallback = data => {
      setProfile(data);
      AsyncStorage.setItem('apis_access_token', token);
      AsyncStorage.setItem('apis_profile_id', JSON.stringify(userId));
      LoadScreen('MainScreen', {}, true);
    };
    const errorCallback = error => {
      this.setState({sending: false});
    };

    if (
      first_name == '' ||
      last_name == '' ||
      middle_name == '' ||
      email == ''
    ) {
      sendToast('Заполните все поля!', 'Регистрация пользователя');
      return;
    }

    const body = {
      first_name,
      last_name,
      middle_name,
      email,
      phone: profile.phone,
    };
    this.setState({sending: true}, () => {
      updateUser(body, {successCallback, errorCallback});
    });
  };

  render() {
    const {first_name, last_name, middle_name, email, sending} = this.state;
    return (
      <Page>
        <Navbar>
          {/* <NavbarItem />
                    <NavbarItem /> */}
          {/* <NavbarItem title="Регистрация пользователя" /> */}
          {/* <NavbarItem /> */}
        </Navbar>
        <PageContent>
          <View style={{padding: 32}}>
            <LittleText style={{marginBottom: 20, marginTop: 8}}>
              Заполните информацию о себе для использования приложения
            </LittleText>

            <NameInput
              withoutIcon
              placeholder={'Фамилия'}
              onChangeText={this.handleChangeLastName}
              value={last_name}
            />
            <NameInput
              withoutIcon
              placeholder={'Имя'}
              onChangeText={this.handleChangeFirstName}
              value={first_name}
            />
            <NameInput
              withoutIcon
              placeholder={'Отчество'}
              onChangeText={this.handleChangeMiddleName}
              value={middle_name}
            />

            <NameInput
              withoutIcon
              placeholder={'Электронная почта'}
              onChangeText={this.handleChangeEmail}
              value={email}
              keyboardType={'email-address'}
            />

            <Button
              loading={sending}
              onPress={this.handleSaveInfo}
              style={{marginTop: 32}}>
              Сохранить информацию о себе
            </Button>
          </View>
        </PageContent>
      </Page>
    );
  }
}
