import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Divider from './Divider';
import AddressLine from './AddressLine';

export default class HistoryItem extends Component {
    render() {
        let { gray, noIconAfter, style, onPress, title, after, coordinates, payment } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <View style={[styles.container, (coordinates ? {} : { marginTop: 5, marginBottom: 5 })]}>
                    <Text style={{ fontFamily: 'Gilroy-Regular', color: gray ? '#989898' : '#000000' }}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: gray ? 0.5 : 1 }}>
                        <Text style={{ fontFamily: 'Gilroy-Regular', marginRight: 8 }}>{after}</Text>
                        {
                            !noIconAfter &&
                            <Image source={payment === 1 ? require('../source/icons/icon-black-card.png') : require('../source/icons/icon-black-cash.png')} style={styles.icon} />
                        }
                    </View>
                </View>
                {
                    coordinates &&
                    <AddressLine coordinates={coordinates} />
                }

                <Divider style={[(coordinates ? { marginTop: 15 } : {})]} />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },

    icon: {
        width: 24,
        height: 24
    }
})


HistoryItem.defaultProps = {
    title: undefined,
    after: undefined
}