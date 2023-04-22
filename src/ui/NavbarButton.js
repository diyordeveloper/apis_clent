import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
export default class NavbarButton extends Component {
    render() {
        let { onPress, style, icon } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, { width: this.props.width, height: this.props.height }, style]}>
                <Image source={icon} resizeMode={'contain'} style={{ width: this.props.width, height: this.props.height }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

NavbarButton.defaultProps = {
    width: 44, height: 44
}




