import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './api.routes';

import conntectDB from './db/db'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3000;


conntectDB()

app.use(express.static(path.join(__dirname, '../../client/dist/client/browser')));


app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/client/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});