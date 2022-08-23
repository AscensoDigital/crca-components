import { expect } from '@esm-bundle/chai';
import { axiosMethod } from '../../../src/utils/api-utils.js';

it('axiosMethod get status then has data', () => {
  const url = 'https://apidev.restu.io/dev/';
  const method = 'get';
  axiosMethod(method,url,{}).then(response => {
    expect(response).to.have.property('data');
  });
});

it('axiosMethod get status then not Permission', () => {
  const url = 'https://restu.ascensoinversiones.cl/master/server/info';
  const method = 'get';
  axiosMethod(method,url,{}).then(response => {
    expect(response).to.have.property('error');
  });
});