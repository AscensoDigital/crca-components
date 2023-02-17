import { isDefined, isObject } from "./data-utils.js";
import axios from 'redaxios';

export const HTML_METHOD_GET = 'GET';
export const HTML_METHOD_POST = 'POST';
export const HTML_METHOD_PUT = 'PUT';
export const HTML_METHOD_PATCH = 'PATCH';
export const HTML_METHOD_DELETE = 'DELETE';

export const axiosMethod = (method, url, config) => {
  const prom = new Promise((resolve, reject) => {
    if(isDefined(axios)) {
      const params = {};
      const heads = {};
      if(method!==HTML_METHOD_GET && isDefined(config.data) && isObject(config.data)) {
        params.data = config.data;
        heads['Content-Type'] = 'application/json';
      }
      if(isDefined(config.token)) {
        heads['Authorization'] = `bearer ${config.token}`;
      }
      if(isDefined(config.auth) && isDefined(config.auth.user) && isDefined(config.auth.password)) {
        heads['Authorization'] = `Basic ${config.auth.user}:${config.auth.password}`;
      }

      if(Object.keys(heads).length) {
        params.headers = new Headers(heads);
      }
      params.method = method;
      params.url = url;
      axios(params)
        .then(response => resolve(response.data || response))
        .catch(error => {
          if (error.response) {
            return reject({info: error.response.data, status: error.response.status, statusJson: error.toJSON()})
          } else if (error.request) {
            return reject({request: error.request, statusJson: error.toJSON()});
          } else {
            return reject({ message: error.message, statusJson: error.toJSON()});
          }
        });
    }
    else {
      return reject({error: "axios is not defined"});
    }
  });
  return prom;
}

export const fetchMethod = (method, url, config) => {
  const prom = new Promise((resolve, reject) => {

    const params = {};
    const heads = {};
    if(method!==HTML_METHOD_GET && isDefined(config.data) && isObject(config.data)) {
      params.body = JSON.stringify(config.data);
      heads['Content-Type'] = 'application/json';
    }
    if(isDefined(config.token)) {
      heads['Authorization'] = `bearer ${config.token}`;
    }
    if(isDefined(config.auth) && isDefined(config.auth.user) && isDefined(config.auth.password)) {
      heads['Authorization'] = `Basic ${config.auth.user}:${config.auth.password}`;
    }

    if(Object.keys(heads).length) {
      params.headers = new Headers(heads);
    }

    fetch(url, {
      method,
      ...params
    })
    .then(response => {
      const contentType = response.headers.get("content-type");
      if(response.ok) {
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(data => resolve(data));
        }

        if(response.status!==204) {
          console.log("RESOLVE FETCH NO JSON: ",response);
          return resolve(response);
        }
        return resolve(true);
      }
      else {
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(err => reject(err));
        }
        if(response.status!==204) {
          console.log("REJECT FETCH NO JSON: ", response);
          return reject(response);
        }
        return reject(true);
      }
    })
    .catch(err =>  {
      console.log("FETCH CATCH:", err);
      return reject(err);
    });
  });
  return prom;
}

export const jsonDelete = (url, config) => {
  return fetchMethod(HTML_METHOD_DELETE, url, config);
}

export const jsonGet = (url, config) => {
  const prom = new Promise((resolve, reject) => {
    fetchMethod(HTML_METHOD_GET, url, config)
    .then(response => resolve(response))
    .catch(fetchError => {
      if(isDefined(axios)){
        axiosMethod(HTML_METHOD_GET,url, config)
        .then(response => resolve(response))
        .catch(axiosError => reject({error: {fetch: fetchError, axios: axiosError}}));
      }
      else {
        return reject(fetchError);
      }
    });

  });
  return prom;
}

export const jsonPatch = (url, config) => {
  return fetchMethod(HTML_METHOD_PATCH, url, config);
}

export const jsonPost = (url, config) => {
  return fetchMethod(HTML_METHOD_POST, url, config);
}

export const jsonPut = (url, config) => {
  return fetchMethod(HTML_METHOD_PUT, url, config);
}