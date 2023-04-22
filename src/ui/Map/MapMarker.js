import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Animated, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';



const MapMarker = ({ coords, time, innerText, ...props }) => {
    return (
        <Marker coordinate={coords} anchor={{ x: 0.5, y: 0.5 }} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground
                source={require('../../source/point.png')}
                resizeMode={'contain'}
                style={{ width: 55, height: 55, justifyContent: 'center', alignItems: 'center' }}
            >
                {
                    (innerText && !time) &&
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', maxWidth: 45, marginBottom: 5 }}>{innerText}</Text>
                }
                {

                    (time && !innerText) &&
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ textAlign: 'center', fontSize: 11, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', width: 30,lineHeight: 10, marginBottom: 5 }}>{time}</Text>
                }
            </ImageBackground>
            {/* {
                    time &&
                    <Text style={{marginTop: -10, textAlign: 'center', fontSize: 16, fontWeight: '600', fontFamily: 'Gilroy-Regular', color: '#000', maxWidth: 100 }}>{time}</Text>
                } */}
        </Marker>
    )
}

MapMarker.defaultProps = {
    time: undefined,
    index: undefined
}

export default MapMarker;