import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// import routers
import PostRouter from './routers/PostRouter';
import UserRouter from './routers/UserRouter';

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        // mongoose connection
        const MONGO_URI = 'mongodb://localhost:27017/tes';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);

        // configuration
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes() {
        let router: express.Router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
    }

}

export default new Server().app;
