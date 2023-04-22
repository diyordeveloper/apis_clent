// react-native-masked-text


import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Platform, Text, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { noop } from 'lodash';
import { CustomTouchableOpacity } from '.';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const PhoneInput = ({ style, onChangeText, onSubmitEditing, placeholder, value }) => {
    return (
        <View style={[styles.container, style]}>
            <Image
                source={require('../source/icons/icon-phone.png')}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    width: 14,
                    height: 14
                }}
            />
            <TextInputMask
                autoCompleteType={'off'}
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder={'Ваш номер телефона' || placeholder}
                onChangeText={onChangeText}
                value={value}
                type={'custom'}
                options={{
                    mask: '+7(999)-999-99-99'
                }}
                placeholderTextColor={'#333'}
                keyboardType={'phone-pad'}
                onSubmitEditing={onSubmitEditing}
                style={styles.inputStyle}
            />
        </View>
    )
}


class CardInput extends Component {

    state = {
        card: '',
        date: '',
        cvv: ''
    }


    onChange = () => {
        if (this.props.onChange) this.props.onChange(this.state);
    }

    onChangeCard = (text) => this.setState({ card: text }, () => this.onChange());
    onChangeDate = (text) => this.setState({ date: text }, () => this.onChange());
    onChangeCVV = (text) => this.setState({ cvv: text }, () => this.onChange());

    render() {
        let { card, date, cvv } = this.state;
        return (
            <View>

                <View style={[styles.container]}>
                    <TextInputMask
                        underlineColorAndroid='transparent'
                        placeholder={'Номер карты'}
                        onChangeText={this.onChangeCard}
                        value={card}
                        type={'custom'}

                        options={{
                            mask: '9999 9999 9999 9999 ',
                        }}
                        placeholderTextColor={'#333'}
                        keyboardType={'numeric'}
                        style={[styles.inputStyle, {
                            paddingLeft: 0,
                            paddingRight: 34,
                            paddingVertical: Platform.OS == 'ios' ? 16 : 12,
                        }]}
                    />
                    <Image source={require('../source/icons/icon-qr.png')} style={{ position: 'absolute', bottom: 16, right: 0, width: 24, height: 18 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.container, { marginRight: 16, flex: 1 }]}>
                        <TextInputMask
                            underlineColorAndroid='transparent'
                            placeholder={'Действует до'}
                            onChangeText={this.onChangeDate}
                            value={date}
                            type={'custom'}
                            options={{ mask: '99/99 ' }}
                            placeholderTextColor={'#333'}
                            keyboardType={'numeric'}
                            style={[styles.inputStyle, { paddingLeft: 0, paddingVertical: Platform.OS == 'ios' ? 16 : 12 }]}
                        />
                    </View>
                    <View style={[styles.container, { marginLeft: 16, flex: 1 }]}>
                        <TextInputMask
                            underlineColorAndroid='transparent'
                            placeholder={'CVV'}
                            onChangeText={this.onChangeCVV}
                            value={cvv}
                            type={'custom'}
                            options={{ mask: '999 ' }}
                            placeholderTextColor={'#333'}
                            keyboardType={'numeric'}
                            style={[styles.inputStyle, { paddingLeft: 0, paddingVertical: Platform.OS == 'ios' ? 16 : 12 }]}
                        />
                    </View>
                </View>
            </View>
        )
    }
}




const CodeInput = ({ style, onChangeText, onSubmitEditing, value }) => {
    return (
        <View style={[styles.container, style]}>
            <Image
                source={require('../source/icons/icon-code.png')}
                style={{
                    position: 'absolute',
                    bottom: 18,
                    left: 0,
                    width: 18,
                    height: 18
                }}
            />
            <TextInput
                underlineColorAndroid='transparent'
                keyboardType={'number-pad'}
                placeholder={'Введите код'}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                value={value}
                placeholderTextColor={'#333'}
                style={[styles.inputStyle, { paddingVertical: Platform.OS == 'ios' ? 16 : 14, }]}
            />
        </View>
    )
}
const AddressInput = ({ style, onChangeText = noop, value, withPlus, onPressPlus = noop }) => {
    return (
        <View style={[styles.container, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingRight: 0, height: 60 }, style]}>
            <Image
                source={require('../source/icons/icon-ellipse.png')}
                style={{
                    // position: 'absolute',
                    // bottom: 18,
                    // left: 0,
                    width: 14,
                    height: 14,
                    marginRight: 13,
                    marginBottom: 8
                }}
            />
            <TextInput
                multiline
                numberOfLines={2}
                scrollEnabled
                underlineColorAndroid='transparent'
                placeholder={'Укажите адрес'}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={'#000'}
                style={[styles.inputStyle, { paddingVertical: Platform.OS == 'ios' ? 16 : 12, paddingLeft: 0, flex: 1 }]}
            />
            {
                withPlus === true ?
                    <TouchableOpacity
                        onPress={onPressPlus}
                        style={{
                            height: 35,
                            width: 14,
                            //  position: 'absolute', bottom: 4, right: 0
                            marginLeft: 10,
                            marginBottom: 5,
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{
                            color: '#6D6D6D',
                            fontSize: 28,
                            fontFamily: 'Gilroy-Regular',
                            fontWeight: '500'
                        }}>+</Text>
                    </TouchableOpacity>
                    :
                    <Image
                        source={require('../source/icons/icon-search.png')}
                        style={{
                            // position: 'absolute',
                            // bottom: 16,
                            // right: 0,
                            marginLeft: 10,
                            // marginBottom: 2,
                            marginBottom: 5,
                            width: 18,
                            height: 18
                        }}
                    />
            }
        </View>
    )
}
const NameInput = ({ style, onChangeText, placeholder, value, keyboardType, withoutIcon = false }) => {
    return (
        <View style={[styles.container, style]}>
            {
                withoutIcon === false &&
                <Image
                    source={require('../source/icons/icon-user.png')}
                    resizeMode={'contain'}
                    style={{
                        position: 'absolute',
                        bottom: 18,
                        left: 0,
                        width: 14,
                        height: 14
                    }}
                />
            }
            <TextInput
                underlineColorAndroid='transparent'
                placeholder={placeholder || 'Имя'}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={'#333'}
                style={[styles.inputStyle, (withoutIcon === true ? { paddingRight: 0, paddingLeft: 0 } : { paddingRight: 34 })]}
                keyboardType={keyboardType || 'default'}
            />
            {
                withoutIcon === false &&
                <Image
                    source={require('../source/icons/icon-gray-user.png')}
                    resizeMode={'contain'}
                    style={{
                        position: 'absolute',
                        bottom: 18,
                        right: 0,
                        width: 18,
                        height: 18
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        position: 'relative',
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 1,
        borderStyle: 'solid'

    },
    inputStyle: {
        color: '#000000',
        paddingLeft: 34,
        fontFamily: 'Gilroy-Regular',
        paddingVertical: Platform.OS == 'ios' ? 16 : 12,
        opacity: 0.75
    }
})


export { PhoneInput, CodeInput, AddressInput, NameInput, CardInput }


