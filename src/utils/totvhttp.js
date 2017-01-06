import 'isomorphic-fetch';
import 'es6-promise';
import Rx from 'rxjs/Rx';
var SERVER_URL = "http://localhost:3000";

var ToTvHttp = {

  get: function (url, params) {
    var paramValues = [];
    for (var key in params) {
      paramValues.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }
    var paramString = paramValues.join("&");
    url = paramString ? url + "?" + paramString : url;
    return this.fetch(url, {method: 'GET'});
  },
  post: function (url, params) {
    var options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return this.fetch(url, options);
  },
  patch: function (url, params) {
    var options = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };
    return this.fetch(url, options);
  },
  delete: function (url) {
    var options = {
      method: 'DELETE'
    };
    return this.fetch(url, options);
  },
  fetch: function(url, options) {
    const request = fetch(SERVER_URL + url, options)
    .then(function(response) {
      if (response.status !== 200) {
        console.error('Status code is not 200');
        console.info('Response status : ' + response.status);
        return;
      }
      return response.json();
    })
    .then(function(data) {
      return data;
    })
    .catch(function(error) {
      console.error('Fetch Error : ', error);
    });
    return Rx.Observable.from(request)
  }
};

exports.ToTvHttp = ToTvHttp;
