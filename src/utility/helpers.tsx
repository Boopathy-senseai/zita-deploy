var qs = require('qs');

export const paramsSerializer = (params: any) => {
  return qs.stringify(params, { arrayFormat: 'comma' });
};
