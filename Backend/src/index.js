import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import videoRoutes from './routes/video.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin:'http://localhost:5173/',
    credentials:true, 
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/videos',videoRoutes);

app.listen(PORT, () => {
    console.log(`App is listening to port:${PORT}`);
    connectDB();
});
