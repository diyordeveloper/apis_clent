import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar,
    Alert,
    Share
} from 'react-native';
import { Divider, MenuItem } from './ui';
import { isIphoneX } from 'react-native-push-notification-popup/src/utils';
import { LoadScreen } from './utils/AppTor';
import { ScrollView } from 'react-native-gesture-handler';
import { logout } from './requests/fetch';

let window = Dimensions.get('window');
let screen = Dimensions.get('screen');
const BOTTOM_NAVIGATION_ANDROID_HEIGHT = screen.height - window.height - StatusBar.currentHeight;

let { width, height } = Dimensions.get('window');


@inject('appStore')
@observer
export default class SwipeMenu extends Component {

    page = (page) => {
        LoadScreen(page);
    }

    handleLogout = () => {
        Alert.alert('Выход из профиля', 'Вы хотите выйти из профиля', [
            {
                text: 'Отмена',
                style: 'cancel'
            },
            {
                text: 'Подтвердить',
                onPress: logout
            }
        ])
    }

    handleShare = async() => {
        try {
            let shareContent = {};
            if(Platform.OS === 'ios'){
                shareContent = {
                    message: 'Apis - сервис заказа такси',
                    url: 'https://apps.apple.com/ru/app/apis-%D1%82%D0%B0%D0%BA%D1%81%D0%B8-%D0%B8-%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%B5%D1%80%D1%8B/id1556811662'
                }
            }else{
                shareContent = {
                    title: 'Apis - сервис заказа такси',
                    message: 'https://play.google.com/store/apps/details?id=moscow.apis.app'
                }
            }
            const result = await Share.share(shareContent);
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    console.log
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        const { avatar, full_name } = this.props.appStore.profile;
        return (
            <View style={styles.container}>

                <View style={{ paddingHorizontal: 32 }}>
                    <View style={[styles.profileContainer]}>
                        <View style={styles.imageCont}>
                            {
                                avatar ?
                                    <Image source={{ uri: avatar }} style={styles.image} />
                                    :
                                    <Image source={require('./source/user_placeholder.png')} style={styles.image} />
                            }
                        </View>
                        <Text style={styles.title}>{full_name == '' ? 'Не указано' : full_name}</Text>
                        <TouchableOpacity onPress={() => LoadScreen('ProfileScreen')}>
                            <Text style={styles.subtitle}>Посмотреть профиль</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 22, marginBottom: 0 }} />
                </View>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ height: 60 }}></View>
                    <View style={{ paddingHorizontal: 32 }}>
                        <MenuItem onPress={() => this.page('HistoryScreen')} icon={require('./source/icons/icon-car.png')}>История поездок</MenuItem>
                        <MenuItem onPress={() => this.page('PaymentScreen')} icon={require('./source/icons/icon-card.png')}>Оплата</MenuItem>
                    </View>
                    <MenuItem onPress={this.handleShare} active icon={require('./source/icons/icon-invite.png')} style={{ marginVertical: 8, marginHorizontal: 32 }}>Пригласить друга</MenuItem>
                    <View style={{ paddingHorizontal: 32 }}>
                        <MenuItem onPress={() => this.page('FaqScreen')} icon={require('./source/icons/icon-faq.png')}>Вопросы</MenuItem>
                        <MenuItem onPress={() => LoadScreen('SupportChatScreen')} icon={require('./source/icons/icon-chat-gray.png')}>Чат поддержки</MenuItem>
                        <MenuItem onPress={this.handleLogout} gray icon={require('./source/icons/icon-logout.png')}>Выйти</MenuItem>
                    </View>

                    {
                        Platform.OS === 'android' &&
                        <View style={{ height: 80 }}></View>
                    }
                </ScrollView>
                {/* <View style={{ paddingBottom: isIphoneX() ? 30 + 44 : 44 }}>
                </View> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbfbfb',
        paddingTop: isIphoneX() ? 44 : 22,
        flex: 1,
        paddingRight: width * 0.2
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 60
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
    },
    image: {
        height: 102,
        width: 102,
        borderRadius: 51,

    },
    title: {
        marginTop: 22,
        fontSize: 16,
        fontFamily: 'Gilroy-Regular'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Gilroy-Regular',
        color: '#B2B2B2',
        marginTop: 8
    }
})

