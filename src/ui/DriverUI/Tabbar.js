import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

let { width, height } = Dimensions.get('window');



const TabButton = ({ icon, onPress, style, title }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Image source={icon} resizeMode={'contain'} style={{ width: 26, height: 26 }} />
            <Text style={{ color: '#a5a5a5', fontFamily: 'Gilroy-Regular', fontSize: 12, marginTop: 5 }}>{title}</Text>
        </TouchableOpacity>
    )
}
const Tabbar = ({ onChange, tabs }) => {

    return (
        <View style={{
            width: width,
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 78,
            backgroundColor: '#fbfbfb',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: -15,
            },
            shadowOpacity: 0.08,
            shadowRadius: 15.00,
            elevation: 24

        }}>
            {
                tabs.map((item, index) => {
                    return (
                        <TabButton onPress={() => onChange(index)} icon={item.icon} title={item.title} />
                    )
                })
            }

        </View>
    )
}



export { Tabbar, TabButton }