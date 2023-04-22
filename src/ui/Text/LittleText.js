import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class LittleText extends Component {
    render() {
        return (
            <Text {...this.props} style={[styles.text, this.props.style]}>{this.props.children}</Text>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#9c9c9c',
        fontSize: 12,
        fontFamily:'Gilroy-Regular',
        fontWeight: '300'
    }
})




