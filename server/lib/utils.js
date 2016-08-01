import {config} from '/server/config';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const debugLog = function (m, o){
  if (config.debugLog) {
    console.log(m, ": ");
    console.log(o);
  }
};

export const validateReq = function ({query, limit, offset}){
  new SimpleSchema({
    query: {type: String},
    limit: {type: Number, max: config.maxResults, min: 1},
    offset: {type: Number}
  }).validate({query, limit, offset});
  return {query, limit, offset};
};
