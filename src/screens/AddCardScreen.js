import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Page, goBack, Navbar, NavbarItem, sendToast } from '../utils/AppTor';
import { observer, inject } from 'mobx-react';
import { CloseButton, Button, ModalContainer } from '../ui';
import { CardInput } from '../ui/Input';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../colors';
import Url from 'url-parse';
import qs from 'qs';

@inject('userStore', 'orderStore')
@observer
export default class AddCardScreen extends Component {
    state = {
        orderId: '',
        formUrl: '',
        loading: true,
        attaching: false
    }

    componentDidMount() {
        this.fetchAddForm();
    }

    fetchAddForm = () => {
        const successCallback = (data) => {
            this.setState({ loading: false, orderId: data.orderId, formUrl: data.formUrl });
        }

        const errorCallback = () => {
            this.setState({ loading: false });
        }

        this.props.userStore.fetchAddCardForm('success_attach', { successCallback, errorCallback });
    }


    onChangeNavigation = (navState) => {
        const successCallback = () => {
            sendToast('Карта успешно привязана', 'Добавить карту');
            goBack(true);
        }
        const errorCallback = () => {
            this.setState({ attaching: false });
            sendToast('Произошла ошибка добавления карты', 'Добавить карту')
        }
        console.log(navState);
        let urls = Url(navState.url);
        let queryObject = qs.parse(urls.query, { ignoreQueryPrefix: true });
        console.log(urls, queryObject);
        if (queryObject.orderId && this.state.attaching === false) {
            this.setState({ attaching: true }, () => {
                this.props.userStore.attachCard(queryObject.orderId, { successCallback, errorCallback });
            })
        }
    }



    render() {
        const { orderId, formUrl, loading } = this.state;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Добавить карту" />
                </Navbar>
                {
                    loading === true ?
                        <ActivityIndicator color={COLORS.LOADER_IOS_COLOR} />
                        :
                        <WebView
                            source={{ uri: formUrl }}
                            javaScriptEnabled={true}
                            originWhitelist={['*']}
                            style={{ flex: 1 }}
                            onNavigationStateChange={this.onChangeNavigation}
                        />
                }
                {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>Добавить карту</Text>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        <View style={{ padding: 32 }}>
                            <CardInput />
                            <Button onPress={() => goBack()} style={{ marginTop: 32 }}>Добавить</Button>
                        </View>
                    </ModalContainer>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton onPress={() => goBack()} />
                    </View>
                </View> */}
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 47,
        margin: 31,

        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 31.00,

        elevation: 12,
    }
})