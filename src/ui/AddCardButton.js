import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

export default class AddCardButton extends Component {
    render() {

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.props.style]}>
                <Text style={styles.text}>Добавить карту</Text>
                <Image source={require('../source/icons/icon-add-outline.png')} resizeMode={'contain'} style={styles.icon} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 24,

        borderRadius: 12,
        height: 54,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    text: {
        opacity: 0.51,
        fontSize: 15,
        fontFamily:'Gilroy-Regular'
    },
    icon: {
        width: 24,
        height: 24
    }
})




