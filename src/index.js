import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { todosRouter } from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', todosRouter);

app.listen(PORT);