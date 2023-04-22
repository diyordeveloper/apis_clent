import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Keyboard
} from 'react-native';
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper';
 


export default class Toolbar extends Component {
state={
    bottom:0
}

    componentDidMount() {
        if(Platform.OS == 'ios'){
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardWillShow',
          this._keyboardDidShow.bind(this),
        );
         this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardWillHide',
          this._keyboardDidHide.bind(this),
        );
        }
      }
    
      componentWillUnmount() {
        if(this.keyboardDidShowListener) this.keyboardDidShowListener.remove();
        if(this.keyboardDidHideListener) this.keyboardDidHideListener.remove();
      }

      _keyboardDidShow() {
     
        this.setState({
            bottom: isIphoneX() ? 44 : 20
          });
      }
    
      _keyboardDidHide() {
        this.setState({
            bottom: 0
          });
      }
    
      

    render() {
        return (
            <View style={[this.props.style, {bottom:this.state.bottom}]}>
                {this.props.children}
            </View>

        );
    }
}

