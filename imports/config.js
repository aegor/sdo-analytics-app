
export const config = {
  oauth_clientId: '3e3015a224a083c7ebdf',
  oauth_secret: 'c4e4242b4edc9c133e7a1149c3409d4ba6e31209',
  oauth_tokenUrl: 'https://lms.edu-kuban.ru/oauth2/access_token',
  oauth_loginUrl: 'https://lms.edu-kuban.ru/oauth2/authorize',
  oauth_identityUrl: 'https://lms.edu-kuban.ru/oauth2/user_info',
  oauth_redirectUri: 'https://frontend.edu-kuban.ru/_oauth/django?close',
  oauth_requestPermissions: 'read',
  slamDataURL: 'http://localhost:20223',
  analyticsPrefix: '/analytics',
  analyticsPermURL: 'https://cms.edu-kuban.ru',
  influxdb: true,
  influxdbURL: "http://edx:edx@127.0.0.1:8086/edx",
  influxdbRequestTimeout: 1000,
  influxdbSeriesName: "edx_webpages",
  elastic: false,
  elasticURL: "localhost:9200",
  elasticLoglevel: "trace",
  elasticindexName: "edx-webpages",
  debugLog: false
};
