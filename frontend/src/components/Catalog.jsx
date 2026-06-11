import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './Catalog.css';

const Catalog = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Todos');
    
    // NUEVO ESTADO: Controla cuántos productos se muestran inicialmente (3)
    const [visibleCount, setVisibleCount] = useState(3);

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

    const handleFilter = (category) => {
        setActiveFilter(category);
        console.log(`[Google Analytics] Evento: view_item_list | Filtro aplicado: ${category}`);
        
        // Al cambiar de filtro, volvemos a mostrar solo los primeros 3
        setVisibleCount(3);

        if (category === 'Todos') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    // Función que agrega 3 productos más a la vista
    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 3);
        console.log("[Analytics] Evento: load_more_products");
    };

    if (loading) return <p className="text-center text-muted">Cargando elegancia...</p>;

    // Cortamos el arreglo para mostrar solo los permitidos por visibleCount
    const displayedProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div>
            {/* Grilla de Productos Limitada */}
            <div className="catalog-grid">
                {displayedProducts.map(product => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        onAddToCart={() => onAddToCart(product)} 
                    />
                ))}
            </div>

            {/* Botón Cargar Más (Solo aparece si hay más productos ocultos) */}
            {visibleCount < filteredProducts.length && (
                <div className="load-more-container" style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button 
                        onClick={handleLoadMore} 
                        style={{
                            padding: '12px 30px',
                            backgroundColor: 'transparent',
                            color: '#5c2542',
                            border: '2px solid #5c2542',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#5c2542'; e.target.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#5c2542'; }}
                    >
                        Ver más productos ⬇
                    </button>
                </div>
            )}
        </div>
    );
};

export default Catalog;