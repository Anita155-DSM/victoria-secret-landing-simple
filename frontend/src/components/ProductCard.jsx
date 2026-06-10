import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="price">
                    ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
                {/* Botón conectado a la función principal */}
                <button onClick={onAddToCart} className="buy-button">
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;