import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { OptionsModal } from '../modals';

export default class OptionsScreen extends Component {


    render() {
        return (
            <Page>
                <OptionsModal />
            </Page>
        );
    }
}