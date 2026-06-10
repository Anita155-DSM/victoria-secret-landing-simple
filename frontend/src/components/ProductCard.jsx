import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    // Simulamos que algunos productos específicos son los favoritos de las embajadoras
    const esFavoritoSocial = product.name.includes("Shimmer") || product.name.includes("Velvet");

    return (
        <div className="product-card">
            {/* CUMPLIMIENTO TP: Badge de recomendación de embajadoras (TikTok/Instagram) */}
            {esFavoritoSocial && <span className="social-badge"></span>}
            
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">${product.price.toLocaleString('es-AR')}</span>
                <button onClick={onAddToCart} className="buy-button">
                    Añadir a la Bolsa
                </button>
            </div>
        </div>
    );
};

export default ProductCard;