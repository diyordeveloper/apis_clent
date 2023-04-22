import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';

@inject('orderStore')
@observer
export default class OrderOptionsButton extends Component {
    render() {
        const { selectedOptions } = this.props.orderStore;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.props.style]}>
                <Image source={require('../source/icons/icon-options.png')} style={{ width: 16, height: 16 }} />
                <Text style={styles.text}>{selectedOptions.length === 0 ? 'Добавить опции' : 'Изменить опции'}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4
    },
    text: {
        color: '#000000',
        fontFamily: 'Gilroy-Regular',
        fontSize: 16,
        // opacity: 0.59,
        marginLeft: 8
    }
})




