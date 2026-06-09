import mongoose from 'mongoose';
import Product from './models/Product.js'; 

mongoose.connect('mongodb://localhost:27017/victorias_secret_campaign');

// Imágenes sobrias de alta calidad para simular los envases
const imgMist1 = "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgLotion1 = "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgMist2 = "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgLotion2 = "https://images.unsplash.com/photo-1615397323285-d886d34b3e34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgPremium = "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

const seedProducts = [
    // Colección Midnight Bloom
    { name: "Midnight Bloom Fragrance Mist", description: "Body splash con notas de flor de luna y maderas cremosas. Un aroma nocturno y cautivador.", price: 19.95, stock: 45, category: "Body Splash", imageUrl: imgMist1 },
    { name: "Midnight Bloom Nourishing Lotion", description: "Crema corporal hidratante de rápida absorción con fragancia a flor de luna y maderas dulces.", price: 19.95, stock: 30, category: "Cremas", imageUrl: imgLotion1 },
    
    // Colección Bare Vanilla Noir
    { name: "Bare Vanilla Noir Fragrance Mist", description: "El clásico aroma a vainilla pero con un toque oscuro y decadente de pera especiada.", price: 21.00, stock: 50, category: "Body Splash", imageUrl: imgMist2 },
    { name: "Bare Vanilla Noir Body Lotion", description: "Loción corporal que deja la piel suave y perfumada con vainilla cálida y toques amaderados.", price: 21.00, stock: 25, category: "Cremas", imageUrl: imgLotion2 },

    // Colección Love Spell Noir
    { name: "Love Spell Noir Fragrance Mist", description: "Durazno exuberante y sándalo profundo. Una versión misteriosa del hechizo de amor clásico.", price: 21.00, stock: 40, category: "Body Splash", imageUrl: imgMist1 },
    { name: "Love Spell Noir Body Cream", description: "Crema rica en humedad, perfecta para nutrir la piel de noche con aroma a frutas oscuras.", price: 21.00, stock: 35, category: "Cremas", imageUrl: imgLotion1 },

    // Colección Velvet Petals Untamed
    { name: "Velvet Petals Untamed Fragrance Mist", description: "Almendras tostadas y maderas de luna. Un body splash floral pero con una actitud salvaje y nocturna.", price: 19.95, stock: 60, category: "Body Splash", imageUrl: imgMist2 },
    { name: "Velvet Petals Untamed Lotion", description: "Hidratación 24 horas con textura aterciopelada y fragancia intensa a almendras dulces.", price: 19.95, stock: 40, category: "Cremas", imageUrl: imgLotion2 },

    // Colección Pure Seduction Decadent
    { name: "Pure Seduction Decadent Mist", description: "Ciruela de medianoche y bayas oscuras. Un body splash dulce, profundo y extremadamente seductor.", price: 22.00, stock: 55, category: "Body Splash", imageUrl: imgMist1 },
    { name: "Pure Seduction Decadent Lotion", description: "Loción nutritiva que envuelve la piel en un aroma a ciruela triturada y crema batida oscura.", price: 22.00, stock: 30, category: "Cremas", imageUrl: imgLotion1 },

    // Colección Línea Premium (Fine Fragrance)
    { name: "Very Sexy Night Fine Fragrance Mist", description: "Body splash premium. Notas de ciruela negra, maderas de terciopelo y manzana deliciosa. Pura sofisticación.", price: 35.00, stock: 20, category: "Body Splash", imageUrl: imgPremium },
    { name: "Very Sexy Night Luminous Body Cream", description: "Crema corporal luminosa. Deja un sutil destello en la piel junto a nuestra fragancia más elegante y nocturna.", price: 38.00, stock: 15, category: "Cremas", imageUrl: imgPremium },
    
    { name: "Bombshell Intense Fine Fragrance Mist", description: "Rojo, seductor y poderoso. Notas de cereza exuberante, peonía roja y vainilla ardiente.", price: 35.00, stock: 25, category: "Body Splash", imageUrl: imgPremium },
    { name: "Bombshell Intense Velvet Body Cream", description: "Crema rica y profunda que prolonga la duración de la fragancia Bombshell Intense en tu piel.", price: 38.00, stock: 18, category: "Cremas", imageUrl: imgPremium },

    { name: "Tease Rebel Fine Fragrance Mist", description: "Una regla rota: no hay flores. Rosa silvestre chocando con violetas oscuras y cuero blanco.", price: 35.00, stock: 22, category: "Body Splash", imageUrl: imgPremium },
    { name: "Tease Rebel Hydrating Body Lotion", description: "Loción de lujo que aporta una hidratación profunda y el aroma rebelde e inesperado de Tease.", price: 38.00, stock: 20, category: "Cremas", imageUrl: imgPremium },

    // Colección Dark Flora
    { name: "Dark Peony Fragrance Mist", description: "Peonía morada y almizcle puro. Un rocío ligero que evoca un jardín de flores a la medianoche.", price: 18.00, stock: 45, category: "Body Splash", imageUrl: imgMist2 },
    { name: "Dark Peony Body Lotion", description: "Suavidad instantánea con el delicado e intrigante aroma de peonías oscuras.", price: 18.00, stock: 35, category: "Cremas", imageUrl: imgLotion2 },

    { name: "Blackberry Bite Fragrance Mist", description: "Zarzamora helada y ámbar frío. Un splash refrescante pero con muchísima personalidad.", price: 18.00, stock: 50, category: "Body Splash", imageUrl: imgMist1 },
    { name: "Blackberry Bite Moisture Lotion", description: "Fórmula de rápida absorción con aloe vera y el dulce aroma de zarzamoras nocturnas.", price: 18.00, stock: 40, category: "Cremas", imageUrl: imgLotion1 }
];

const seedDB = async () => {
    try {
        console.log("Conectando a MongoDB...");
        await Product.deleteMany({}); 
        console.log("Inventario anterior eliminado.");

        await Product.insertMany(seedProducts);
        console.log(`¡Éxito! Se añadieron ${seedProducts.length} productos de cremas y body splash a la base de datos.`);
    } catch (error) {
        console.error("Error al poblar la base de datos:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();