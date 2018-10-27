const mlabUsername = process.env.MLAB_USERNAME;
const mlabPassword = process.env.MLAB_PASSWORD;

export const environment = {
  // mongourl: `mongodb://${mlabUsername}:${mlabPassword}@ds163162.mlab.com:63162/newsapp`
  mongourl: 'mongodb://localhost:27017/newsapp',
  // news_url: 'https://ng-tweet.herokuapp.com'
  news_url: 'http://localhost:3002'
};
