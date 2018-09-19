import { createServer, Server } from 'http';
import { Request, Response } from 'express';
import express from 'express';
import path from 'path';
const graph = require('fbgraph');

import { MongoClient } from 'mongodb';

const mlab_username = process.env.MLAB_USERNAME
const mlab_password = process.env.MLAB_PASSWORD
const mongourl = `mongodb://${mlab_username}:${mlab_password}@ds163162.mlab.com:63162/newsapp`;
//const mongourl = 'mongodb://localhost:27017/newsapp';

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
    MongoClient.connect(mongourl, { useNewUrlParser: true }).then(
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
    this.app.use(express.static(path.join(__dirname, '../../dist')));
    this.app.get('/', (req,res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'))
    });
    this.app.get('/dashboard', (req,res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'))
    });
    this.app.get('/news', (req,res) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'))
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

  }

  private async getNews (name: string) {
    const res1 = await this.db.collection(name)
      .find({})
      .toArray();
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
