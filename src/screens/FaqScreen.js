import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, EmptyText } from '../ui';
import { observer, inject } from 'mobx-react/native';

@inject('appStore')
@observer
export default class FaqScreen extends Component {

    componentDidMount() {
        this.props.appStore.fetchWiki();
    }


    renderItem = ({ item, index }) => {
        const { wiki } = this.props.appStore;
        return (
            <ListItem big last={wiki.data.length === (index + 1)} onPress={() => { LoadScreen('FaqTextScreen', { id: item.id, title: item.name }) }}>{item.name}</ListItem>
        )
    }

    render() {
        const { loadingWiki, wiki } = this.props.appStore;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Вопросы" />
                </Navbar>
                {
                    loadingWiki === true ?
                        <ActivityIndicator />
                        :
                        <FlatList
                            keyExtractor={(item, index) => 'wiki_' + index + '_' + item.id}
                            showsVerticalScrollIndicator={false}
                            data={wiki.data}
                            style={{ paddingHorizontal: 32 }}
                            ListEmptyComponent={<EmptyText>Вопросы отсутствуют</EmptyText>}
                            renderItem={this.renderItem}
                        />
                }
            </Page>
        );
    }
}