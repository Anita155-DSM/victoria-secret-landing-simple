import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const Catalog = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Todos');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(err => console.error("Error cargando productos", err));
    }, []);

    // Función para filtrar y simular analítica de interacción
    const handleFilter = (category) => {
        setActiveFilter(category);
        console.log(`[Google Analytics] Evento: view_item_list | Filtro aplicado: ${category}`);

        if (category === 'Todos') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    if (loading) return <p className="text-center text-muted">Cargando elegancia...</p>;

    return (
        <div>
            {/* Sistema de Filtros */}
            <div className="filters-container">
                <button 
                    className={`filter-btn ${activeFilter === 'Todos' ? 'active' : ''}`} 
                    onClick={() => handleFilter('Todos')}>Ver Todo
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'Cremas' ? 'active' : ''}`} 
                    onClick={() => handleFilter('Cremas')}>Cremas
                </button>
                <button 
                    className={`filter-btn ${activeFilter === 'Body Splash' ? 'active' : ''}`} 
                    onClick={() => handleFilter('Body Splash')}>Body Splash
                </button>
            </div>

            <div className="catalog-grid">
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        onAddToCart={() => onAddToCart(product)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalog;