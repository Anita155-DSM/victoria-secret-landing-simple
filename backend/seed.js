import mongoose from 'mongoose';
import Product from './models/Product.js'; 

mongoose.connect('mongodb://localhost:27017/victorias_secret_campaign');

const seedProducts = [
    { 
        name: "Combo Perfecto: Bare Vanilla", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de vainilla batida y cachemira suave.", 
        price: 52000, 
        stock: 40, 
        category: "Combos", 
        imageUrl: "/barevanilla.jpg" // Ruta directa a tu carpeta public
    },
    { 
        name: "Combo Perfecto: Velvet Petals", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de flores deliciosas y glaseado de almendra.", 
        price: 52000, 
        stock: 35, 
        category: "Combos", 
        imageUrl: "/velvetpetals.jpg" 
    },
    { 
        name: "Combo Perfecto: Love Spell", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de flor de cerezo y durazno fresco.", 
        price: 52000, 
        stock: 30, 
        category: "Combos", 
        imageUrl: "/lovespell.jpg" 
    },
    { 
        name: "Combo Perfecto: Coconut Passion", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de coco de la isla y arenas cálidas.", 
        price: 52000, 
        stock: 45, 
        category: "Combos", 
        imageUrl: "/coconutpassion.jpg" 
    },
    { 
        name: "Combo Perfecto: Amber Romance", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de ámbar profundo y besos de azúcar.", 
        price: 52000, 
        stock: 25, 
        category: "Combos", 
        imageUrl: "/amberromance.jpg" 
    },
    { 
        name: "Combo Perfecto: Aqua Kiss", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de aguas frías y margaritas brillantes.", 
        price: 52000, 
        stock: 20, 
        category: "Combos", 
        imageUrl: "/aquakiss.jpg" 
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({}); 
        await Product.insertMany(seedProducts);
        console.log(`¡Éxito! Se añadieron ${seedProducts.length} combos clásicos para Scent Layering con imágenes locales.`);
    } catch (error) {
        console.error("Error poblando la base de datos:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();