import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { COLORS } from '../../colors';


let { NAVBAR_COLOR } = COLORS;


export default class Navbar extends Component {
    render() {
        return (
            <View style={[
                styles.container,
                (!this.props.noShadow && styles.shadow),
                { backgroundColor: this.props.backgroundColor },
                (this.props.transparent && {
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    backgroundColor: 'transparent'
                }),
                this.props.style
            ]}>
                {this.props.children}
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: NAVBAR_COLOR,
        height: 44,
        position: 'relative',
        zIndex: 9999
    },
    shadow: {
        /*  shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 24,
          },
          shadowOpacity: 0.18,
          shadowRadius: 10.00,
          elevation: 24,*/
    }
});


Navbar.defaultProps = {
    backgroundColor: NAVBAR_COLOR
}
