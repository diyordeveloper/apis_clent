import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack, sendToast, getPaymentName } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, CreditCard, AddCardButton, CashItem } from '../ui';
import { observer, inject } from 'mobx-react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../colors';
import { map } from 'lodash';
import { Alert } from 'react-native';


@inject('userStore', 'orderStore', 'appStore')
@observer
export default class PaymentScreen extends Component {


    componentDidMount() {
        this.fetchPaymentsTypes();
    }

    fetchPaymentsTypes = () => {
        this.props.userStore.initPaymentsTypes();
    }

    handleSetCash = (id) => {
        const { profile, updateUser, setProfile } = this.props.appStore;

        const errorCallback = () => {
            setProfile({
                ...profile,
                payment_method: 1
            });
        }

        if (profile.payment_method !== 2) {
            const body = {
                phone: profile.phone,
                payment_method: 2
            };

            setProfile({
                ...profile,
                payment_method: 2
            });

            updateUser(body, { errorCallback });
        }
    }

    handleSetCard = (id) => {
        const { profile, setProfile, updateUser } = this.props.appStore;
        const { fetchCurrentCards, changeCurrentCard, currentCard, fetchUserCards, setCurrentCards } = this.props.userStore;

        const successCallback = (json) => {
            console.log(json, profile);
            fetchCurrentCards();
            fetchUserCards();
            if (profile.payment_method !== 1) {
                const body = {
                    phone: profile.phone,
                    payment_method: 1
                };

                setProfile({
                    ...profile,
                    payment_method: 1
                })

                updateUser(body, {});
            }
        }

        const errorCallback = () => {
            sendToast('Произошла ошибка, попробуйте еще раз', 'Выбор способа оплаты')
        }

        if (profile.payment_method === 2) {
            if (currentCard.id !== id) {
                setCurrentCards({ ...currentCard, id: id });
                changeCurrentCard(id, { successCallback, errorCallback });
            } else {
                const body = {
                    phone: profile.phone,
                    payment_method: 1
                };

                setProfile({
                    ...profile,
                    payment_method: 1
                });

                updateUser(body, { errorCallback });
            }
        } else {
            if (currentCard.id !== id) {
                setCurrentCards({ ...currentCard, id: id });
                changeCurrentCard(id, { successCallback, errorCallback });
            }
        }
    }

    handleToAddCard = () => {
        LoadScreen('AddCardScreen');
    }

    handleRefreshing = () => {
        const { setRefreshingPaymentsTypes } = this.props.userStore;
        setRefreshingPaymentsTypes(true);
        this.fetchPaymentsTypes();
    }

    handleDeleteCard = (id) => {
        const { deleteUserCard, currentCard, setCurrentCards, fetchUserCards } = this.props.userStore;

        const successCallback = () => {
            if (currentCard.id === id) {
                setCurrentCards({});
            }
            fetchUserCards();
        }

        const errorCallback = () => {

        }

        Alert.alert(
            'Удаление карты',
            'Вы хотите удалить карту?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                { text: 'Удалить', onPress: () => deleteUserCard(id, { successCallback, errorCallback }) }
            ]
        )
    }

    render() {
        const { paymentsTypes, loadingPaymentsTypes, userCards, refreshingPaymentTypes, currentCard } = this.props.userStore;
        const { payment_method } = this.props.appStore.profile;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Cпособ оплаты" />
                </Navbar>
                {
                    loadingPaymentsTypes === true ?
                        <ActivityIndicator color={COLORS.LOADER_IOS_COLOR} />
                        :
                        <PageContent
                            refreshControl={
                                <RefreshControl
                                    tintColor={COLORS.LOADER_IOS_COLOR}
                                    refreshing={refreshingPaymentTypes}
                                    onRefresh={this.handleRefreshing}
                                    style={{ zIndex: 9999 }}
                                />
                            }
                        >
                            {/* <View style={styles.container}>
                                {
                                    userCards.data.map((el, index) => {
                                        return (
                                            <CreditCard onLongPress={this.handleDeleteCard} active={(payment_method === 2 && currentCard && currentCard.id === el.id) ? true : false} id={el.id} onPress={this.handleSetCard} key={el.card + '_card_' + index} firstNumber={el.card.split('**')[0].substr(0, 4)} lastNumber={el.card.split('**')[1]} />
                                        )
                                    })
                                }
                                <AddCardButton onPress={this.handleToAddCard} />
                            </View>
                            <CashItem active={payment_method === 1} id={1} onPress={this.handleSetCash} /> */}

                            {
                                map(paymentsTypes, (item, key) => {
                                    if (key == 2) {
                                        return <CashItem key={'payment_method_' + key} active={payment_method === 2} id={key} onPress={this.handleSetCash} />
                                    } else if (key == 1) {
                                        return (
                                            <View key={'payment_method_' + key} style={styles.container}>
                                                {
                                                    userCards.data.map((el, index) => {
                                                        return (
                                                            <CreditCard paymentType={getPaymentName(el.card)} onLongPress={this.handleDeleteCard} active={(payment_method === 1 && currentCard && currentCard.id === el.id) ? true : false} id={el.id} onPress={this.handleSetCard} key={el.card + '_card_' + index} firstNumber={el.card.substr(0, 4)} lastNumber={el.card.substr(el.card.length - 4, el.card.length)} />
                                                        )
                                                    })
                                                }
                                                <AddCardButton onPress={this.handleToAddCard} />
                                            </View>
                                        )
                                    }
                                })
                            }
                        </PageContent>
                }
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 47,
        borderBottomRightRadius: 47,
        backgroundColor: '#fbfbfb',

        padding: 32,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 31.00,

        elevation: 12
    }
})