import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';


export default class Shadow extends Component {
    render() {
        return (
            <View>
                <View style={styles.shadowFirst}>
                    <View style={styles.shadowSecond}></View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({



    shadowFirst: {
        borderTopLeftRadius: 47,
        borderTopRightRadius: 47,
        height: 50,
        backgroundColor: '#E0E0E0',
        opacity: 0.53,
        position: 'relative',
        alignItems: 'center'
    },
    shadowSecond: {
        borderTopLeftRadius: 47,
        borderTopRightRadius: 47,
        height: 50,
        backgroundColor: '#ff9500',
        opacity: 0.53,
        width: '110%'        
    }
})






