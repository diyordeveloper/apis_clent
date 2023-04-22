// react-native-masked-text


import React, { Component, Children } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';


const DriverListItem = ({ children, onPress, big, after, style, icon, cancel, last }) => {
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} style={[big ? styles.bigContainer : styles.container, { borderBottomWidth: last ? 0 : 1 }, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {
                    icon &&
                    <Image source={icon} resizeMode={'contain'} style={styles.icon} />
                }
                <Text style={[big ? styles.bigText : styles.text, (cancel && { color: '#FF6161' })]}>{children}</Text>
            </View>

            {
                after &&
                <Text style={{ color: '#D8D8D8', fontFamily: 'Gilroy-Regular', fontSize: 15 }}>{after}</Text>
            }
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
        paddingVertical: 18,
        borderBottomColor: '#f0f0f0',
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Gilroy-Regular',
        color: '#000000',
        opacity: 0.72,
        fontSize: 12,
    },
    bigText: {
        fontFamily: 'Gilroy-Regular',
        color: '#000000',
        // opacity: 0.72,
        fontSize: 15,
    },
    icon: {
        marginRight: 16,
        height: 22,
        width: 22
    }

})


export default DriverListItem;




