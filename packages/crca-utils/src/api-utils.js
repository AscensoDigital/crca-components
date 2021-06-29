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
      if(response.ok) {
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } /* else {
          console.log("ContentType: ", contentType);
        }
        console.log("FETCH: ",response); */
        return resolve(false);
      }
      else {
        return reject(response);
      }
    })
    .then(data => resolve(data))
    .catch(err => reject(err));
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