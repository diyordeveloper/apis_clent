import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    // TouchableOpacity
} from 'react-native';
import { TouchableOpacity as TouchableOpacityRN } from 'react-native';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';




const CustomTouchableOpacity = ({ children, ...props }) => {
    let TouchableOpacity = ((Platform.OS == 'android') ? TouchableOpacityGesture : TouchableOpacityRN);
    return (
        <TouchableOpacity hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} {...props}>
            {children}
        </TouchableOpacity>
    )
};


export { CustomTouchableOpacity };