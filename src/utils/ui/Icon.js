

import React, { Component } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export default class Icon extends Component {


    render() {
        let type = this.props.type || 'none';
        switch(type){
            case 'Ionicons': return(
            <Ionicons {...this.props} /> 
            ); break;
            case 'MaterialIcons': return(
                <MaterialIcons {...this.props} /> 
                ); break;

            default: return(
                <Ionicons {...this.props} /> 
                ); break;
        
        }
        
        
      
    }
}

