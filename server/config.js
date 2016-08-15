const myURL = 'https://analytics.edu-kuban.ru';
export const config = {
  myURL: myURL,
  oauth_clientId: '3e3015a224a083c7ebdf',
  oauth_secret: 'c4e4242b4edc9c133e7a1149c3409d4ba6e31209',
  oauth_tokenUrl: 'https://lms.edu-kuban.ru/oauth2/access_token',
  oauth_loginUrl: 'https://lms.edu-kuban.ru/oauth2/authorize',
  oauth_identityUrl: 'https://lms.edu-kuban.ru/oauth2/user_info',
  oauth_redirectUri: myURL + '/_oauth/django?close',
  oauth_requestPermissions: 'read',
  slamDataURL: 'http://192.168.0.30:10000',
  analyticsPrefix: '/analytics',
  analyticsPermURL: 'https://cms.edu-kuban.ru',
  influxdb: false,
  influxdbURL: "http://edx:edx@127.0.0.1:8086/edx",
  influxdbRequestTimeout: 1000,
  influxdbSeriesName: "edx_webpages",
  elastic: false,
  elasticURL: "localhost:9200",
  elasticLoglevel: "trace",
  elasticindexName: "edx-webpages",
  mysql: true,
  mysqlConnection: {
    host     : '127.0.0.1',
    user     : 'edxapp001',
    password : 'password',
    database : 'edxapp',
    port: 3307
  },
  quasar: true,
  quasarPrefix: '/query/fs/edx/meteor/',
  maxResults: 2000,
  debugLog: false
};
