import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
export default class MessageSend extends Component {
    render() {
        return (
            <View style={[{ alignItems: 'flex-end' }, this.props.style]}>
                <View style={styles.container}>
                    <Text style={{ fontFamily: 'Gilroy-Regular', color: '#fff', fontSize: 15 }}>{this.props.children}</Text>
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
        borderBottomLeftRadius: 26,
        backgroundColor: '#FDB541'
    },


})





