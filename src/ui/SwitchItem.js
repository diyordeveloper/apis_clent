// react-native-masked-text


import React, { Component, Children } from 'react';
import { StyleSheet, Text, View, Switch, Platform, TouchableOpacity, Image } from 'react-native';


class SwitchItem extends Component {

    onValueChange = () => {
        const {checked, onValueChange} = this.props;
        onValueChange(!checked);
    };

    render() {

        let { style, children, checked = false } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Text style={styles.text}>{children}</Text>

                <TouchableOpacity onPress={this.onValueChange} style={{ marginTop: 5 }}>
                    {checked ?
                        <Image source={require('../source/switch-on.png')} style={{ width: 71, height: 48 }} resizeMode={'contain'} />
                        :
                        <Image source={require('../source/switch-off.png')} style={{ width: 71, height: 48 }} resizeMode={'contain'} />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderBottomColor: '#f9f9f9',
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontFamily: 'Gilroy-Regular',
        opacity: 0.72,
        fontSize: 15, flex: 1
    }

})


export default SwitchItem;




