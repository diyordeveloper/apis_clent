// react-native-masked-text


import React, { Component, Children } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import GradView from './GradView';

const MenuItem = ({ children, onPress, style, gray, active, icon }) => {

    if (active) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 19.84,
                    elevation: 5, borderRadius: 46,
                    overflow: 'hidden'
                }, style]}
            >
                <GradView style={{
                    paddingVertical: 14,
                    paddingLeft: 22,
                    borderRadius: 44,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {
                        icon &&
                        <Image source={icon} resizeMode={'contain'} style={styles.icon} />
                    }
                    <Text style={styles.textActive}>{children}</Text>
                </GradView>
            </TouchableOpacity>
        )
    }
    else
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
                {
                    icon &&
                    <Image source={icon} resizeMode={'contain'} style={styles.icon} />
                }
                <Text style={[styles.text, gray && { color: '#E1E7F0' }]}>{children}</Text>
            </TouchableOpacity>
        )
}


const styles = StyleSheet.create({

    container: {
        paddingVertical: 22,
        paddingLeft: 22,
        borderRadius: 44,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerActive: {
        paddingVertical: 16,
        paddingLeft: 22,
        borderRadius: 44,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Gilroy-Regular'
    },
    icon: {
        marginRight: 19,
        height: 22,
        width: 22
    },


    containerActive: {

    },
    textActive: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Gilroy-Regular'
    },


})


export default MenuItem;




