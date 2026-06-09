import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Asegurate de tener tu URI)
mongoose.connect('mongodb://localhost:27017/victorias_secret_campaign');

// Endpoint para obtener el catálogo dinámico
app.get('/api/products', async (req, res) => {
    try {
        // Solo traemos productos que tengan stock para incentivar la compra
        const products = await Product.find({ stock: { $gt: 0 } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el catálogo' });
    }
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));