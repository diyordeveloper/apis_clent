




import React, { Component } from 'react';
import { View, Animated, Image, Dimensions } from 'react-native'
// import Animated from 'react-native-reanimated';
import { EventEmitter } from '../utils';


let { width, height } = Dimensions.get('window');

export default class FrontView extends Component {

    animated_Border_Radius = new Animated.Value(0);




    componentDidMount() {

        EventEmitter.subscribe('menu_opened', () => {
            Animated.timing(this.animated_Border_Radius, { toValue: 100, duration: 300, }).start();
        })
        EventEmitter.subscribe('menu_closed', () => {
            Animated.timing(this.animated_Border_Radius, { toValue: 0, duration: 300, }).start();
        })
    }
    render() {

        const BORDER_RADIUS_A = this.animated_Border_Radius.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 48]
        });
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <Image source={require('../source/shadow-menu.png')} resizeMode={'contain'} style={{ position: 'absolute', left: -40, top: height * 0.1, width: 108, height: height * 0.8 }} />
                <Animated.View style={{ borderRadius: BORDER_RADIUS_A, borderBottomLeftRadius: BORDER_RADIUS_A, borderBottomRightRadius: BORDER_RADIUS_A, flex: 1, overflow: 'hidden' }}>
                    {this.props.children}
                </Animated.View>
            </View>
        )
    }
}
