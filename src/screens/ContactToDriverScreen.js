import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Page, goBack, LoadScreen, callPhone, sendSms } from '../utils/AppTor';

import { CloseButton, Button, ListItem, ModalContainer } from '../ui';
import { observer, inject } from 'mobx-react/native';

@inject('appStore', 'orderStore')
@observer
export default class ContactToDriverScreen extends Component {

    componentDidMount() {
        console.log(this.props.orderStore.activeOrder.driver.user.phone);
    }
    handlePressDriverPhone = () => {
        callPhone(this.props.orderStore.activeOrder.driver.user.phone);
    }
    handlePressSendSms = () => {
        sendSms(this.props.orderStore.activeOrder.driver.user.phone);
    }
    handlePressSupportPhone = () => {
        callPhone(this.props.appStore.supportPhone);
    }
    render() {
        return (
            <Page>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>Связаться с водителем</Text>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        <View style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
                            <ListItem onPress={this.handlePressDriverPhone}>Позвонить водителю</ListItem>
                            <ListItem onPress={this.handlePressSendSms}>Написать водителю</ListItem>
                            <ListItem onPress={this.handlePressSupportPhone} last>Позвонить в службу поддержки</ListItem>
                            {/* <ListItem onPress={() => LoadScreen('SupportChatScreen')} last>Написать в службу поддержки</ListItem> */}
                        </View>
                    </ModalContainer>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton onPress={() => goBack()} />
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