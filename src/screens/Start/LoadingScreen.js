import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../../ui/Spinner';
import {Page, LoadScreen, PageContent} from '../../utils/AppTor';
import {observer, inject} from 'mobx-react';

@inject('appStore')
@observer
export default class LoadingScreen extends Component {
  state = {
    active: false,
  };

  componentDidMount() {
    const {
      setProfile,
      setToken,
      fetchRegions,
      initPusher,
      setUserId,
      fetchProfile,
      fetchSupportPhone,
      fetchUserApproveWiki,
      readCoordsFromStorage,
    } = this.props.appStore;

    AsyncStorage.getItem('apis_access_token').then(token => {
      console.log(token);
      if (token) {
        readCoordsFromStorage();
        AsyncStorage.getItem('apis_profile_id').then(id => {
          console.log(id);
          setToken(token);
          if (id) {
            setUserId(id);
            fetchProfile(id);
            fetchUserApproveWiki();
          }
          fetchSupportPhone();
          initPusher();
          LoadScreen('MainScreen', {}, true);
        });
      } else {
        LoadScreen('AuthScreen', {}, true);
      }
    });
  }

  render() {
    return (
      <Page>
        <Spinner big size={'small'} />
      </Page>
    );
  }
}
