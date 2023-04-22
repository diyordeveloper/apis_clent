




import React, { Component } from 'react';
import { View, Animated, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

const TIME = 250;
export default class Switch extends Component {

    toogle_left = new Animated.Value(0);


    on() {
        Animated.timing(this.toogle_left, { toValue: 100, duration: TIME, }).start();
    }
    off() {
        Animated.timing(this.toogle_left, { toValue: 0, duration: TIME, }).start();
    }


    componentDidMount() {
        if (this.props.value === true) {
            this.on();
        }
        else {
            this.off();
        }


        if (this.props.defaultValue === true) {
            this.on();
        }
        else {
            this.off();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            if (this.props.value === true) this.on(); else this.off();
        }
    }

    tap = () => {
        // if (this.props.value === true) this.on();
        // if (this.props.value === false) this.off();
        if (this.props.onChange) this.props.onChange(!this.props.value);
    }

    render() {
        const toogle_A = this.toogle_left.interpolate({
            inputRange: [0, 100],
            outputRange: [3, 26]
        });
        const toogle_back_toogle = this.toogle_left.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgb(240,240,240)', 'rgb(139,191,115)']
        });
        const toogle_back_back = this.toogle_left.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgb(211,211,211)', 'rgb(212,244,197)']
        });

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.tap}
                style={[styles.tch, this.props.style]}
            >
                <Animated.View style={[styles.container, { backgroundColor: toogle_back_back }]}>
                    <Animated.View style={[styles.circle, { left: toogle_A, backgroundColor: toogle_back_toogle }]}></Animated.View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}



const styles = StyleSheet.create({
    tch: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        width: 51,
        height: 28,
        shadowOpacity: 0.20,
        shadowRadius: 19.84,

        elevation: 5,
    },
    container: {
        width: 51,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#d3d3d3',
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        top: 3,
        height: 22,
        width: 22,
        borderRadius: 11,
        backgroundColor: '#f0f0f0'
    }
})