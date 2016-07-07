
export const config = {
  influxdb: true,
  influxdbURL: "http://edx:edx@127.0.0.1:8086/edx",
  influxdbRequestTimeout: 1000,
  influxdbSeriesName: "edx_webpages",
  elastic: false,
  elasticURL: "localhost:9200",
  elasticLoglevel: "trace",
  elasticindexName: "edx-webpages",
  debugLog: true
};
