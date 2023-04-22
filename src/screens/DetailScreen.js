import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl, ActivityIndicator, Dimensions } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack, fetchDirectionInfo } from '../utils/AppTor';
import { PageContent, Page, openSwipeMenu } from '../utils/AppTor';
import { Divider, ListItem, SwitchItem, Button, HistoryItem, Rating, AddressLine } from '../ui';
import { observer, inject } from 'mobx-react/native';
import { COLORS } from '../colors';
import { GOOGLE_MAPS_APIKEY } from '../config';
import { RatingModal } from '../modals';
let { width, height } = Dimensions.get('window');

@inject('appStore', 'orderStore')
@observer
export default class DetailScreen extends Component {
    state = {
        data: {},
        loading: true,
        refreshing: false,
        visible: false,
        polyline: '',
        rating: 0,
        detailWiki: []
    }

    mapLink = '';

    componentDidMount() {
        this.fetchInfo();
        this.fetchOrderDetailWiki();

    }

    fetchOrderDetailWiki = () => {
        const successCallback = (data) => {
            this.setState({ detailWiki: data });
        }
        const errorCallback = () => {
            this.setState({ detailWiki: [] });
        }
        this.props.appStore.fetchOrderDetailWiki({ successCallback, errorCallback })
    }

    fetchInfo = () => {
        const successCallback = (data) => {
            this.setState({ data: data, loading: false, refreshing: false }, () => {
                this.fetchPolyline();
            });
        }

        const errorCallback = (error) => {
            this.setState({ data: {}, loading: false, refreshing: false });
        }
        this.props.orderStore.fetchOrder(this.props.id, { successCallback, errorCallback });
    }

    handleRefreshing = () => {
        this.setState({ refreshing: true }, this.fetchInfo);
    }

    handleChangeVisible = () => {
        this.setState({ visible: !this.state.visible });
    }

    fetchPolyline = () => {
        const { coordinates = [] } = this.state.data;

        let origin = {};
        let destination = {};
        let waypoints = [];

        let polyline = '';

        coordinates.forEach((item, index) => {
            if (item.type === 'from') {
                origin = { latitude: +item.latitude, longitude: +item.longitude };
            } else if (item.type === 'to') {
                if (coordinates.length === index + 1) {
                    destination = { latitude: +item.latitude, longitude: +item.longitude };
                } else {
                    waypoints.push({ latitude: +item.latitude, longitude: +item.longitude });
                }
            }
        });

        console.log(origin, destination, waypoints);

        const onSuccess = (result) => {
            polyline = result[0].overview_polyline.points;
            console.log(polyline);
            this.setState({ polyline })
        }

        const onError = () => {

        }

        fetchDirectionInfo({
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            apikey: GOOGLE_MAPS_APIKEY,
            language: 'ru',
            mode: 'DRIVING',
            precision: 'high',
            onSuccess,
            onError
        });

    }

    renderStaticMap = () => {
        const { polyline } = this.state;
        const { data: { coordinates = [] } } = this.state;

        const centerLat = coordinates.reduce((sum, el) => { return sum + +el.latitude }, 0) / coordinates.length;
        const centerLon = coordinates.reduce((sum, el) => { return sum + +el.longitude }, 0) / coordinates.length;
        let count = 0;
        const mapString = coordinates.reduce((string, el) => {
            if (el.type === 'from') {
                return string + `&markers=label:A|color:0xFDB541|${el.latitude},${el.longitude}`;
            } else {
                count++;
                return string + `&markers=label:${count}|color:0xFDB541|${el.latitude},${el.longitude}`;
            }
        }, '');

        let mapImage = {
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}${mapString}&key=${GOOGLE_MAPS_APIKEY}&style=feature:poi|element:labels|visibility:off&language=ru&scale=2&size=${Math.round(width) - 42}x200`
        }

        if (polyline !== '') {
            mapImage.uri = mapImage.uri + '&path=weight:4|color:0x32CD32FF|enc:' + polyline;
        }

        console.log(mapImage);

        this.mapLink = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}${mapString}&key=${GOOGLE_MAPS_APIKEY}&style=feature:poi|element:labels|visibility:off&language=ru&scale=2&path=weight:4|color:0x32CD32FF|enc:${polyline}&size=${Math.round(width) - 42}x180`;

        return <Image key="image_map" source={mapImage} style={{ width: width - 42, height: 200, borderRadius: 18, marginBottom: 10 }} />
    }

    handleChangeRating = count => this.setState({ rating: count });

    render() {
        const { data, loading, refreshing, visible, rating, detailWiki } = this.state;
        const { price, car, total_distance, total_minutes, cost, id, payment_method_name, coordinates, driver, payment_method } = data;
        const { userApproveWiki } = this.props.appStore;
        return (
            <Page top>
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Детали" />
                </Navbar>
                {
                    loading === true ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator color={COLORS.LOADER_IOS_COLOR} />
                        </View>
                        :
                        <PageContent
                            refreshControl={
                                <RefreshControl
                                    tintColor={COLORS.LOADER_IOS_COLOR}
                                    refreshing={refreshing}
                                    onRefresh={this.handleRefreshing}
                                    style={{ zIndex: 9999 }}
                                />
                            }
                            style={{ paddingHorizontal: 21 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <HistoryItem title={`#${id}, поездка завершена`} after={cost + '₽'} gray payment={payment_method} />

                            {this.renderStaticMap()}

                            <AddressLine coordinates={coordinates} />
                            <Text style={{ marginTop: 24, fontFamily: 'Gilroy-Regular' }}><Text style={{ opacity: 0.7 }}>Тариф: </Text>{price.tariff.name}</Text>
                            {
                                car &&
                                <Text style={{ marginTop: 24, fontFamily: 'Gilroy-Regular' }}><Text style={{ opacity: 0.7 }}>Машина: </Text>{car.brand.name}</Text>
                            }
                            {
                                (driver && driver.user) &&
                                <Text style={{ marginTop: 24, fontFamily: 'Gilroy-Regular' }}><Text style={{ opacity: 0.7 }}>Водитель: </Text>{driver.user.full_name}</Text>
                            }

                            <Text style={{ marginTop: 24, fontFamily: 'Gilroy-Regular' }}><Text style={{ opacity: 0.7 }}>Поездка: </Text>{`${total_minutes} минут, ${total_distance} км`}</Text>
                            <Text style={{ marginTop: 24, fontFamily: 'Gilroy-Regular' }}><Text style={{ opacity: 0.7 }}>Оплата: </Text>{payment_method_name}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                                <Text style={{ fontFamily: 'Gilroy-Regular', opacity: 0.7, marginRight: 8 }}>Оценка</Text>
                                <Rating rating={rating} onPress={this.handleChangeVisible} />
                            </View>

                            <Divider style={{ marginTop: 13 }} />

                            {
                                detailWiki.map((item, index) => {
                                    return (
                                        <ListItem key={index + '_detail_' + item.id} big style={{ paddingVertical: 24 }} onPress={() => { LoadScreen('FaqTextScreen', { id: item.id, title: item.name }) }}>{item.name}</ListItem>
                                    )
                                })
                            }
                            {
                                userApproveWiki.data.map((item, index) => {
                                    return (
                                        <ListItem key={index + '_detail_' + item.id + item.code} big style={{ paddingVertical: 24 }} onPress={() => { LoadScreen('FaqTextScreen', { id: item.id, title: item.name }) }}>{item.name}</ListItem>
                                    )
                                })
                            }
                            <ListItem big style={{ paddingVertical: 24 }} onPress={() => { LoadScreen('SupportChatScreen') }}>Служба поддержки</ListItem>
                            <View style={{ height: 50 }}></View>
                        </PageContent>
                }
                <RatingModal payment={payment_method} cost={cost} visible={visible} link={this.mapLink} onPressCloseModal={this.handleChangeVisible} rating={rating} driver={driver} onPressRating={this.handleChangeRating} />
            </Page>
        );
    }
}