import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { GradView } from '.';


export default class SmallCard extends Component {
    handlePress = () => {
        this.props.onPress(this.props.id);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress} onLongPress={this.props.onLongPress} style={[styles.container, this.props.style]}>
                <ImageBackground source={this.props.image} resizeMode={'cover'} style={[{ width: '100%', height: '100%' }]}>
                    <View style={[{ paddingLeft: 13, paddingVertical: 12 }, (this.props.active ? { backgroundColor: 'rgba(252,181,64,0.15)', borderRadius: 12 } : {})]}>
                        <Text style={styles.title}>{this.props.name}</Text>
                        <Text style={styles.subtitle}>{this.props.cost + '₽'}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        // overflow: 'hidden',

        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        width: 130,
        height: 68,

        backgroundColor: '#fff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10.35,
    },
    image: {
        width: 125,
        height: 45,
    },
    title: {
        color: '#a9a9a9',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Gilroy-Bold',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Gilroy-Regular',
    }
})




