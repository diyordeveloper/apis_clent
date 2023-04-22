import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { noop } from 'lodash';

const AddressLine = ({ coordinates = [], style = {}, withDelete, onPressDelete = noop, ...props }) => {
    return (
        <View style={{ ...style }}>
            {
                coordinates.map((item, index) => {
                    return (
                        <View key={'address_' + index + '_' + item.latitude + '_' + item.longitude + '_' + item.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 40 }}>
                            {
                                (((index + 1) !== coordinates.length) || coordinates.length === 1) ?
                                    <View style={{ alignItems: 'center', marginRight: 15, position: 'relative' }}>
                                        <Image
                                            source={require('../source/icons/checkbox.png')}
                                            resizeMode={'contain'}
                                            style={{ width: 13, height: 13 }}
                                        />
                                        {
                                            coordinates.length > 1 &&
                                            <Image
                                                source={require('../source/icons/icon-dots.png')}
                                                resizeMode={'contain'}
                                                style={{ width: 2, height: 12, marginTop: 5, position: 'absolute', bottom: -17 }}
                                            />
                                        }
                                    </View>
                                    :
                                    <Image
                                        source={require('../source/icons/icon-ellipse.png')}
                                        resizeMode={'contain'}
                                        style={{ width: 13, height: 13, marginRight: 15 }}
                                    />
                            }
                            <Text
                                numberOfLines={3}
                                ellipsizeMode={'tail'}
                                style={[styles.second]}
                            >
                                {item.address}
                            </Text>
                            {
                                withDelete && index > 0 &&
                                <TouchableOpacity onPress={() => onPressDelete(index - 1)} style={{minHeight: 40, marginLeft: 16}}>
                                    <Text
                                        style={{
                                            color: '#6D6D6D',
                                            fontSize: 28,
                                            fontFamily: 'Gilroy-Regular',
                                            fontWeight: '500'
                                        }}>-</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

export default AddressLine;


const styles = StyleSheet.create({
    second: {
        color: '#000000',
        opacity: 0.59,
        fontFamily: 'Gilroy-Regular',
        flex: 1
    }
})




