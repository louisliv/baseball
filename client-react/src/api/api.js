import axios from 'axios';

const originBaseUrl = window.location.origin;

class Api {
    constructor() {
        this._baseUrl = originBaseUrl;
        this.options = {}
    }

    setBaseUrl = (newUrl) => {
        this._baseUrl = newUrl
    }

    createModel = (modelName) => {
        return new ApiModel(modelName, this.options, this._baseUrl)
    }
}

class ApiModel {
    constructor(modelName, options, baseUrl) {
        this.modelName = modelName;
        this.options = options
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
        return axios({
            method: 'get',
            params: params,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    get = (id, params) => {
        return axios({
            method: 'get',
            params: params,
            url: this._baseUrl + id + this.options.trailingChar,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    post = (data, nestedName, params) => {
        return axios({
            method: 'post',
            params: params,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            data: data
        })
    }

    put = (data, nestedName, params) => {
        return axios({
            method: 'put',
            params: params,
            url: nestedName ? this._baseUrl + nestedName + this.options.trailingChar : this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
            data: data
        })
    }
    
    delete = (params) => {
        return axios({
            method: 'delete',
            params: params,
            url: this._baseUrl,
            headers: this.options.headers,
            xsrfCookieName: this.options.xsrfCookieName ? this.options.xsrfCookieName : 'XSRF-TOKEN', 
            xsrfHeaderName: this.options.xsrfHeaderName ? this.options.xsrfHeaderName : 'X-XSRF-TOKEN',
        })
    }

    one = (id) => {
        return new ApiModel(id, this.options, this._baseUrl)
    }
}

const api = new Api();

api.options.xsrfCookieName = 'csrftoken';
api.options.xsrfHeaderName = 'X-CSRFToken'
api.options.trailingChar = '/'
api.setBaseUrl(originBaseUrl + '/api/')

export {api, originBaseUrl};