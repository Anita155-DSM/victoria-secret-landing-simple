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
        imageUrl: "/barevanilla.jpg" 
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
    },
    // --- NUEVOS COMBOS AGREGADOS ---
    { 
        name: "Combo Perfecto: Midnight Bloom", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de flor de luna y maderas cremosas.", 
        price: 52000, 
        stock: 30, 
        category: "Combos", 
        imageUrl: "/midnightbloom.jpg" 
    },
    { 
        name: "Combo Perfecto: Romantic", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de pétalos rosados y almizcle solar.", 
        price: 52000, 
        stock: 35, 
        category: "Combos", 
        imageUrl: "/romantic.jpg" 
    },
    { 
        name: "Combo Perfecto: Rush", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de maderas jugosas y mandarina brillante.", 
        price: 52000, 
        stock: 25, 
        category: "Combos", 
        imageUrl: "/rush.jpg" 
    },
    { 
        name: "Combo Perfecto: Temptation", 
        description: "Kit de Scent Layering: Fragrance Mist (250ml) + Hydrating Body Lotion (236ml). Notas de manzana deliciosa y flor de cactus fresca.", 
        price: 52000, 
        stock: 40, 
        category: "Combos", 
        imageUrl: "/temptation.jpg" 
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