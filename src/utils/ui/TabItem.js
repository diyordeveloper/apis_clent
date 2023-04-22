import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import  {IOS_BAR_COLOR,IOS_BAR_COLOR_BORDER, ISO_BAR_ICON_COLOR} from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '../AppTor';

export default class TabItem extends Component {
    componentDidMount(){
        console.log(this.props);
    }

    render() {

        return (
         
            <View style={styles.container}>
            
                {this.props.icon && <TouchableOpacity>
                <View style={styles.linkItem}>
                <Icon name={this.props.icon}  size={28} color={ISO_BAR_ICON_COLOR} />
                </View>
                </TouchableOpacity>}
                   
                {this.props.title && <Text style={styles.title}>{this.props.title}</Text>}
                {this.props.children}
            </View>
        
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop:4,
        marginBottom:4,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        minWidth:44,
        minHeight:44
    },
    title:{
        color:IOS_BAR_COLOR_BORDER,
        fontSize: 10
    
    }});

