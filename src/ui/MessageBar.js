import React, { Component } from 'react';
import { StyleSheet, Image, TextInput, View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { noop } from 'lodash';

let { height, width } = Dimensions.get('window');

const MessageBar = ({ value, onChangeText = noop, onPressSend = noop, style = {}, placeholder, onBlur = noop }) => {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                multiline={true}
                underlineColorAndroid='transparent'
                value={value}
                onChangeText={onChangeText}
                placeholder={'Напишите комментарий' || placeholder}
                placeholderTextColor={'#a5a5a5'}
                style={[styles.input, { maxHeight: height * 0.4 }]}
                blurOnSubmit={true}
                onBlur={onBlur}
                style={styles.input}
            />
            <TouchableOpacity onPress={onPressSend}>
                <Image source={require('../source/send-button.png')} style={{ width: 59, height: 44 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 32,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 36,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 16,
        paddingVertical: Platform.OS == 'ios' ? 14 : 8,
        fontFamily: 'Gilroy-Regular'
        // textAlignVertical: 'bottom'
    },

})

export default MessageBar;