import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ActivityIndicator, View, Image, Text, TouchableOpacity } from 'react-native';
import { GradView } from '.';
import { CustomTouchableOpacity } from './CustomTouchableOpacity';

export default class Button extends Component {


    render() {
        let { onPress, children, loading, disabled, icon, gray } = this.props;

        if (gray)
            return (
                <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.cont, { shadowOpacity: 0, elevation: 0 },(disabled ? {opacity: 0.5} : {}), this.props.style]}>
                    {
                        loading === true ?
                            <View style={[styles.container, { backgroundColor: '#ECECEC' }]}>
                                <ActivityIndicator color="#fff"/>
                            </View>
                            :
                            <View style={[styles.container, { backgroundColor: '#ECECEC' }]}>
                                <Text style={[styles.text, { color: '#BEBEBE' }]}>{children}</Text>
                                {
                                    icon &&
                                    <Image source={icon} resizeMode={'contain'} style={{ width: 19, height: 19, marginLeft: 8 }} />
                                }
                            </View>
                    }
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.cont, this.props.style]}>
                    {
                        loading === true ?
                            <GradView style={[styles.container]} disabled={disabled}>
                                 <ActivityIndicator color="#fff"/>
                            </GradView>
                            :
                            <GradView style={[styles.container]} disabled={disabled}>
                                <Text style={styles.text}>{children}</Text>
                                {
                                    icon &&
                                    <Image source={icon} resizeMode={'contain'} style={{ width: 19, height: 19, marginLeft: 8 }} />
                                }
                            </GradView>
                    }
                </TouchableOpacity>
            )
    }
}

const styles = StyleSheet.create({

    cont: {
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 19.84,

        elevation: 5,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 48,
        borderRadius: 24,
    },
    text: {
        color: '#ffffff',
        fontFamily: 'Gilroy-Bold',
        fontSize: 16,
        fontWeight: '600'
    }
})




