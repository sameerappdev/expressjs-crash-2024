import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import posts from './routes/posts.js'
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import { fileURLToPath } from 'url';
// const posts = require('./routes/posts') common js practice
dotenv.config();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

// 1. Setup Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// 2. Adding Routes
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })

// Body Parser Middle (Used for getting data from body)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Declaring Routes
app.use('/api/posts', posts);

// Handle Invalid Route Requests
app.use(notFound) 

// Error Hanlder
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
