// importing mongoClient to connect at mongodb
import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';
import { Article } from '../entities/article';
import { magenta, red, blue, yellow, green } from 'colors';
import moment from 'moment';
const axios = require('axios');
const newsapi_key = process.env.NEWSAPI_KEY;

export class ProcessNews {
  static searchNews = async (db: Db, collection: string, queryList: string[], endpoint: string) => {
    queryList.forEach(async (query) => {
      const resp = await axios.get(`https://newsapi.org/v2/${endpoint}?q=${query}&apiKey=${newsapi_key}&sortBy=publishedAt`);
      console.log(resp.data.articles);
      await db.collection(collection).deleteMany({});
      ProcessNews.processNews(db, resp.data.articles, collection);
    });
  }

  static processNews = async (db: Db, articles: Article[], collection: string) => {
    articles.forEach(async (article) => {
      await db.collection(collection).insertOne(article);
    });
  }
}

interface SetTags {
  mentions?: string[];
  hashtags?: string[];
}

interface ResultSearchTweets {
  data: any;
  resp: any;
}
