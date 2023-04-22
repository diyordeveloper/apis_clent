


import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Page, goBack, LoadScreen } from '../utils/AppTor';

import { CloseButton, Rating, ModalContainer } from '../ui';

let { width, height } = Dimensions.get('window');

export default class RatingModal extends Component {

    render() {
        const { rating, visible, onPressCloseModal, onPressRating, link, cost, driver, payment } = this.props;
        return (
            <Modal visible={visible} animated='slide'>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                        <View style={{ borderTopLeftRadius: 47, borderTopRightRadius: 47, overflow: 'hidden', width: '100%' }}>
                            <Image source={{ uri: (link || '') }} resizeMode={'cover'} style={{ height: 130 }} />
                        </View>
                        <View style={{ paddingHorizontal: 24, paddingBottom: 32, paddingTop: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {
                                    (driver && driver.user) && driver.user.avatar ?
                                        <Image source={{ uri: driver.user.avatar }} style={styles.image} />
                                        :
                                        <Image source={require('../source/user_placeholder.png')} style={styles.image} />
                                }
                                <View style={{ flex: 1 }}>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={styles.name}>{(driver && driver.user) && driver.user.first_name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'Gilroy-Regular' }}>{`${cost}₽`}</Text>
                                                <Image source={payment === 1 ? require('../source/icons/icon-black-card.png') : require('../source/icons/icon-black-cash.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginLeft: 4 }} />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <TouchableOpacity onPress={() => onPressRating(1)}>
                                                <Image source={rating > 0 ? require('../source/icons/star-active.png') : require('../source/icons/star.png')} style={[styles.star, { marginRight: 10 }]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onPressRating(2)}>
                                                <Image source={rating > 1 ? require('../source/icons/star-active.png') : require('../source/icons/star.png')} style={[styles.star, { marginRight: 10 }]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onPressRating(3)}>
                                                <Image source={rating > 2 ? require('../source/icons/star-active.png') : require('../source/icons/star.png')} style={[styles.star, { marginRight: 10 }]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onPressRating(4)}>
                                                <Image source={rating > 3 ? require('../source/icons/star-active.png') : require('../source/icons/star.png')} style={[styles.star, { marginRight: 10 }]} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => onPressRating(5)}>
                                                <Image source={rating > 4 ? require('../source/icons/star-active.png') : require('../source/icons/star.png')} style={[styles.star, { marginRight: 10 }]} />
                                            </TouchableOpacity>
                                            {/* <Rating rating={4} /> */}
                                            <Text style={styles.rate}>{driver && driver.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ModalContainer>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton onPress={onPressCloseModal} />
                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 47,
        margin: 31,
        position: 'relative',
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 31.00,

        elevation: 12,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 51,
    },
    name: {
        fontSize: 16
    },
    rate: {
        color: '#FDB541',
        fontFamily: 'Gilroy-Regular',
        marginLeft: 8
    },
    star: {
        width: 16,
        height: 16,
    }
})