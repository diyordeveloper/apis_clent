import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { noop } from 'lodash';

const Rating = ({rating, onPress, style = {}}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {[1, 2, 3, 4, 5].map((item, index) => {
                if (rating > (index))
                    return (
                        <Image key={'rating_' + index + '_' + index * rating} source={require('../source/icons/star-active.png')} style={styles.star} />
                    )
                else
                    return (
                        <Image key={'rating_' + index + '_' + index * rating} source={require('../source/icons/star.png')} style={styles.star} />
                    )
            })}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },

    star: {
        width: 16,
        height: 16,
    }
})

export default Rating;