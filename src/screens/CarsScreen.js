import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Page, goBack } from '../utils/AppTor';

import { CloseButton, Button, Divider, ModalContainer } from '../ui';

import SwiperFlatList from 'react-native-swiper-flatlist';
import { observer, inject } from 'mobx-react/native';

let { width, height } = Dimensions.get('window');

@inject('appStore', 'orderStore')
@observer
export default class CarsScreen extends Component {

    componentDidMount() {
        console.log(this.props.index);
    }

    renderTariffImage = id => {
        switch (id) {
            case 1:
                return require("../source/cars/big/car1.png");
            case 2:
                return require("../source/cars/big/car2.png");
            case 3:
                return require("../source/cars/big/car3.png");
            case 4:
                return require("../source/cars/big/car4.png");
            case 5:
                return require("../source/cars/big/car5.png");
            case 6:
                return require("../source/cars/big/car6.png");
            case 7:
                return require("../source/cars/big/car7.png");
        }
    }

    renderCard = (item) => {
        const { tariff_id, setTariffId, cars, plusCars, minusCars, tariffsAutoDictionary } = this.props.orderStore;
        const selectTariff = () => {
            setTariffId(item.price_id);
            goBack();
        }
        return (
            <ModalContainer bottomRadius style={{ margin: 31 }} margin={31}>
                <View style={{ padding: 32, position: 'relative' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Gilroy-Regular', color: '#ABABAB', fontSize: 12 }}>Тарифный план</Text>
                                <Image source={require('../source/icons/icon-info.png')} style={{ height: 18, width: 18, marginLeft: 8 }} />
                            </View>
                            <Text style={{ fontFamily: 'Gilroy-Regular', marginTop: 8, fontSize: 17 }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={minusCars} style={{ backgroundColor: '#F1F1F1', width: 20, height: 22, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#6D6D6D', fontFamily: 'Gilroy-Regular' }}>-</Text>
                            </TouchableOpacity>
                            <View style={{ backgroundColor: '#FDB541', width: 30, height: 30, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', fontFamily: 'Gilroy-Regular' }}>{cars}</Text>
                            </View>
                            <TouchableOpacity onPress={plusCars} style={{ backgroundColor: '#F1F1F1', width: 20, height: 22, borderTopRightRadius: 6, borderBottomRightRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#6D6D6D', fontFamily: 'Gilroy-Regular' }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image source={item.images.png ? { uri: item.images.png.l } : this.renderTariffImage(item.id)} style={{ height: 100, width: '100%', marginVertical: 8 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
                        <Text style={{ color: '#C7C7C7', fontFamily: 'Gilroy-Regular' }}>{tariffsAutoDictionary[item.id].seats}</Text>
                        <Image source={require('../source/icons/icon-user-gray.png')} resizeMode={'contain'} style={{ width: 15, height: 15, marginHorizontal: 8 }} />
                        <Text style={{ color: '#C7C7C7', fontFamily: 'Gilroy-Regular' }}>Посадочных мест</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#C7C7C7', fontFamily: 'Gilroy-Regular' }}>{tariffsAutoDictionary[item.id].luggage}</Text>
                        <Image source={require('../source/icons/icon-case.png')} resizeMode={'contain'} style={{ width: 15, height: 15, marginHorizontal: 8 }} />
                        <Text style={{ color: '#C7C7C7', fontFamily: 'Gilroy-Regular' }}>Мест для багажа</Text>
                    </View>
                    <Divider style={{ marginTop: 17 }} />
                    <Text style={{ fontSize: 12, fontFamily: 'Gilroy-Regular', marginVertical: 14 }}>{tariffsAutoDictionary[item.id].text}</Text>
                    <Divider />
                    <Text style={{ fontSize: 12, fontFamily: 'Gilroy-Regular', marginVertical: 14 }}>{item.city_minutes + '₽/минута, ' + item.city_distance + '₽/км'}</Text>
                    <Button disabled={item.price_id === tariff_id ? true : false} onPress={selectTariff} style={{ marginTop: 16 }}>{item.price_id === tariff_id ? 'Выбрано' : 'Выбрать'}</Button>
                </View>
            </ModalContainer>
        )
    }
    render() {
        const { tariffs } = this.props.appStore;
        return (
            <Page>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: width, }}>
                        <SwiperFlatList ref={node => this.swiper = node} index={this.props.index || 0}>
                            {
                                tariffs.map((item, index) => {
                                    return (
                                        <View key={'slide-' + index} style={{ width: width }}>
                                            {this.renderCard(item)}
                                        </View>
                                    )
                                })
                            }
                        </SwiperFlatList>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <CloseButton onPress={() => goBack()} />
                    </View>
                </View>
            </Page >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 47,
        margin: 31,

        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.08,
        shadowRadius: 31.00,

        elevation: 12,
    }
})