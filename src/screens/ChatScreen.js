import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { MessageBar, MessageRecieve, MessageSend, KeyboardAvoidingChat } from '../ui';

export default class ChatScreen extends Component {

    renderItem = ({ item, index }) => {
        if (item == -1)

            return (
                <Text style={{ color: '#B1B1B1', fontFamily: 'Gilroy-Regular', textAlign: 'center', marginVertical: 36 }}>Понедельник, 27 ноября</Text>
            )

        if (item == 1) {
            return (
                <MessageRecieve >Добрый вечеер, я Вас ожидаю!</MessageRecieve>
            )
        }
        if (item == 2) {
            return (
                <MessageSend >Добрый, уже выхожу, спасибо!</MessageSend>
            )
        }
    }
    render() {
        return (
            <KeyboardAvoidingChat>
                <Page top>
                    <Navbar>
                        <NavbarItem backLink />
                        <NavbarItem title="Разговор с водителем " />
                    </Navbar>
                    <View style={{ paddingHorizontal: 32, flex: 1 }}>
                        <FlatList
                            data={[2, 1, -1]}
                            renderItem={this.renderItem}
                            showsVerticalScrollIndicator={false}
                            inverted
                            style={{ flex: 1 }}
                        />
                    </View>
                    <MessageBar />
                </Page>
            </KeyboardAvoidingChat>
        );
    }
}