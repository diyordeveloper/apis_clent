import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Animated, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';



const PointMarker = ({ coords, time, innerText, ...props }) => {

    const circle_animated = new Animated.Value(0);

    const SIZE = 128;
    const circle_size = circle_animated.interpolate({
        inputRange: [0, 100],
        outputRange: [0, SIZE]
    });
    const circle_back = circle_animated.interpolate({
        inputRange: [0, 40, 100],
        outputRange: ['rgba(253, 181, 65,0.06)', 'rgba(253, 181, 65,0.12)', 'rgba(253, 181, 65,0.06)']
    });
    const circle2_size = circle_animated.interpolate({
        inputRange: [0, 100],
        outputRange: [0, SIZE / 2]
    });
    const circle2_opacity = circle_animated.interpolate({
        inputRange: [0, 40, 100],
        outputRange: [0.12, 0.18, 0.12]
    });

    return (
        <Marker coordinate={coords} anchor={{ x: 0.5, y: 1.1 }} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground
                source={require('../../source/point_order.png')}
                resizeMode={'contain'}
                style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}
            >
                {
                    (innerText && !time) &&
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', maxWidth: 45, marginBottom: 10 }}>{innerText}</Text>
                }
                {

                    (time && !innerText) &&
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ textAlign: 'center', fontSize: 11, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', width: 30, lineHeight: 10, marginBottom: 8 }}>{time}</Text>
                }
            </ImageBackground>
            {/* {
                    time &&
                    <Text style={{marginTop: -10, textAlign: 'center', fontSize: 16, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', maxWidth: 100 }}>{time}</Text>
                } */}
            {/* <View style={{
                position: 'relative',
                width: SIZE,
                height: SIZE,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible'
            }}>
                <Animated.View style={{ borderRadius: SIZE / 2, height: circle_size, width: circle_size, backgroundColor: circle_back, justifyContent: 'center', alignItems: 'center' }} >
                    <Animated.View style={{ borderRadius: SIZE / 4, opacity: circle2_opacity, height: circle2_size, width: circle2_size, backgroundColor: '#FDB541' }} />
                </Animated.View>
                <ImageBackground
                    source={require('../../source/point_order.png')}
                    resizeMode={'contain'}
                    style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: SIZE / 2 - 50, left: SIZE / 2 - 28 }}
                >
                    {
                        (innerText && !time) &&
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', maxWidth: 45, marginBottom: 10 }}>{innerText}</Text>
                    }
                    {

                        (time && !innerText) &&
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ textAlign: 'center', fontSize: 11, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', width: 30, lineHeight: 10, marginBottom: 8 }}>{time}</Text>
                    }
                </ImageBackground>
            </View> */}
        </Marker>
    )
}

PointMarker.defaultProps = {
    time: undefined,
    index: undefined
}

export default PointMarker;