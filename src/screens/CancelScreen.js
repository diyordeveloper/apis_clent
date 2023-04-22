


import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Page, goBack, LoadScreen } from '../utils/AppTor';
import { observer, inject } from 'mobx-react/native';
import { CloseButton, Button, ListItem, ModalContainer } from '../ui';
import { COLORS } from '../colors';
import { map } from 'lodash';


@inject('appStore', 'orderStore')
@observer
export default class CancelScreen extends Component {
    state = {
        sending: false
    }

    handleCancelOrder = (id) => {
        const { setOrderActive, clearOrderInfo, setDriverSearchState, unsubscribeActiveOrder, cancelOrder, activeOrder, setActiveOrder } = this.props.orderStore;
        const { userId } = this.props.appStore;
        const successCallback = () => {
            unsubscribeActiveOrder();
            setDriverSearchState(false);
            setOrderActive(false);
            clearOrderInfo();
            setActiveOrder({});
            this.setState({ sending: false });
            LoadScreen('MainScreen', {}, true);
        }
        const errorCallback = () => {
            this.setState({ sending: false });
        }
        this.setState({ sending: true }, () => {
            cancelOrder(userId, activeOrder.id, id, { successCallback, errorCallback });
        })
    }

    componentDidMount() {
        this.props.orderStore.fetchCancelReasons();
    }


    render() {
        const { sending } = this.state;
        const { loadingReasons, reasons } = this.props.orderStore;
        return (
            <Page>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>Почему Вы отменили поездку?</Text>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        {
                            loadingReasons === true ?
                                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator color={COLORS.LOADER_IOS_COLOR} />
                                </View>
                                :
                                <View style={{ paddingHorizontal: 32, paddingVertical: 12 }}>
                                    {
                                        map(reasons, (item, key) => {
                                            return (
                                                <ListItem key={key + '_reason_cancel'} onPress={() => { this.handleCancelOrder(key) }}>{item}</ListItem>
                                            )
                                        })
                                    }
                                </View>
                        }
                    </ModalContainer>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton loading={sending} onPress={goBack} />
                    </View>
                </View>
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