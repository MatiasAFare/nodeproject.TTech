import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './src/routes/auth.routes.js';
import productsRoutes from './src/routes/products.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/api', productsRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is running',
        version: '1.0.0'
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: `Route ${req.method} ${req.path} not found`,
        path: req.path
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});

