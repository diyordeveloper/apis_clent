

import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../colors';




export default class Spinner extends Component {
    render() {
        let { big, size, style } = this.props;

        let { LOADER_IOS_COLOR } = COLORS;
        return (
            <View style={[styles.container, (big && { flex: 1 }), style]}>
                <ActivityIndicator size={size} color={LOADER_IOS_COLOR} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})

Spinner.defaultProps = {
    size: 'large'
}



