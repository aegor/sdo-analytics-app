import {config} from '/imports/config';
const elasticsearch = require('elasticsearch');

export var elastic = null;

// Stuff to initialialize elastic

if (config.elastic) {
  elastic = new elasticsearch.Client({
    host: config.elasticURL,
    log: config.elasticLoglevel
  });
}
