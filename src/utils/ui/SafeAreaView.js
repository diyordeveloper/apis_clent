import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import  {IOS_BAR_COLOR} from '../style';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class SafeAreaView extends Component {

    render() {
        
        return (
            <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
                <View style={styles.statusbar}>
                </View>
                <View style={{flex:1}}>
                {this.props.children}
                </View>
                <View style={styles.footer}>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footer:{
        backgroundColor:'red',
        ...ifIphoneX({
            height: 34
          }, {
            height: 0
            })
    },
    statusbar:{
        backgroundColor:'red',
        ...ifIphoneX({
            height: 44
          }, {
            height: 20
            })
    }
});

