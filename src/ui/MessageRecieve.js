import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
export default class MessageRecieve extends Component {
    render() {
        return (
            <View style={[{ alignItems: 'flex-start' }, this.props.style]}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: 'Gilroy-Regular', color: '#5C5C5C', fontSize: 15 }}>{this.props.children}</Text>
                </View>
                <Text style={{ fontFamily: 'Gilroy-Regular', opacity: 0.55, fontSize: 13, marginTop: 8 }}>23:00</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        borderBottomRightRadius: 26,
        backgroundColor: '#F6F6F6'
    },


})





