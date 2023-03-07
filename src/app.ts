import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { join } from 'path';
import router from './routes';

dotenv.config();
const app: Express = express();

app.set('port', process.env.PORT || 4000);
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors());
// eslint-disable-next-line func-names
// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };
app.use([compression(),
  express.json(),
  cookieParser(),
  // allowCrossDomain,
  express.urlencoded({ extended: false })]);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json('bad request');
});
app.use(
  (
    error: ErrorRequestHandler & { status?: number, message?: string },
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    if (error.status) {
      res.status(error.status).json(error.message);
    } else {
      res.status(500).json('interval server error');
    }
  },
);
export default app;
