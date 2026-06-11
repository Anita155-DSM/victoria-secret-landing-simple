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

app.post('/api/checkout', async (req, res) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        for (const item of items) {
            if (!item._id || typeof item.quantity !== 'number' || item.quantity <= 0) {
                return res.status(400).json({ message: 'El carrito tiene productos inválidos' });
            }

            const product = await Product.findById(item._id);

            if (!product) {
                return res.status(404).json({ message: `No se encontró el producto ${item._id}` });
            }

            if (product.stock < item.quantity) {
                return res.status(409).json({
                    message: `Stock insuficiente para ${product.name}`,
                    productId: product._id,
                    availableStock: product.stock
                });
            }
        }

        for (const item of items) {
            await Product.findByIdAndUpdate(
                item._id,
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
        }

        return res.json({
            message: 'Stock descontado correctamente',
            redirectedTo: 'Mercado Pago'
        });
    } catch (error) {
        console.error('Error en checkout:', error);
        res.status(500).json({ message: 'Error procesando el checkout' });
    }
});

app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));