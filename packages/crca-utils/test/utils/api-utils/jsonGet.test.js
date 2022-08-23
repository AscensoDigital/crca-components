import { expect } from '@esm-bundle/chai';
import { jsonGet } from '../../../src/utils/api-utils';

it('jsonGet get status then has data', () => {
  const url = 'https://apidev.restu.io/dev/';
  jsonGet(url,{}).then(response => {
    expect(response).to.have.property('data');
  });
});

it('jsonGet get status then not Permission', () => {
  const url = 'https://restu.ascensoinversiones.cl/master/server/info';
  jsonGet(url,{}).then(response => {
    expect(response).to.have.property('error');
  });
});