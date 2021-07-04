import { isDefined, isObject } from "./data-utils";

const fetchMethod = (method, url, config) => {
  const prom = new Promise((resolve, reject) => {

    const params = {};
    const heads = {};
    if(method!=='get' && isDefined(config.data) && isObject(config.data)) {
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
        return resolve(false);
      }
      else {
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(err => reject(err));
        }
        if(response.status!==204) {
          console.log("REJECT FETCH NO JSON: ", response);
          return reject(response);
        }
        return reject(false);
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
  return fetchMethod('delete', url, config);
}

export const jsonGet = (url, config) => {
  return fetchMethod('get', url, config);
}

export const jsonPatch = (url, config) => {
  return fetchMethod('patch', url, config);
}

export const jsonPost = (url, config) => {
  return fetchMethod('post', url, config);
}

export const jsonPut = (url, config) => {
  return fetchMethod('put', url, config);
}