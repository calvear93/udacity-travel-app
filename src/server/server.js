import express from 'express';
import cors from 'cors';
import { createRoutes } from './routes';

const PORT = 3000;

// initializes express
const app = express();

// MIDDLEWARE
// cross-origin enable
app.use(cors());
// body parser
app.use(express.json());
// form data parser
app.use(express.urlencoded({ extended: true }));

// serves webapp
app.use(express.static('dist'));
createRoutes(app);

// starts server
app.listen(PORT, () =>
{
    console.info(`Server listening at http://localhost:${PORT}`);
});
