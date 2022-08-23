import { expect } from '@esm-bundle/chai';
import { fetchMethod } from '../../../src/utils/api-utils';

it('fetchMethod get status then has data', () => {
  const url = 'https://apidev.restu.io/dev/';
  const method = 'get';
  fetchMethod(method,url,{}).then(response => {
    expect(response).to.have.property('data');
  });
});

it('fetchMethod get status then not Permission', () => {
  const url = 'https://restu.ascensoinversiones.cl/master/server/info';
  const method = 'get';
  fetchMethod(method,url,{}).then(response => {
    expect(response).to.have.property('error');
  });
});