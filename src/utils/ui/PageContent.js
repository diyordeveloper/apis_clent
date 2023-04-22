import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var { height, width } = Dimensions.get('window');
import { isIphoneX } from 'react-native-iphone-x-helper'

export default class PageContent extends Component {

    render() {
        if (this.props.onePage) {
            return (
                <KeyboardAwareScrollView enabled={Platform.OS == 'ios'} extraHeight={100} keyboardShouldPersistTaps={'handled'}  {...this.props} style={[styles.container, this.props.style]}>
                    <View  {...this.props} style={{ height: height - 44, width }}>
                        {this.props.children}
                    </View>
                </KeyboardAwareScrollView>
            )
        } else
            if (this.props.onePageAware) {
                return (
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                        <KeyboardAvoidingView enabled behavior="padding" {...this.props} style={[styles.container, this.props.style]}>
                            {this.props.children}
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                )
            } else
                if (this.props.noAvoid)
                    return (
                        <ScrollView keyboardShouldPersistTaps={'handled'}  {...this.props} style={[styles.container, this.props.style]}>
                            {this.props.children}
                        </ScrollView>
                    )
                else
                    return (
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                            <KeyboardAwareScrollView enabled={Platform.OS == 'ios'} extraHeight={100}  {...this.props} style={[styles.container, this.props.style]}>
                                {this.props.children}
                            </KeyboardAwareScrollView>
                        </TouchableWithoutFeedback>
                    );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    }
});
