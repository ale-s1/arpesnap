import cors from 'cors';
import Express from 'express';
import errorHandler from './middleware/error-handler';
import userRoutes from './routes/auth.router';
const app = Express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(Express.json());
app.use(cors(corsOptions));
app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
