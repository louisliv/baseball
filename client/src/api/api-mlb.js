import _ from 'lodash';
import request from 'request-promise';

const originBaseUrl = 'http://statsapi.mlb.com/api/v1';


class Api {
    constructor() {
        this._baseUrl = originBaseUrl;
        this.options = {}
    }

    setBaseUrl = (newUrl) => {
        this._baseUrl = newUrl
    }

    createModel = (modelName, baseParams, extentions) => {
        return new ApiModel(
            modelName, 
            this.options, 
            this._baseUrl, 
            baseParams, 
            extentions
        )
    }
}

class ApiModel {
    constructor(modelName, 
        options, 
        baseUrl, 
        baseParams, 
        extentions
    ) {
        this.modelName = modelName;
        this.options = _.clone(options)
        this.options.baseParams = baseParams;
        this.extentions = extentions;
        if (baseUrl.slice(-1) === '/') {
            if (options.trailingChar) {
                this._baseUrl= baseUrl + this.modelName + options.trailingChar;
            } else {
                this._baseUrl = baseUrl + this.modelName;
            }
        } else {
            if (options.trailingChar) {
                this._baseUrl= baseUrl + '/' + this.modelName + options.trailingChar;
            } else {
                this._baseUrl = baseUrl + '/' + this.modelName;
            }
        }
    }

    getAll = (params, nestedName) => {
        return request({
            method: 'GET',
            qs: _.extend(params, this.options.baseParams),
            json: true,
            uri: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    get = (id, params) => {
        return request({
            method: 'GET',
            qs: _.extend(params, this.options.baseParams),
            uri: this._baseUrl + id + this.options.trailingChar,
            headers: this.options.headers,
            json: true,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    post = (data, nestedName, params) => {
        return request({
            method: 'POST',
            qs: _.extend(params, this.options.baseParams),
            uri: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            body: data
        })
    }

    put = (data, nestedName, params) => {
        return request({
            method: 'put',
            qs: _.extend(params, this.options.baseParams),
            uri: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            body: data
        })
    }
    
    delete = (params) => {
        return request({
            method: 'delete',
            params: _.extend(params, this.options.baseParams),
            url: this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    one = (id) => {
        return new ApiModel(id, this.options, this._baseUrl, this.options.baseParams);
    }
}

const api = new Api();

api.options.xsrfCookieName = 'csrftoken';
api.options.xsrfHeaderName = 'X-CSRFToken'
api.options.trailingChar = '/'
api.setBaseUrl(originBaseUrl)

export {api, originBaseUrl};