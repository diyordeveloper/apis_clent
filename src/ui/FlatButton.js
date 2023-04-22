import React, { Component } from 'react';

import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';


export default class FlatButton extends Component {

    render() {
        let { onPress, disabled, icon, title, style } = this.props;
        return (
            <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, style]}>
                {
                    icon &&
                    <Image source={icon} resizeMode={'contain'} style={styles.icon} />
                }
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#ff9500',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,

        borderWidth: 2,
        borderColor: '#FAFAFA',
        borderStyle: 'solid',

        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000000',
        // opacity: 0.58,
        fontFamily: 'Gilroy-Regular'

    },
    icon: { width: 22, height: 22,   marginBottom: 8 }
})




