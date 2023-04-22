
import { observable, action, computed } from 'mobx';
import { requests } from '../requests/fetch';
import appStore from './appStore';
import { noop } from 'lodash';


class orderStore {
    @observable orderCoordinates = {
        from: {},
        to: []
    };
    @action setOrderCoordinates = coords => this.orderCoordinates = coords;
    @computed get orderCoordsArray() {
        const { from, to } = this.orderCoordinates;
        console.log(1245);
        let coords = [];
        if (from.address) coords.push(from);
        if (to.length > 0) coords = coords.concat(to);
        console.log(coords);
        return coords;
    }

    @observable comment = undefined;
    @action setComment = comment => this.comment = comment;

    @observable tariff_id = undefined;
    @action setTariffId = id => this.tariff_id = id;

    @observable cars = 1;
    @action plusCars = () => {
        this.cars++;
    }
    @action minusCars = () => {
        if (this.cars > 1) {
            this.cars--;
        }
    }

    @observable inning_at = undefined;
    @action setInningAt = date => this.inning_at = date;

    @observable orderedUser = {};
    @action setOrderedUser = data => this.orderedUser = data;

    @observable driverSearchState = false;
    @action setDriverSearchState = action => this.driverSearchState = action;

    @observable orderActive = false;
    @action setOrderActive = action => this.orderActive = action;

    @action clearOrderInfo = () => {
        this.orderCoordinates = {
            from: {},
            to: []
        };
        this.comment = undefined;
        this.tariff_id = undefined;
        this.cars = 1;
        this.orderedUser = {};
        this.inning_at = undefined;
        this.selectedOptions = [];
    }

    @computed get pointFrom() {
        const { from } = this.orderCoordinates;
        return { latitude: from.lat, longitude: from.lng };
    }
    @computed get destinationPoint() {
        const { to } = this.orderCoordinates;
        if (to.length === 0) return undefined;
        return { latitude: to[to.length - 1].lat, longitude: to[to.length - 1].lng };
    }
    @computed get waypointsPoint() {
        const { to } = this.orderCoordinates;
        if (to.length === 0) return undefined;
        let temp = [];
        to.forEach((item, index) => {
            if (index + 1 < to.length) {
                temp.push({ latitude: item.lat, longitude: item.lng });
            }
        })
        return temp;
    }

    createNewOrder = (body, callbacks) => {
        requests.createNewOrder(body, callbacks);
    }

    fetchOrder = (id, callbacks) => {
        requests.fetchOrder(id, callbacks);
    }

    @observable activeOrder = {};
    @action setActiveOrder = data => this.activeOrder = data;

    @action unsubscribeActiveOrder = () => {
        appStore.pusher.unsubscribe(`order.${this.activeOrder.id}`);
        this.activeOrder = {};
    }

    @observable orderGeodata = undefined;
    @action setOrderGeodata = data => this.orderGeodata = data;

    cancelOrder = (user, order, reason_id, callbacks) => {
        requests.cancelOrder(user, order, reason_id, callbacks);
    }

    fetchCurrentOrder = (callback = noop) => {
        requests.fetchCurrentOrder(appStore.userId)
            .then((json) => {
                console.log(json);
                if (json.status === undefined || json.status !== false) {
                    console.log('зашел');
                    let temp = {
                        from: {},
                        to: []
                    }; //объект для координат
                    json.data.coordinates.forEach((item, index) => {
                        console.log(item);
                        if (item.type === 'from') {
                            temp.from = { lat: +item.latitude, lng: +item.longitude, address: item.address };
                        } else if (item.type === 'to') {
                            temp.to.push({ lat: +item.latitude, lng: +item.longitude, address: item.address })
                        }
                    })
                    console.log(temp);
                    this.setOrderCoordinates(temp);
                    this.setActiveOrder(json.data);
                    this.setOrderActive(true);
                    callback(json.data);
                }
            })
            .catch((error) => {

            })
    }

    tariffsAutoDictionary = {
        25: {
            text: 'Kia Rio, Hyundai Solaris, Ford Focus, Skoda Rapid',
            seats: 4,
            luggage: 4
        },
        26: {
            text: 'Skoda Octavia, Kia Ceed, Hyundai i40, VW Jetta',
            seats: 4,
            luggage: 4
        },
        27: {
            text: 'Toyota Camry, Kia Optima, Hyundai Sonata',
            seats: 4,
            luggage: 4
        },
        28: {
            text: 'Mercedes-Benz E-class, BMW 5-series',
            seats: 4,
            luggage: 4
        },
        29: {
            text: 'Mercedes-Benz S-class, Mercedes-Benz Maybach',
            seats: 4,
            luggage: 4
        },
        30: {
            text: 'Skoda Octavia, Kia Ceed, Hyundai i40, VW Jetta',
            seats: 4,
            luggage: 4
        },
        31: {
            text: 'Mercedes-Benz V-class, VW Multivan, VW Caravelle',
            seats: 4,
            luggage: 4
        },
        32: {
            text: 'Ford Focus, Lada Vesta, Lada Largus, Kia Ceed',
            seats: 4,
            luggage: 4
        },
        33: {
            text: 'водители категории В',
            seats: 4,
            luggage: 4
        },
        34: {
            text: 'Kia Rio, Hyundai Solaris, Ford Focus, Skoda Rapid',
            seats: 0,
            luggage: 0
        },
        35: {
            text: 'Курьеры на велосипедах, самокатах и скутеры',
            seats: 0,
            luggage: 0
        },
        36: {
            text: 'Грузовой коммерческий транспорт от 1 тонны',
            seats: 2,
            luggage: 0
        },
        37: {
            text: 'Mercedes-Benz E-class, BMW 5-series, Toyota Camry',
            seats: 4,
            luggage: 4
        },
    }

    @observable selectedOptions = [];
    @action setSelectedOptions = data => this.selectedOptions = data;


    @observable loadingOptions = true;
    @action setLoadingOptions = action => this.loadingOptions = action;

    @observable options = [];
    @action setOptions = data => this.options = data;

    fetchOptions = () => {
        requests.fetchOptions()
            .then((data) => {
                this.setOptions(data);
                this.setLoadingOptions(false);
            })
            .catch((error) => {
                this.setOptions([]);
                this.setLoadingOptions(false);
            })
    }


    @observable loadingReasons = true;
    @action setLoadingReasons = action => this.loadingReasons = action;

    @observable reasons = {};
    @action setReasons = data => this.reasons = data;

    fetchCancelReasons = () => {
        requests.fetchCancelReasons()
            .then((data) => {
                this.setReasons(data);
                this.setLoadingReasons(false);
            })
            .catch((error) => {
                this.setReasons([]);
                this.setLoadingReasons(false);
            })
    }

}

export default new orderStore();