import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, EmptyText } from '../ui';
import { observer, inject } from 'mobx-react/native';
import { COLORS } from '../colors';

@inject('appStore', 'orderStore', 'userStore')
@observer
export default class HistoryScreen extends Component {


    componentDidMount() {
        this.props.userStore.fetchOrderHistory();
    }


    handleRefreshing = () => {
        this.props.userStore.setRefreshOrderHistory(true);
        this.props.userStore.fetchOrderHistory();
    }

    render() {
        const { refreshOrderHistory, orderHistory, loadingOrderHistory } = this.props.userStore;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="История" />
                </Navbar>
                {
                    loadingOrderHistory === true ?
                        <ActivityIndicator />
                        :
                        <PageContent
                            refreshControl={
                                <RefreshControl
                                    tintColor={COLORS.LOADER_IOS_COLOR}
                                    refreshing={refreshOrderHistory}
                                    onRefresh={this.handleRefreshing}
                                    style={{ zIndex: 9999 }}
                                />
                            }
                            style={{ paddingHorizontal: 32 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                orderHistory.length === 0 ?
                                    <EmptyText>Заказы отсутствуют.</EmptyText>
                                    :
                                    orderHistory.map((item, index) => {
                                        return (
                                            <HistoryItem coordinates={item.coordinates} key={item.id + '_history_element'} title={item.created_at} after={item.cost + '₽'} onPress={() => LoadScreen('DetailScreen', { id: item.id })} />
                                        )
                                    })
                            }
                        </PageContent>
                }
            </Page>
        );
    }
}