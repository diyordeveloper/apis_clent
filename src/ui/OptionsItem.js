import React, { Component, Children } from 'react';
import { Image, View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default class OptionsItem extends Component {

    handlePressSelect = () => {
        const { id, onPress } = this.props;
        onPress(id);
    }

    render() {
        let { active, last, children } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePressSelect} style={[styles.container, { borderBottomWidth: last ? 0 : 1 }, this.props.style]}>
                {
                    active ?
                        <Image source={require('../source/icons/checkbox-little-active.png')} resizeMode={'contain'} style={styles.icon} />
                        :
                        <Image source={require('../source/icons/checkbox-little.png')} resizeMode={'contain'} style={styles.icon} />
                }

                <Text style={active ? styles.titleActive : styles.title}>{children}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#f9f9f9',
        borderStyle: 'solid'
    },
    icon: {
        width: 10,
        height: 10,
        marginRight: 8
    },
    title: {
        fontFamily: 'Gilroy-Regular'
    },
    titleActive: {
        color: '#FDB541',
        // fontWeight: '600',
        fontFamily: 'Gilroy-Bold',
    }

})
