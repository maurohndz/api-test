// External
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// Own
import i18n from './config/i18n/index.js';
// import DataBase from './shared/database/connection.js';

import { mountRouter } from './router/index.js';
import { setLanguages } from './middlewares/languages.middelware.js'

// App express
const app = express();
// Config
app.use(cors());
app.use(i18n.init);
app.set('env', process.env.ENVIRONMENT);
app.use(setLanguages);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// Mount router
mountRouter(app);

const server = http.createServer(app);

server.listen(Number(process.env.PORT), async () => {
    console.log(`API is running on port ${Number(process.env.PORT)} in ${app.get('env')} mode`);

    // Connection to the db
    // await DataBase.establishConnection();
});
