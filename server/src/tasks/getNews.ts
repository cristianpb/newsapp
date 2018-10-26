// importing mongoClient to connect at mongodb
import { MongoClient } from 'mongodb';
import { ProcessNews } from '../lib/processNews';
import { ProcessFacebook } from '../lib/facebookPost';
import { magenta } from 'colors';
import { environment } from '../environment';

import { CronJob } from 'cron';

(async () => {
  // connecting at mongoClient
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });

  const db = await connection.db('newsapp');
  console.log('Connected');

  //const FB = new ProcessFacebook(process.env.FACEBOOK_ACCESSTOKEN, 'cityaiparis', `https://ng-tweet.herokuapp.com/api/news`);
  //new CronJob({
  //  // At 12:05 on every day-of-week from Sunday through Friday.
  //  cronTime: '05 12 * * 0-5',
  //  onTick: async function () {
  //    await FB.postNews();
  //  },
  //  start: true,
  //  timeZone: 'Europe/Paris'
  //});

  //const fbGswai = new ProcessFacebook(process.env.FACEBOOK_ACCESSTOKEN_GSWAI, 'GlobalSWAI', `https://ng-tweet.herokuapp.com/api/news_gswai`);
  //const fbFrench = new ProcessFacebook(process.env.FACEBOOK_ACCESSTOKEN, 'cityaiparis', `https://ng-tweet.herokuapp.com/api/news_fr`);
  //new CronJob({
  //  // At 08:05 on every day-of-week from Sunday through Friday.
  //  cronTime: '5 8 * * 0-5',
  //  onTick: async function () {
  //    await fbFrench.postNews();
  //    await fbGswai.postNews();
  //  },
  //  start: true,
  //  timeZone: 'Europe/Paris'
  //});

  await ProcessNews.searchNews(db, 'news_gswai', ['artificial%20intelligence', 'deep%20learning', 'machine%20learning'], 'top-headlines');
  await ProcessNews.searchNews(db, 'news_fr', ['+intelligence%20AND%20+artificielle%20AND%20(paris%20OR%20france)%20-smartphone'], 'everything');
  await ProcessNews.searchNews(db, 'news', ['+artificial%20AND%20+intelligence%20AND%20(paris%20OR%20france)%20-smartphone'], 'everything');
  new CronJob({
    cronTime: '00 */4 * * *',
    onTick: async function () {
      /*
       * At every 6 minutes
       */
      await ProcessNews.searchNews(db, 'news_gswai', ['artificial%20intelligence'], 'top-headlines');
      await ProcessNews.searchNews(db, 'news_fr', ['+intelligence%20AND%20+artificielle%20AND%20(paris%20OR%20france)%20-smartphone'], 'everything');
      await ProcessNews.searchNews(db, 'news', ['+artificial%20AND%20+intelligence%20AND%20(paris%20OR%20france)%20-smartphone'], 'everything');
    },
    start: true,
    timeZone: 'Europe/Paris'
  });
})();
