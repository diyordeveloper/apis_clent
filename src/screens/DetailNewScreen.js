import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, Rating } from '../ui';



export default class DetailNewScreen extends Component {

    render() {
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Детали" />
                </Navbar>
                <PageContent>
                    <View style={{ paddingHorizontal: 32 }}>
                        <HistoryItem title={'Заказ сделан в 22:37'} onPress={() => { LoadScreen('TrackScreen') }} gray after={'#123456'} noIconAfter />
                        <View style={{ marginTop: 24 }}>
                            <Text style={{ opacity: 0.7, fontFamily: 'Gilroy-Regular' }}>Тариф</Text>
                            <Text style={{ marginTop: 8, fontFamily: 'Gilroy-Regular' }}>Бизнес</Text>
                        </View>
                        <View style={{ marginTop: 24 }}>
                            <Text style={{ opacity: 0.7, fontFamily: 'Gilroy-Regular' }}>Чаевые</Text>
                            <Text style={{ marginTop: 8, fontFamily: 'Gilroy-Regular' }}>Не оставлять</Text>
                        </View>
                        <View style={{ marginTop: 24 }}>
                            <Text style={{ opacity: 0.7, fontFamily: 'Gilroy-Regular' }}>Оплата</Text>
                            <Text style={{ marginTop: 8, fontFamily: 'Gilroy-Regular' }}>MasterCard</Text>
                        </View>
                        <Divider style={{ marginTop: 13 }} />
                        <ListItem big style={{ paddingVertical: 24 }}>Добавить комментарий</ListItem>
                        <ListItem big style={{ paddingVertical: 24 }}>Юридическая информация</ListItem>
                        <ListItem big style={{ paddingVertical: 24 }} onPress={() => { LoadScreen('SupportChatScreen') }}>Служба поддержки</ListItem>
                        <TouchableOpacity onPress={() => LoadScreen('CancelScreen')} style={{ paddingVertical: 12 }}>
                            <Text style={{ color: '#FF6161', fontFamily: 'Gilroy-Regular' }}>Отменить поездку</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 50 }}></View>
                </PageContent>
            </Page>
        );
    }
}