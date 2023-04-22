import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { noop } from 'lodash';

let { width, height } = Dimensions.get('window');

export default class ModalContainer extends Component {


    render() {

        let { margin, height, style = {}, bottomRadius = false } = this.props;
        return (
            <View style={[{ position: 'relative', zIndex: 999 }]}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../source/shadow.png')}
                        style={{
                            width: '80%',
                            height: 28,
                            marginBottom: -5
                        }}
                        resizeMode={'stretch'}
                    />
                </View>
                <View style={[styles.container, (bottomRadius && { borderRadius: 47 }), (height ? { height } : {}), style]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 0,
        borderTopLeftRadius: 47,
        borderTopRightRadius: 47,


        backgroundColor: '#ffffff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.08,
        shadowRadius: 15.00,

        elevation: 12,
    },



})