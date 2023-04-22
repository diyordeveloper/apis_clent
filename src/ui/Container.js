import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
export default class Container extends Component {
    render() {
        let { children, style } = this.props;
        return (
            <View style={[styles.container, style]}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
})




