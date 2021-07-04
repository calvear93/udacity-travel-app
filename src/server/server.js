import express from 'express';
import cors from 'cors';
import { mockAll } from 'mock';
import { createRoutes } from './routes';

const PORT = 3000;

// initializes express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));
createRoutes(app);

// starts server
app.listen(PORT, () =>
{
    mockAll(); // mocks api calls if DEBUG env var is true
    console.info(`Server listening at http://localhost:${PORT}`);
});
