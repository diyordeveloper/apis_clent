import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, RefreshControl, Platform } from 'react-native';
import { LoadScreen, NavbarItem, Navbar, goBack, fetchDirectionInfo } from '../utils/AppTor';
import { PageContent, Page } from '../utils/AppTor';
import { Divider, AddressLine, Button } from '../ui';
import { DriverListItem } from '../ui/DriverUI';
import { observer, inject } from 'mobx-react';
import Spinner from '../ui/Spinner';
import { requests } from '../requests/fetch';
import moment from 'moment';
import { COLORS } from '../colors';
import { GOOGLE_MAPS_APIKEY } from '../config';
import { toJS } from 'mobx';

let { width, height } = Dimensions.get('window');

@inject('userStore', 'orderStore')
@observer
export default class DriverPreOrderScreen extends Component {
    state = {
        polyline: '',
        sending: false
    }

    componentDidMount() {
        this.fetchPolyline();
    }

    fetchPolyline = () => {
        const { coordinates = [] } = this.props.data;

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
        const { data: { coordinates = [] } } = this.props;

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
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLon}${mapString}&size=${Math.round(width) - 42}x200&key=${GOOGLE_MAPS_APIKEY}&style=feature:poi|element:labels|visibility:off&language=ru&scale=2`
        }

        if (polyline !== '') {
            mapImage.uri = mapImage.uri + '&path=weight:4|color:0x32CD32FF|enc:' + polyline;
        }

        console.log(mapImage);

        return <Image key="image_map_preorder" source={mapImage} style={{ width: width - 42, height: 200, borderRadius: 18, marginBottom: 10 }} />
    }

    handleCancelOrder = () => {
        const { data: { user_id }, id } = this.props;
        const successCallback = () => {
            let preorders = toJS(this.props.userStore.preorderHistory);
            let findedIndex = preorders.data.findIndex(el => el.id === id);
            if (findedIndex > -1) {
                preorders.meta.total = preorders.meta.total - 1;
                preorders.total_orders = preorders.total_orders - 1;
                preorders.data.splice(findedIndex, 1);
            }
            this.props.userStore.setAllPreorderHistory(preorders);
            goBack();
        }
        const errorCallback = () => {
            this.setState({ sending: false });
        }

        this.setState({ sending: true }, () => {
            this.props.orderStore.cancelOrder(user_id, id, undefined, { successCallback, errorCallback });
        })
    }

    renderOptions = () => {
        let string = this.props.data.options.map(el => el.name);

        return string.toString();
    }

    render() {
        const { data } = this.props;
        const { coordinates, inning_at, payment_method_name, price, comment, driver_id, status, options } = data;
        const { sending } = this.state;
        return (
            <Page hideBottom  >
                <Navbar>
                    <NavbarItem backLink />
                    <NavbarItem title="Предварительный заказ" style={{ flex: 1, justifyContent: 'flex-start' }} />
                    <NavbarItem>
                        <Text style={styles.id}>{'#' + this.props.id}</Text>
                    </NavbarItem>
                </Navbar>
                <PageContent showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 21 }}>
                        {this.renderStaticMap()}
                        <DriverListItem big>{inning_at ? moment(inning_at).format('DD MMM YYYY, HH:mm') : moment().format('DD MMM YYYY, HH:mm')}</DriverListItem>
                        <AddressLine coordinates={coordinates} style={{ marginTop: 20 }} />
                        <Divider style={{ marginTop: 18 }} />
                        {
                            comment &&
                            <DriverListItem big>{`Комментарий: ${comment.message}`}</DriverListItem>
                        }
                        {
                            (options && options.length > 0) &&
                            <DriverListItem big>{`Доп. услуги: ${this.renderOptions()}`}</DriverListItem>
                        }
                        <DriverListItem big>{price.tariff.name}</DriverListItem>
                        <View style={styles.cont}>
                            <Text style={styles.label}>Оплата</Text>
                            <Text style={styles.label}>{payment_method_name}</Text>
                        </View>
                        <Divider />
                        <View style={styles.cont}>
                            <Text style={styles.label}>Стоимость</Text>
                            <Text style={styles.cost}>{data.cost || 0}₽</Text>
                        </View>
                    </View>
                    <View style={{ height: 110 }} />
                </PageContent>
                <View style={{ width: width, position: 'absolute', bottom: 60, paddingHorizontal: 21 }}>
                    <Button disabled={sending} loading={sending} onPress={this.handleCancelOrder}>Отменить заказ</Button>
                </View>
            </Page>
        );
    }
}


const styles = StyleSheet.create({
    id: { fontFamily: 'Gilroy-Bold', color: '#FDB541', marginRight: 16 },
    cont: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, marginBottom: 18 },
    label: { fontFamily: 'Gilroy-Regular', fontSize: 15 },
    cost: { fontFamily: 'Gilroy-Regular', fontSize: 15, color: '#989898' }


})