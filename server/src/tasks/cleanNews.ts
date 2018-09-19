import { MongoClient } from 'mongodb';

const mlab_username = process.env.MLAB_USERNAME;
const mlab_password = process.env.MLAB_PASSWORD;
const url = `mongodb://${mlab_username}:${mlab_password}@ds111192.mlab.com:11192/newsapp`;

(async () => {
  const connection = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = connection.db('newsapp');

  await db.dropCollection('news')
  let collection_news = await db.collection('news')
  //await collection_news.createIndex( { "title": 1}, { unique: true } )
  console.log('Index Created');
})();
