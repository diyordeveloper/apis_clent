import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { SERVER_NAME_IMAGE } from '../config';
const ProfileBlock = ({ profile, style }) => {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center'
        },

        imageCont: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.21,
            shadowRadius: 12.00,
            elevation: 12,
            backgroundColor: '#ffffff',

            height: 102,
            width: 102,
            borderRadius: 51,
            marginRight: 40
        },
        image: {
            height: 102,
            width: 102,
            borderRadius: 51,

        },
        title: {
            fontSize: 16
        },
        subtitle: {
            fontSize: 14,
            color: '#B2B2B2',
            marginTop: 14
        }
    })

    let phone = '+' + profile.Phone



    return (
        <View style={[styles.container, style]}>
            <View style={styles.imageCont}>
                <Image source={{ uri: SERVER_NAME_IMAGE + profile.PhotoAvatar }} resizeMode={'cover'} style={styles.image} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{profile.Name + ' ' + profile.Surname}</Text>
                <Text style={styles.subtitle}>{phone}</Text>
                <Text style={styles.subtitle}>{'ID водителя: ' + profile.PaymentID}</Text>
            </View>
        </View>
    )
}


export default ProfileBlock