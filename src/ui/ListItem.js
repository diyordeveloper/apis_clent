// react-native-masked-text


import React, { Component, Children } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';


const ListItem = ({ children, onPress, big, style, icon, cancel, last }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[big ? styles.bigContainer : styles.container, { borderBottomWidth: last ? 0 : 1 }, style]}>
            {
                icon &&
                <Image source={icon} resizeMode={'contain'} style={styles.icon} />
            }
            <Text style={[(big ? styles.bigText : styles.text), (cancel && { color: '#FF6161' })]}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    container: {
        paddingVertical: 12,
        borderBottomColor: '#f0f0f0',
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bigContainer: {
        paddingVertical: 16,
        borderBottomColor: '#f0f0f0',
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        opacity: 0.72,
        fontSize: 12,
        fontFamily: 'Gilroy-Regular',
    },
    bigText: {
        color: '#000000',
        opacity: 0.72,
        fontSize: 15,
        fontFamily: 'Gilroy-Regular',
    },
    icon: {
        marginRight: 16,
        height: 22,
        width: 22
    }

})


export default ListItem;




