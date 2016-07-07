import {config} from '../imports/config.js';
const influx = require('influx');
const elasticsearch = require('elasticsearch');

export var elastic = null;
export var influxdb = null;

// Stuff to initialialize elastic

if (config.elastic) {
  elastic = new elasticsearch.Client({
    host: config.elasticURL,
    log: config.elasticLoglevel
  });
}

// Stuff to initialize influxdb

if (config.influxdb) {
  influxdb = influx(!!config.influxdbURL ? config.influxdbURL : "http://edx:edx@127.0.0.1:8086/edx");
  influxdb.setRequestTimeout(!!config.influxdbRequestTimeout ? config.influxdbRequestTimeout : 1000);
}
