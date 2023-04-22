import {observable, action} from 'mobx';
import {requests} from '../requests/fetch';
import {appStore} from '.';
import {sortBy, throttle} from 'lodash';

class userStore {
  @observable orderHistory = [];
  @action setOrderHistory = data => {
    this.orderHistory = data;
  };

  @observable refreshOrderHistory = false;
  @action setRefreshOrderHistory = action =>
    (this.refreshOrderHistory = action);

  @observable loadingOrderHistory = true;
  @action setLoadingOrderHistory = action =>
    (this.loadingOrderHistory = action);

  fetchOrderHistory = () => {
    requests
      .fetchOrderHistory(appStore.userId)
      .then(data => {
        console.log(data);
        this.setOrderHistory(data);
        this.setRefreshOrderHistory(false);
        this.setLoadingOrderHistory(false);
      })
      .catch(error => {
        this.setOrderHistory([]);
        this.setRefreshOrderHistory(false);
        this.setLoadingOrderHistory(false);
      });
  };

  @observable preorderHistory = {
    data: [],
    links: {},
    meta: {},
    total_orders: 0,
  };
  @action setPreorderTotal = count =>
    (this.preorderHistory.total_orders = count);
  @action setAllPreorderHistory = data => (this.preorderHistory = data);
  @action setPreorderHistory = data => {
    if (
      this.preorderHistory.data.length === 0 ||
      this.refreshPreorderHistory === true ||
      this.preorderHistory.meta.current_page === 1
    ) {
      this.preorderHistory = data;
    } else {
      let newData = this.preorderHistory.data.concat(data.data);
      this.preorderHistory = {
        ...data,
        data: newData,
      };
    }
  };

  @observable refreshPreorderHistory = false;
  @action setRefreshPreorderHistory = action =>
    (this.refreshPreorderHistory = action);

  @observable loadingPreorderHistory = true;
  @action setLoadingPreorderHistory = action =>
    (this.loadingPreorderHistory = action);

  fetchPreorderHistory = (page = 1) => {
    requests
      .fetchPreorderHistory(appStore.userId, page)
      .then(json => {
        this.setPreorderHistory(json);
        this.setRefreshPreorderHistory(false);
        this.setLoadingPreorderHistory(false);
      })
      .catch(error => {
        this.setPreorderHistory([]);
        this.setRefreshPreorderHistory(false);
        this.setLoadingPreorderHistory(false);
      });
  };

  infinitePreorderHistory = throttle(
    () => {
      const {
        fetchPreorderHistory,
        preorderHistory: {data, meta},
      } = this;
      if (data && data.length < meta.total) {
        fetchPreorderHistory(meta.current_page + 1);
      }
    },
    1000,
    {trailing: true},
  );

  @observable paymentsTypes = {};
  @action setPaymentsTypes = data => (this.paymentsTypes = data);

  @observable loadingPaymentsTypes = true;
  @action setLoadingPaymentsTypes = action =>
    (this.loadingPaymentsTypes = action);

  @observable refreshingPaymentTypes = false;
  @action setRefreshingPaymentsTypes = action =>
    (this.refreshingPaymentTypes = action);

  @observable userCards = {
    data: [],
    links: {},
    meta: {
      total: 0,
    },
  };
  @action setUserCards = data => {
    this.userCards = data;
  };

  @observable currentCard = {};
  @action setCurrentCards = data => {
    this.currentCard = data;
  };

  initPaymentsTypes = () => {
    let requestArray = [
      this.fetchPaymentsTypes(),
      this.fetchUserCards(),
      this.fetchCurrentCards(),
    ];
    Promise.all(requestArray)
      .then(data => {
        this.setRefreshingPaymentsTypes(false);
        this.setLoadingPaymentsTypes(false);
      })
      .catch(error => {
        this.setRefreshingPaymentsTypes(false);
        this.setLoadingPaymentsTypes(false);
      });
  };

  fetchPaymentsTypes = () => {
    return new Promise((resolve, reject) => {
      requests
        .fetchPaymentsTypes()
        .then(data => {
          this.setPaymentsTypes(data);
          resolve(data);
        })
        .catch(error => {
          this.setPaymentsTypes({});
          reject({});
        });
    });
  };
  fetchUserCards = () => {
    return new Promise((resolve, reject) => {
      requests
        .fetchUserCards(appStore.userId)
        .then(data => {
          this.setUserCards(data);
          resolve(data);
        })
        .catch(error => {
          this.setUserCards({
            data: [],
            links: {},
            meta: {
              total: 0,
            },
          });
          reject({
            data: [],
            links: {},
            meta: {
              total: 0,
            },
          });
        });
    });
  };
  fetchCurrentCards = () => {
    return new Promise((resolve, reject) => {
      requests
        .fetchCurrentCards(appStore.userId)
        .then(json => {
          if (json.data.status === false) {
            throw 'нет активных карт';
          } else {
            this.setCurrentCards(json.data);
          }
          resolve(json.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  changeCurrentCard = (cardId, callbacks = {}) => {
    requests.changeCurrentCard(appStore.userId, cardId, callbacks);
  };
  deleteUserCard = (cardId, callbacks = {}) => {
    requests.deleteUserCard(appStore.userId, cardId, callbacks);
  };

  fetchAddCardForm = (returnUrl, callbacks = {}) => {
    requests.fetchAddCardForm(returnUrl, callbacks);
  };

  attachCard = (orderId, callbacks = {}) => {
    requests.attachCard(orderId, callbacks);
  };
}

export default new userStore();
