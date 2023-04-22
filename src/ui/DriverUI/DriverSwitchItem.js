// react-native-masked-text


import React, { Component, Children } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Switch from './Switch';


class DriverSwitchItem extends Component {

   
    render() {

        let { style, children, last } = this.props;
        return (
            <View style={[styles.container, (last && { borderBottomWidth: 0 }), style]}>
                <Text style={styles.text}>{children}</Text>
                <Switch onChange={this.props.onChange} value={this.props.value} defaultValue={this.props.defaultValue} />
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        paddingVertical: 16,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontFamily: 'Gilroy-Regular',
        fontSize: 15, flex: 1
    }

})


export default DriverSwitchItem;




