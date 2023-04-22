import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem } from '../ui';
import { LittleText } from '../ui/Text';
import { observer, inject } from 'mobx-react/native';
import HTMLView from 'react-native-htmlview';


@inject('appStore')
@observer
export default class FaqTextScreen extends Component {
    state = {
        text: '',
        loading: true
    }


    componentDidMount() {
        const successCallback = (data) => {
            this.setState({ text: data.text, loading: false });
        }
        const errorCallback = (error) => {
            this.setState({ text: '', loading: false });
        }
        this.props.appStore.fetchWikiInfo(this.props.id, { successCallback, errorCallback });
    }

    render() {
        const { text, loading } = this.state;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title={this.props.title} style={{ flex: 1, justifyContent: 'flex-start' }} />
                </Navbar>
                {
                    loading === true ?
                        <ActivityIndicator />
                        :
                        <PageContent showsVerticalScrollIndicator={false}>
                            <View style={{ paddingHorizontal: 32, paddingTop: 20 }}>
                                <HTMLView
                                    value={`<div>${text}</div>`}
                                    stylesheet={styles}
                                />
                            </View>
                            {/* <View style={{ paddingHorizontal: 32 }}>
                                <LittleText style={{ color: '#000', marginVertical: 20}}>
                                    {text}
                                </LittleText>
                            </View> */}
                        </PageContent>
                }
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    div:{
        color: '#000',
        fontSize: 12,
        fontFamily:'Gilroy-Regular',
        fontWeight: '300'
    }
    // a: {
    //   fontWeight: '500',
    //   color: '#FF3366', // make links coloured pink
    // },
});