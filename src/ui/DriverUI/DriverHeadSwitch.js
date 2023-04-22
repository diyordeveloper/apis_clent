import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Switch from './Switch';
import { LoadScreen } from '../../utils/AppTor';
import { observer, inject } from 'mobx-react';
import { SERVER_NAME_IMAGE } from '../../config';
let { width, height } = Dimensions.get('window');





@inject('appStore')
@observer
export default class DriverHeadSwitch extends Component {


    render() {
        let { onLine, onChangeOnline, profile } = this.props.appStore;
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.cont}>
                    <View style={styles.left}>
                        {
                            onLine &&
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: SERVER_NAME_IMAGE + profile.PhotoAvatar }} resizeMode={'cover'} style={styles.profile} />
                            </View>
                        }
                        <Text style={styles.name}>{this.props.active ? (profile ? profile.Name + ' ' + profile.Surname : '') : 'Не на линии'}</Text>
                    </View>
                    <View style={styles.right}>
                        <Switch onChange={onChangeOnline} value={onLine} />
                        {
                            onLine &&
                            <TouchableOpacity onPress={() => LoadScreen('DriverOrderScreen')} style={{ marginLeft: 8 }}>
                                <Image source={require('../../source/driver/down.png')} resizeMode={'contain'} style={{ width: 22, height: 22 }} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    name: { fontFamily: 'Gilroy-Regular', fontSize: 17 },
    profile: { width: 30, height: 30, borderRadius: 15 },
    left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    right: { flexDirection: 'row', alignItems: 'center' },
    cont: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    container: {
        minHeight: 80,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,

        padding: 21,
        position: 'absolute',

        backgroundColor: '#fbfbfb',
        top: 0,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 15.00,

        elevation: 12,
    },
    imageContainer: {
        marginRight: 17,
        borderRadius: 15,

        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.20,
        shadowRadius: 12.84,

        elevation: 5
    }
})




