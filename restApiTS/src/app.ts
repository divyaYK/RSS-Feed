import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

const app: Application = express();
dotenv.config();

import './database';

import authRoutes from './routes/auth';
import paperRoutes from './routes/papers';

// settings
app.set('port', 6523);

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/papers', paperRoutes);

app.listen(app.get('port'), () => console.log('Server listening on port ' + app.get('port')));
