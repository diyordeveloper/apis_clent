
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Animated } from 'react-native';
import { Marker } from 'react-native-maps';


export default class MyMarker extends Component {

    circle_animated = new Animated.Value(0);

    componentDidMount() {




        this.animateMarker();
    }


    animateMarker() {

        Animated.loop(
            Animated.sequence([
                Animated.delay(1000),
                Animated.timing(this.circle_animated, { toValue: 100, duration: 1000, }),
                Animated.timing(this.circle_animated, { toValue: 0, duration: 10, })
            ])
        ).start();
    }


    render() {

        const SIZE = 128;
        const circle_size = this.circle_animated.interpolate({
            inputRange: [0, 100],
            outputRange: [0, SIZE]
        });
        const circle_back = this.circle_animated.interpolate({
            inputRange: [0, 40, 100],
            outputRange: ['rgba(253, 181, 65,0.06)', 'rgba(253, 181, 65,0.12)', 'rgba(253, 181, 65,0.06)']
        });
        const circle2_size = this.circle_animated.interpolate({
            inputRange: [0, 100],
            outputRange: [0, SIZE / 2]
        });
        const circle2_opacity = this.circle_animated.interpolate({
            inputRange: [0, 40, 100],
            outputRange: [0.12, 0.18, 0.12]
        });


        return (
            <Marker key={'markeruser'} coordinate={this.props.coords} anchor={{ x: 0.5, y: 0.5 }}>
                <View style={{
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
                    <Image
                        source={require('../../source/position.png')}
                        resizeMode={'contain'}
                        style={{ width: 28, height: 28, position: 'absolute', top: SIZE / 2 - 14, left: SIZE / 2 - 14 }} />
                </View>
            </Marker>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '600'
    }
})







