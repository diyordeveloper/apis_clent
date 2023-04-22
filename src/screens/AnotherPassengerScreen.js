import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack, sendToast } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button } from '../ui';
import { LittleText } from '../ui/Text';
import { PhoneInput, NameInput } from '../ui/Input';
import { observer, inject } from 'mobx-react/native';

@inject('appStore', 'orderStore')
@observer
export default class AnotherPassengerScreen extends Component {
    state = {
        name: '',
        phone: ''
    }

    componentDidMount() {
        const { orderedUser: { phone, name } } = this.props.orderStore;
        if (phone) {
            this.setState({ phone, name });
        }
    }

    handlePhone = (text) => this.setState({ phone: text });
    handleName = (text) => this.setState({ name: text });

    handleSaveUser = () => {
        const { name, phone } = this.state;
        if (name == '' || phone == '') {
            sendToast('Заполните имя пассажира и телефон!', 'Ошибка сохранения пассажира');
            return;
        }
        this.props.orderStore.setOrderedUser({ name, phone });
        goBack();
    }

    render() {
        const { phone, name } = this.state;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Пассажир" />
                </Navbar>
                <PageContent>
                    <View style={{ padding: 32 }}>
                        <LittleText style={{ marginBottom: 20, marginTop: 8 }}>Если Вы хотите вызвать машину другому пассажиру - укажите здесь его контакты. Он получит уведомление с деталями поездки</LittleText>

                        <NameInput placeholder={'Имя пассажира'} onChangeText={this.handleName} value={name} />
                        <PhoneInput placeholder={'Номер телефона'} onChangeText={this.handlePhone} value={phone} style={{ marginTop: 16 }} />


                        <Button onPress={this.handleSaveUser} style={{ marginTop: 32 }}>Сохранить данные пассажира</Button>
                    </View>
                </PageContent>
            </Page>
        );
    }
}