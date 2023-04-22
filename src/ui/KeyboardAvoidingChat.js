import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, } from 'react-native';

export default class KeyboardAvoidingChat extends Component {


    componentDidMount() {


    }
    render() {
        return (
            <KeyboardAvoidingView
                enabled
                behavior="padding"
                keyboardShouldPersistTaps={'always'}
                style={{ flex: 1 }}
            >
                {this.props.children}
            </KeyboardAvoidingView >
        );
    }
}