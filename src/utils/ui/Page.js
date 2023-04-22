import React, { Component } from 'react';
import {
    View,
    Platform,
    StatusBar,
    StyleSheet,
    Dimensions
} from 'react-native';

import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLORS } from '../../colors';
// import WindowGuard from 'react-native-window-guard';






let window = Dimensions.get('window');
let screen = Dimensions.get('screen');


const BOTTOM_NAVIGATION_ANDROID_HEIGHT = screen.height - window.height - StatusBar.currentHeight;




let { SAFE_BOTTOM_COLOR, SAFE_TOP_COLOR, PAGE_BACK_COLOR, BAR_STYLE, NAVBAR_COLOR } = COLORS;
console.log(COLORS);



const CONTAINER_MARGIN_TOP = (
    Platform.OS === 'ios'
        ?
        isIphoneX() ? 44 : 22
        :
        0);

const CONTAINER_MARGIN_BOTTOM = ((Platform.OS === 'ios') ? (isIphoneX() ? 30 : 0) : 0);

const SafeArea = ({ children, top, bottom, topColor, bottomColor }) => {

    // WindowGuard.requestWindowInsets();
    // if (Platform.OS === 'android') {

    //     return (
    //         <WindowGuard
    //             style={{ flex: 1 }}
    //             applyInsets={WindowGuard.vertical}
    //         >
    //             {children}
    //         </WindowGuard>
    //     )
    // }
    // else
    return (
        <View
            style={[{ flex: 1 }]}
        >
            {top != undefined && <View style={{ backgroundColor: top.length > 0 ? top : topColor, height: CONTAINER_MARGIN_TOP }}>

            </View>}
            {children}
            {bottom != undefined && <View style={{ backgroundColor: bottom.length > 0 ? bottom : bottomColor, height: CONTAINER_MARGIN_BOTTOM }}>
        
            </View>}


            {/* <View style={{ height: BOTTOM_NAVIGATION_ANDROID_HEIGHT }} /> */}

        </View>
    )
}

export default class Page extends Component {

    componentDidMount() {

        


    }
    render() {
        return (
            <SafeArea
                top={this.props.hideTop ? undefined : true}
                bottom={this.props.hideBottom ? undefined : true}
                bottomColor={this.props.safeBottomColor}
                topColor={this.props.withNavbar ? NAVBAR_COLOR : this.props.safeTopColor}
            >
                <StatusBar
                    barStyle={this.props.barStyle}
                    backgroundColor={this.props.statusBarBackgroundColor}
                />
                <View style={[styles.container, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
                    {this.props.children}
                </View>
            </SafeArea>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb'
    }
});


Page.defaultProps = {
    backgroundColor: PAGE_BACK_COLOR,
    barStyle: BAR_STYLE,
    statusBarBackgroundColor: SAFE_TOP_COLOR,
    safeBottomColor: SAFE_BOTTOM_COLOR,
    safeTopColor: SAFE_TOP_COLOR
}



