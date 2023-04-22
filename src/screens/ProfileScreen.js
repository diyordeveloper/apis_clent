import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem } from '../ui';
import { LittleText } from '../ui/Text';
import { inject, observer } from 'mobx-react/native';

@inject('appStore')
@observer
export default class ProfileScreen extends Component {

    handleHomeAddress = () => {
        const { address_home } = this.props.appStore.profile;
        LoadScreen('AddAddressScreen', { address: address_home, type: 'address_home', onSave: this.handleSave });
    }

    handleWorkAddress = () => {
        const { address_work } = this.props.appStore.profile;
        LoadScreen('AddAddressScreen', { address: address_work, type: 'address_work', onSave: this.handleSave });
    }


    handleSave = (address, type) => {
        const { updateUser, setProfile, profile } = this.props.appStore;
        console.log(address, type);
        const successCallback = (data) => {
            setProfile(data);
            goBack();
        }
        const errorCallback = (error) => {
            console.log(error);
        }

        const body = {
            phone: profile.phone
        };
        body[type] = address;
        console.log(body);

        updateUser(body, { successCallback, errorCallback });
    }


    handleBlackCarChange = (value) => {
        const { profile, setProfile, updateUser } = this.props.appStore;

        const successCallback = () => {

        }

        const errorCallback = () => {
            setProfile({ ...profile, only_black_car: (value === true ? 0 : 1) });
        }

        setProfile({ ...profile, only_black_car: (value === true ? 1 : 0) });
        const body = {
            phone: profile.phone,
            only_black_car: (value === true ? 1 : 0)
        }
        updateUser(body, { successCallback, errorCallback });
    }


    render() {
        const { userApproveWiki, profile } = this.props.appStore;
        const { avatar, full_name, phone, email, only_black_car } = profile;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Профиль" />
                </Navbar>
                <PageContent>
                    <View style={{ paddingHorizontal: 32, paddingTop: 32 }}>
                        <View style={[styles.container]}>
                            <View style={styles.imageCont}>
                                {
                                    avatar ?
                                        <Image source={{ uri: avatar }} style={styles.image} />
                                        :
                                        <Image source={require('../source/user_placeholder.png')} style={styles.image} />
                                }
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.blockTitle}>{full_name == '' ? 'Имя не указано' : full_name}</Text>
                                <Text style={styles.subtitle}>{phone}</Text>
                                <Text style={styles.subtitle}>{email || 'Почта не указана'}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Любимые адреса</Text>
                        <Divider style={{ marginBottom: 8 }} />
                        <ListItem onPress={this.handleHomeAddress} icon={require('../source/icons/icon-add.png')} big last>Домашний адрес</ListItem>
                        <ListItem onPress={this.handleWorkAddress} icon={require('../source/icons/icon-add.png')} big last>Рабочий адрес</ListItem>
                        <Divider style={{ marginVertical: 8 }} />
                    </View>
                    <SwitchItem checked={!!only_black_car} onValueChange={this.handleBlackCarChange}>Только черный автомобили</SwitchItem>
                    <View style={{ paddingHorizontal: 32, paddingTop: 32 }}>
                        <LittleText>Включите и к Вам будут приезжать автомобили только черного цвета. Это увеличит время ожидания</LittleText>
                        <Divider style={{ marginBottom: 8, marginTop: 16 }} />
                        {
                            userApproveWiki.data.map((item, index) => {
                                return <ListItem onPress={() => { LoadScreen('FaqTextScreen', { id: item.id, title: item.name }) }} key={index + '_' + item.id + '_' + item.code} icon={require('../source/icons/icon-lock.png')} big last>{item.name}</ListItem>
                            })
                        }
                    </View>
                </PageContent>
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    imageCont: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 12.00,
        elevation: 12,
        backgroundColor: '#ffffff',

        height: 102,
        width: 102,
        borderRadius: 51,
        marginRight: 40
    },
    image: {
        height: 102,
        width: 102,
        borderRadius: 51,

    },
    blockTitle: {
        fontSize: 16
    },
    subtitle: {
        fontSize: 14,
        color: '#B2B2B2',
        marginTop: 14
    },
    title: {
        fontSize: 19, color: '#262626', marginTop: 58, marginBottom: 18
    }
})