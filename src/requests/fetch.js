import { request, resetApplication, requestGeocode } from "./network";
import { throttle, noop, reject } from "lodash";


const fetchSmsCode = throttle((body, { successCallback = noop, errorCallback = noop }) => {
    request.post('sms/send', { body })
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        })
}, 1000, { trailing: true });

const fetchToken = throttle((body, { successCallback = noop, errorCallback = noop }) => {
    const params = { body };
    request.post('oauth/token', params)
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        })
}, 1000, { trailing: true });

const fetchRegions = () => {
    return new Promise((resolve, reject) => {
        request.get('regions')
            .then((json) => {
                resolve(json.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchRegionTariff = (region) => {
    return new Promise((resolve, reject) => {
        request.get(`prices/regions/${region}`)
            .then((json) => {
                resolve(json.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchGeocode = (params, { successCallback = noop, errorCallback = noop }) => {
    requestGeocode(params)
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const createNewOrder = (body, { successCallback = noop, errorCallback = noop }) => {
    let params = { body };
    request.post('orders', params)
        .then((json) => {
            successCallback(json.data);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const fetchOrder = (id, { successCallback = noop, errorCallback = noop }) => {
    request.get(`orders/${id}`)
        .then((json) => {
            successCallback(json.data);
        })
        .catch((error) => {
            errorCallback();
        })
}

const fetchProfile = (id) => {
    return new Promise((resolve, reject) => {
        request.get(`users/${id}`)
            .then((json) => {
                resolve(json.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const cancelOrder = (user, order, reason_id, { successCallback = noop, errorCallback = noop }) => {
    let params = {};

    if (reason_id) {
        params.body = { reason_id };
    }

    request.post(`users/${user}/orders/${order}/cancel`, params)
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const fetchGeoRegionTariffs = (body) => {
    return new Promise((resolve, reject) => {
        const params = { body };
        request.post(`prices/calculate/cost`, params)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchCurrentOrder = (user) => {
    return new Promise((resolve, reject) => {
        request.get(`users/${user}/orders/current`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchOrderHistory = (id) => {
    return new Promise((resolve, reject) => {
        request.post(`users/${id}/orders/history`)
            .then((json) => {
                resolve(json.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const updateUser = (id, body, { successCallback = noop, errorCallback = noop }) => {
    request.put(`users/${id}`, { body })
        .then((json) => {
            successCallback(json.data);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const fetchPreorderHistory = (id, page) => {
    return new Promise((resolve, reject) => {
        request.get(`users/${id}/orders/preorders?page=${page}`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject();
            })
    })
}


const fetchWiki = () => {
    return new Promise((resolve, reject) => {
        request.get(`wiki/type/1`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchOrderDetailWiki = ({ successCallback = noop, errorCallback = noop }) => {
    request.get(`wiki/type/3`)
        .then((json) => {
            successCallback(json.data);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const fetchUserApproveWiki = () => {
    return new Promise((resolve, reject) => {
        request.get(`wiki/type/4`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchWikiInfo = (id, { successCallback = noop, errorCallback = noop }) => {
    request.get(`wiki/${id}`)
        .then((json) => {
            successCallback(json.data)
        })
        .catch((error) => {
            console.log(error);
            errorCallback(error);
        })
}

const fetchOptions = () => {
    return new Promise((resolve, reject) => {
        request.get(`options`)
            .then((json) => {
                resolve(json.data)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    })
}

const fetchSupportPhone = () => {
    return new Promise((resolve, reject) => {
        request.get(`info/phone`)
            .then((phone) => {
                resolve(phone);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchCancelReasons = () => {
    return new Promise((resolve, reject) => {
        request.get(`orders/cancels/reasons`)
            .then((json) => {
                resolve(json)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    })
}

const fetchPaymentsTypes = () => {
    return new Promise((resolve, reject) => {
        request.get(`payments/types`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchUserCards = (userId) => {
    return new Promise((resolve, reject) => {
        request.get(`users/${userId}/cards`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const fetchCurrentCards = (userId) => {
    return new Promise((resolve, reject) => {
        request.get(`users/${userId}/cards/current`)
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

const changeCurrentCard = (userId, cardId, { successCallback = noop, errorCallback = noop }) => {
    request.post(`users/${userId}/cards/${cardId}/setActive`)
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        });
}

const deleteUserCard = (userId, cardId, { successCallback = noop, errorCallback = noop }) => {
    request.delete(`users/${userId}/cards/${cardId}`)
        .then((json) => {
            successCallback(json);
        })
        .catch((error) => {
            errorCallback(error);
        });
}

const fetchAddCardForm = (returnUrl, { successCallback = noop, errorCallback = noop }) => {
    const params = {
        body: { returnUrl }
    }
    request.post(`payments/init`, params)
        .then((data) => {
            successCallback(data);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

const attachCard = (orderId, { successCallback = noop, errorCallback = noop }) => {
    const params = {
        body: { orderId }
    }
    request.post(`payments/attachCard/${orderId}`, params)
        .then((data) => {
            successCallback(data);
        })
        .catch((error) => {
            errorCallback(error);
        })
}

export const logout = () => {
    resetApplication();
}

export const requests = {
    fetchSmsCode,
    fetchToken,
    fetchRegions,
    fetchRegionTariff,
    fetchGeocode,
    createNewOrder,
    fetchOrder,
    fetchProfile,
    cancelOrder,
    fetchGeoRegionTariffs,
    fetchCurrentOrder,
    fetchOrderHistory,
    fetchPreorderHistory,
    updateUser,
    fetchWiki,
    fetchWikiInfo,
    fetchOptions,
    fetchOrderDetailWiki,
    fetchSupportPhone,
    fetchUserApproveWiki,
    fetchCancelReasons,
    fetchPaymentsTypes,

    fetchUserCards,
    fetchCurrentCards,
    changeCurrentCard,
    deleteUserCard,
    fetchAddCardForm,
    attachCard
}