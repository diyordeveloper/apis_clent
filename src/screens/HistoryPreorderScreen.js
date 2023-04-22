import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, EmptyText } from '../ui';
import { observer, inject } from 'mobx-react/native';
import { COLORS } from '../colors';
import moment from 'moment';

@inject('appStore', 'orderStore', 'userStore')
@observer
export default class HistoryPreorderScreen extends Component {

    componentDidMount() {
        this.props.userStore.fetchPreorderHistory(1);
    }

    handleRefreshing = () => {
        this.props.userStore.setRefreshPreorderHistory(true);
        this.props.userStore.fetchPreorderHistory(1);
    }

    renderItem = ({ item, index }) => {
        return (
            <HistoryItem payment={item.payment_method} coordinates={item.coordinates} key={item.id + '_history_element'} title={moment(item.inning_at).format('DD MMMM, HH:mm')} after={item.cost + '₽'} onPress={() => LoadScreen('DriverPreOrderScreen', { id: item.id, data: item })} />
        )
    }

    render() {
        const { preorderHistory, refreshPreorderHistory, loadingPreorderHistory, infinitePreorderHistory } = this.props.userStore;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Предварительные заказы" />
                </Navbar>
                {
                    loadingPreorderHistory === true ?
                        <ActivityIndicator />
                        :
                        <FlatList
                            keyExtractor={(item, index) => 'peorder_' + index + '_' + item.id}
                            refreshControl={
                                <RefreshControl
                                    tintColor={COLORS.LOADER_IOS_COLOR}
                                    refreshing={refreshPreorderHistory}
                                    onRefresh={this.handleRefreshing}
                                    style={{ zIndex: 9999 }}
                                />
                            }
                            renderItem={this.renderItem}
                            data={preorderHistory.data}
                            style={{ paddingHorizontal: 32 }}
                            ListEmptyComponent={<EmptyText>Предварительные заказы отсутствуют.</EmptyText>}
                            ListFooterComponent={<View style={{ height: 50 }}></View>}
                            onEndReached={infinitePreorderHistory}
                        />
                }
            </Page>
        );
    }
}