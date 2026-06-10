import mongoose from 'mongoose';
import Product from './models/Product.js'; 

mongoose.connect('mongodb://localhost:27017/victorias_secret_campaign');

// Imágenes minimalistas con estética limpia
const imgMist = "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgLotion = "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgShimmer = "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const imgWash = "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

const seedProducts = [
    // Fragancias / Body Splash (Precios estimados en ARS)
    { name: "Midnight Berry Fragrance Mist", description: "Body splash ligero con notas dominantes de mora roja silvestre y un toque exótico de jabuticaba.", price: 29500, stock: 50, category: "Fragancias", imageUrl: imgMist },
    { name: "Midnight Berry Shimmer Mist", description: "Fragancia de mora roja con destellos luminosos para un brillo sutil en la piel. Ideal para la noche.", price: 32000, stock: 40, category: "Fragancias", imageUrl: imgShimmer },
    { name: "Midnight Berry Travel Mist", description: "La versión compacta de 75ml de tu fragancia favorita de mora y jabuticaba, lista para llevar en la cartera.", price: 18500, stock: 60, category: "Fragancias", imageUrl: imgMist },
    { name: "Midnight Berry Diamond Splash", description: "Edición especial con extractos frutales concentrados y notas profundas de bayas de medianoche.", price: 35000, stock: 20, category: "Fragancias", imageUrl: imgShimmer },

    // Cuidado Corporal / Cremas
    { name: "Midnight Berry Body Lotion", description: "Loción corporal hidratante de absorción rápida. Nutre la piel con aroma a mora roja por 24 horas.", price: 29500, stock: 45, category: "Cremas", imageUrl: imgLotion },
    { name: "Midnight Berry Velvet Body Cream", description: "Crema ultra rica con manteca de karité, perfumada con notas intensas de jabuticaba y frutos rojos.", price: 33500, stock: 30, category: "Cremas", imageUrl: imgLotion },
    { name: "Midnight Berry Hand & Nail Cream", description: "Tratamiento intensivo para manos y cutículas con aceites esenciales y aroma frutal refinado.", price: 15000, stock: 55, category: "Cremas", imageUrl: imgLotion },
    { name: "Midnight Berry Soothing Body Butter", description: "Manteca corporal de hidratación profunda para pieles secas con esencia pura de mora y jabuticaba.", price: 36000, stock: 15, category: "Cremas", imageUrl: imgLotion },

    // Baño y Exfoliantes
    { name: "Midnight Berry Exfoliating Gel", description: "Exfoliante corporal suave con semillas naturales que renueva la piel dejando un delicioso aroma frutal.", price: 27000, stock: 35, category: "Cuidado", imageUrl: imgWash },
    { name: "Midnight Berry Daily Body Wash", description: "Jabón líquido aromático que limpia e hidrata la piel con una espuma rica impregnada de mora roja.", price: 25000, stock: 40, category: "Cuidado", imageUrl: imgWash }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({}); 
        await Product.insertMany(seedProducts);
        console.log(`¡Éxito! Se añadieron ${seedProducts.length} productos de la línea Midnight Berry.`);
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();