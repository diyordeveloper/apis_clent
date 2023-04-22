import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import  {IOS_BAR_COLOR,IOS_BAR_COLOR_BORDER} from '../style';
export default class Tabbar extends Component {


    render() {

        return (
          
            <View style={[styles.container, {height: this.props.labels ? 50 : 44}]}>        
                {this.props.children}
            </View>
          
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingLeft:8,
        paddingRight:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: IOS_BAR_COLOR,
        height:  44, 
        borderColor: IOS_BAR_COLOR_BORDER || this.props.backgroundColor,
        borderBottomWidth:1,
        borderTopWidth:1
    }
});

