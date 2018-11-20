import { createServer, Server } from 'http';
import { Request, Response } from 'express';
import express from 'express';
import path from 'path';
import { environment } from './environment';
const graph = require('fbgraph');

import { MongoClient, ObjectID } from 'mongodb';

export class NewsServer {
  public static readonly PORT:number = 3002;
  private app: express.Application;
  private server: Server;
  private port: string | number;
  private db: any;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.mongoConnect();
    this.static_content();
    this.routes();
    this.listen();
  }

  private mongoConnect(): void {
    console.log('Connected');
    MongoClient.connect(environment.mongourl, { useNewUrlParser: true }).then(
      connection => {
      this.db = connection.db('newsapp');
      }
    );
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || NewsServer.PORT;
  }

  private static_content(): void {
    this.app.use(require('cors')());
    this.app.use(require('body-parser').json());
    this.app.use(express.static(path.join(__dirname, '../../docs')));
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../docs/index.html'));
    });
    this.app.get('/dashboard', (req, res) => {
      res.sendFile(path.join(__dirname, '../../docs/index.html'));
    });
    this.app.get('/news', (req, res) => {
      res.sendFile(path.join(__dirname, '../../docs/index.html'));
    });
  }

  private routes(): void {
    this.app.get('/api/news', (req: Request, res: Response) => {
      this.getNews('news').then(( docs ) => {
        res.json({'data': docs});
      });
    });

    this.app.get('/api/news_fr', (req: Request, res: Response) => {
      this.getNews('news_fr').then(( docs ) => {
        res.json({'data': docs});
      });
    });

    this.app.get('/api/news_gswai', (req: Request, res: Response) => {
      this.getNews('news_gswai').then(( docs ) => {
        res.json({'data': docs});
      });
    });

    this.app.post('/api/like', (req: Request, res: Response) => {
      this.likeNews(req.body).then((result) => {
        res.json({message: 'ok'});
      });
    });

    this.app.post('/api/dislike', (req: Request, res: Response) => {
      this.dislikeNews(req.body).then((result) => {
        res.json({message: 'ok'});
      });
    });


  }

  private async getNews (name: string) {
    const res1 = await this.db.collection(name)
      .find({})
      .toArray();
    return res1;
  }

  private async likeNews (message: any) {
    const res1 = await this.db.collection(message.source).updateOne({'_id': ObjectID(message['_id'])}, {'$set': {'like': 1});
    return res1;
  }

  private async dislikeNews (message: any) {
    const res1 = await this.db.collection(message.source).updateOne({'_id': ObjectID(message['_id'])}, {'$unset': {'like': ''});
    return res1;
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

  }

  public getApp(): express.Application {
    return this.app;
  }
}
