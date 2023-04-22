import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { noop } from 'lodash';

export default class CloseButton extends Component {
    render() {
        let { onPress = noop, loading } = this.props;
        return (
            <TouchableOpacity onPress={loading ? noop : onPress} style={[this.props.style]}>
                {
                    loading === true ?
                        <ActivityIndicator color="#000" style={{ height: 40, width: 40 }} />
                        :
                        <Image source={require('../source/close-button.png')} style={styles.image} />
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    image: {
        height: 40,
        width: 40
    }
})




