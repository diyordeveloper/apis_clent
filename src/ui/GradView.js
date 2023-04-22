import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default class GradView extends Component {
    render() {
        return (
            <LinearGradient
                colors={this.props.disabled ? ['#ffd899', '#fce1b3'] : ['#FCB540', '#FDBF5A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 1 }}
                style={this.props.style}
            >
                {this.props.children}
            </LinearGradient>

        )
    }
}
