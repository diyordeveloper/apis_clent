import {appStore} from '../stores';
import {SERVER_NAME, GOOGLE_MAPS_APIKEY} from '../config';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendToast} from '../utils/AppTor';

export const request = {
  get: apiMethod => _request(apiMethod, {method: 'GET'}),
  post: (apiMethod, params) => _request(apiMethod, {method: 'POST', ...params}),
  put: (apiMethod, params) => _request(apiMethod, {method: 'PUT', ...params}),
  delete: (apiMethod, params) =>
    _request(apiMethod, {method: 'DELETE', ...params}),
};

const _request = (apiMethod, {body = {}, method, signal}) => {
  console.log(apiMethod, body, method);
  return new Promise((resolve, reject) => {
    const REQUEST_PARAMS = {
      method,
      headers: new Headers({Accept: 'application/json'}),
    };

    if (appStore.token)
      REQUEST_PARAMS.headers.append(
        'Authorization',
        `Bearer ${appStore.token}`,
      );

    if (Object.entries(body).length > 0) {
      REQUEST_PARAMS.headers.append('Content-Type', 'application/json');
      REQUEST_PARAMS.body = JSON.stringify(body);
    }

    if (signal) REQUEST_PARAMS.signal = signal;

    console.log(SERVER_NAME + apiMethod, REQUEST_PARAMS);

    fetch(SERVER_NAME + apiMethod, REQUEST_PARAMS)
      .then(response => {
        console.log(response);
        switch (response.status) {
          case 200:
          case 201:
            return response.json();
          case 401:
            resetApplication();
            throw new Error(SERVER_NAME + apiMethod + ' => tokenError');
          case 422:
            return response.json();
          case 500:
            return response.json();
          default:
            // return response.text();
            throw new Error(`Ошибка запрос ${response.status}`);
        }
      })
      .then(json => {
        console.log(`${apiMethod} ====> `, json);
        if (json.errors) {
          for (let key in json.errors) {
            json.errors[key].forEach(item => {
              sendToast(item, 'Произошла ошибка');
            });
          }
          reject();
        } else {
          resolve(json);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.name == 'Error' && error.message === 'tokenError') {
          console.log(error);
        } else if (error.name == 'AbortError') {
          reject(error.name);
        } else {
          sendToast('Произошла ошибка запроса, попробуйте позже.', 'Ошибка');
          reject(error);
        }
      });
  });
};

/**
 * Функция поиска подробной инфы по адресу в гугл геокодинг апи
 *
 * @param string [string] - строка адреса или координат, коордитаты в формате lat,lng
 * @param type [string] - тип по чему искать, принимает значения latlng или address
 */
export const requestGeocode = ({string, type = undefined}) => {
  //type = latlng or address
  //string = строка
  console.log(string);
  if (type == undefined) return;
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${type}=${string}&key=${GOOGLE_MAPS_APIKEY}&language=ru`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.status == 'OK') {
          resolve(json);
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const resetApplication = async () => {
  await AsyncStorage.removeItem('apis_access_token');
  await AsyncStorage.removeItem('apis_profile');
  await AsyncStorage.removeItem('my_coords');
  RNRestart.Restart();
};
