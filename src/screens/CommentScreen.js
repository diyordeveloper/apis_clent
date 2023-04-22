import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack, sendToast } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { MessageBar, KeyboardAvoidingChat } from '../ui';
import { observer, inject } from 'mobx-react/native';

let { width, height } = Dimensions.get('window');

@inject('appStore', 'orderStore')
@observer
export default class CommentScreen extends Component {
    state = {
        comment: ''
    }

    componentDidMount() {
        const { comment } = this.props.orderStore;
        if (comment !== undefined) {
            this.setState({ comment });
        }
    }

    handleComment = text => this.setState({ comment: text });

    handleSendComment = () => {
        const { comment } = this.state;
        if (comment == '') {
            sendToast('Заполните поле с комментарием!', 'Ошибка сохранениия комментария');
            return;
        }
        this.props.orderStore.setComment(comment);
        goBack();
    }

    render() {
        const { comment } = this.state;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Комментарий" />
                </Navbar>
                <PageContent onePageAware >
                    <View style={{flex: 1}}></View>
                    <MessageBar value={comment} onChangeText={this.handleComment} onPressSend={this.handleSendComment} />
                </PageContent>
            </Page>
        );
    }
}