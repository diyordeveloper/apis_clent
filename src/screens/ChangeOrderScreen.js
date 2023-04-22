import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Page, goBack, LoadScreen } from '../utils/AppTor';

import { CloseButton, Button, ListItem, ModalContainer } from '../ui';

export default class ChangeOrderScreen extends Component {


    render() {
        return (
            <Page>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        <View style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
                            {/* <ListItem onPress={() => LoadScreen('AddAddressScreen')}>Изменить место назначения</ListItem>
                            <ListItem onPress={() => LoadScreen('PaymentScreen')}>Изменить способ оплаты</ListItem>
                            <ListItem onPress={() => { }}>Оставить чаевые</ListItem>
                            <ListItem onPress={() => LoadScreen('CommentScreen')} >Добавить комментарий</ListItem> */}
                            <ListItem onPress={() => LoadScreen('CancelScreen')} last cancel>Отменить заказ</ListItem>
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