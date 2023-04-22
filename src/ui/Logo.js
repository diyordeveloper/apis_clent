import React, { Component } from 'react';
import { View, Image } from 'react-native';
const Logo = ({ style }) =>
    <View style={[{ alignItems: 'center' }, style]}>
        <Image source={require('../source/logo.png')} resizeMode={'contain'} style={{ width: 76, height: 162 }} />
    </View>


export default Logo;