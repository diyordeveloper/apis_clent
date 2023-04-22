import React, { Component } from 'react';
import { View, Dimensions, Text, KeyboardAvoidingView, Keyboard, Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { isIphoneX } from 'react-native-push-notification-popup/src/utils';

let { width, height } = Dimensions.get('window');


const Traffic = ({ onPress }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 48,
                width: 48,
                borderRadius: 24,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.08,
                shadowRadius: 21.00,
                elevation: 12,
                position: 'absolute',
                right: 21,
                top: 80 + (isIphoneX() ? 44 : 22) 
            }}
        >
            <Image source={require('../../source/driver/traffic.png')} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
    )
}


export default Traffic;