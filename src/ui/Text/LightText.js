import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class LightText extends Component {
    render() {
        return (
            <Text {...this.props} style={[styles.text,this.props.style]}>{this.props.children}</Text>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#9E9E9E',
        fontSize: 14,
        fontWeight: '300'
    }
})




