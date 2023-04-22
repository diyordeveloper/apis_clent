import {observable, action, toJS} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {noop, debounce} from 'lodash';
import {requests} from '../requests/fetch';
import Pusher from 'pusher-js/react-native';
import orderStore from './orderStore';
import {PUSHER_KEY} from '../config';

class appStore {
  @observable myCoords = undefined;
  @action setMyCoords = coords => {
    console.log(coords);
    this.myCoords = coords;
    AsyncStorage.setItem('my_coords', JSON.stringify(coords));
  };
  @action readCoordsFromStorage = () => {
    AsyncStorage.getItem('my_coords').then(coords => {
      console.log('coords => ', coords);
      if (coords) this.myCoords = JSON.parse(coords);
    });
  };

  @observable token = undefined;
  @action setToken = token => {
    this.token = token;
  };

  @observable userId = undefined;
  @action setUserId = id => (this.userId = id);

  @observable profile = {};
  @action setProfile = profile => {
    this.profile = profile;
  };

  @observable init_region = {
    latitude: 55.753676,
    longitude: 37.6165,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };
  @action setInitRegion = coords => {
    this.init_region = coords;
  };

  @observable regions = [];
  @action setRegions = data => {
    this.regions = data;
  };

  fetchSmsCode = (body, callbacks) => {
    requests.fetchSmsCode(body, callbacks);
  };

  fetchToken = (body, callbacks) => {
    requests.fetchToken(body, callbacks);
  };

  fetchRegions = () => {
    requests
      .fetchRegions()
      .then(data => {
        this.setRegions(data);
      })
      .catch(error => {});
  };

  fetchRegion = id => {};

  searchRegionToTariff = region => {
    console.log(region.address_components);
    region.address_components.forEach(item => {
      if (
        item.types.includes('administrative_area_level_1') ||
        item.types.includes('administrative_area_level_2')
      ) {
        console.log(item.long_name);
        let finded = toJS(this.regions).find(el => el.name == item.long_name);
        console.log(finded);
        if (finded) {
          this.fetchRegionTariff(finded.id);
        }
        this.setTariffsLoading(true);
      }
    });
  };

  @observable tariffs = [];
  @observable total_duration = null;
  @observable total_distance = null;
  @observable tariffsLoading = false;

  @action setTotalDuration = data => (this.total_duration = data);
  @action setTotalDistance = data => (this.total_distance = data);

  @action setTariffs = data => {
    this.tariffs = data;
  };
  @action setTariffsLoading = action => (this.tariffsLoading = action);

  fetchRegionTariff = debounce(id => {
    requests
      .fetchRegionTariff(id)
      .then(data => {
        this.setTariffs(data);
        this.setTariffsLoading(false);
      })
      .catch(() => {
        this.setTariffs([]);
        this.setTariffsLoading(false);
      });
  }, 1000);

  fetchGeoRegionTariffs = debounce(body => {
    requests
      .fetchGeoRegionTariffs(body)
      .then(json => {
        this.setTariffs(json.data);
        this.setTotalDistance(json.total_distance);
        this.setTotalDuration(json.total_duration);
        this.setTariffsLoading(false);
      })
      .catch(() => {
        this.setTariffs([]);
        this.setTariffsLoading(false);
      });
  }, 1000);

  fetchGeocode = (params, callbacks) => {
    requests.fetchGeocode(params, callbacks);
  };

  pusher = undefined;
  initPusher = () => {
    this.pusher = new Pusher(PUSHER_KEY, {
      cluster: 'mt1',
    });
    console.log(this.pusher);
  };

  fetchProfile = id => {
    requests
      .fetchProfile(id)
      .then(data => {
        this.setProfile(data);
      })
      .catch(error => {
        this.setProfile({});
      });
  };

  updateUser = (body, callbacks = {}) => {
    requests.updateUser(this.userId, body, callbacks);
  };

  @observable loadingWiki = true;
  @action setLoadingWiki = action => (this.loadingWiki = action);

  @observable wiki = {
    data: [],
    links: {},
    meta: {},
  };
  @action setWiki = json => (this.wiki = json);

  fetchWiki = () => {
    requests
      .fetchWiki()
      .then(json => {
        this.setWiki(json);
        this.setLoadingWiki(false);
      })
      .catch(error => {
        this.setWiki({
          data: [],
          links: {},
          meta: {},
        });
        this.setLoadingWiki(false);
      });
  };

  fetchOrderDetailWiki = (callbacks = {}) => {
    requests.fetchOrderDetailWiki(callbacks);
  };

  fetchWikiInfo = (id, callbacks) => {
    requests.fetchWikiInfo(id, callbacks);
  };

  @observable userApproveWiki = {
    data: [],
    links: {},
    meta: {},
  };
  @action setUserApproveWiki = json => (this.userApproveWiki = json);

  fetchUserApproveWiki = () => {
    requests
      .fetchUserApproveWiki()
      .then(json => {
        this.setUserApproveWiki(json);
      })
      .catch(error => {
        this.setWiki({
          data: [],
          links: {},
          meta: {},
        });
      });
  };

  @observable supportPhone = '';
  @action setSupportPhone = phone => (this.supportPhone = phone);

  fetchSupportPhone = () => {
    requests
      .fetchSupportPhone()
      .then(phone => {
        this.setSupportPhone(phone);
      })
      .catch(error => {
        this.setSupportPhone('');
      });
  };
}

export default new appStore();
