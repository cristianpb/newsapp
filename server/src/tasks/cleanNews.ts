import { MongoClient } from 'mongodb';
import { environment } from '../environment';

(async () => {
  const connection = await MongoClient.connect(environment.mongourl, { useNewUrlParser: true });
  const db = connection.db('newsapp');

  await db.dropCollection('news');
  await db.collection('news');
  // await collection_news.createIndex( { "title": 1}, { unique: true } )
  console.log('Index Created');
})();
