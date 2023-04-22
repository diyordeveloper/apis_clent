import moment from 'moment';



const getCurrentCoords = () => {

    console.log('GetCurrent');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((geo) => {
            resolve(geo.coords);
        }, (error) => {
            console.log(error);
        })
    })
}


const watchCoords = (success) => {
    console.log('WatchCoords');
    return navigator.geolocation.watchPosition((geo) => {
        if (success) success(geo.coords);
    }, (error) => {
        console.log(error);
    })

}



const decOfNum = (n, titles) => {
    if (!titles) titles = ['аудиокнига', 'аудиокниги', 'аудиокниг'];
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

const EventEmitter = {
    events: {},
    execute: function (event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    },
    subscribe: function (event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback)
    }
}


const phoneClear = (phone) => {
    phone = phone.replace(/\(/g, "");
    phone = phone.replace(/\)/g, "");
    phone = phone.replace(/ /g, "");
    phone = phone.replace(/-/g, "");
    phone = phone.replace("+", "");

    return phone;
}


const orderDate = (date, time) => {
    return (date == moment().format('YYYY.MM.DD') ? 'Сегодня,' : moment(date, "YYYY.MM.DD").format('DD MMMM,')) + ' ' + moment(time, 'HH:mm:ss').format('HH:mm')
}

export {
    EventEmitter,
    phoneClear,
    decOfNum,
    getCurrentCoords,
    watchCoords,
    orderDate
}