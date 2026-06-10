import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Catalog from '../components/Catalog';
import './LandingPage.css';

const LandingPage = () => {
    const catalogRef = useRef(null);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('vs_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('vs_cart', JSON.stringify(cart));
    }, [cart]);

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const itemExists = prevCart.find(item => item._id === product._id);
            if (itemExists) {
                return prevCart.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        console.log(`[Google Analytics] Evento: add_to_cart | Producto: ${product.name}`);
        setIsCartOpen(true);
    };

    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            const item = prevCart.find(i => i._id === productId);
            if (item.quantity > 1) {
                return prevCart.map(i => i._id === productId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prevCart.filter(i => i._id !== productId);
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = () => {
        console.log(`[Google Analytics] Evento: purchase | Total: $${calculateTotal()} ARS`);
        alert('¡Compra procesada! Eventos de conversión enviados.');
        setCart([]);
        setIsCartOpen(false);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="landing-container bberry-theme">
            <Helmet>
                <title>Midnight Berry Exclusivo | Victoria's Secret Argentina</title>
                <meta name="description" content="Descubrí la nueva línea Midnight Berry de Victoria's Secret. Notas de mora roja y jabuticaba en una estética limpia y femenina." />
                <meta name="keywords" content="Midnight Berry, Victoria's Secret Argentina, body splash mora roja, jabuticaba cosmética" />
            </Helmet>

            <div className="promo-banner">
                <span>✨ LANZAMIENTO EXCLUSIVO: 15% OFF EN TU PRIMER PEDIDO CON EL CÓDIGO <strong>BERRY15</strong> ✨</span>
            </div>

            <nav className="navbar">
                <div className="logo">VICTORIA'S SECRET</div>
                <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
                    🛍️ Bolsa ({totalItems})
                </div>
            </nav>

            <header className="hero-section">
                <h1>Midnight Berry</h1>
                <p>La dulzura de la mora roja se fusiona con la intensidad de la jabuticaba.</p>
                <button className="cta-button" onClick={scrollToCatalog}>
                    Explorar Línea
                </button>
            </header>

            <main ref={catalogRef}>
                <h2 className="section-title">Colección Midnight Berry</h2>
                <Catalog onAddToCart={handleAddToCart} />
            </main>

            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
            
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h3>Tu Bolsa</h3>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>
                <div className="cart-sidebar-content">
                    {cart.length === 0 ? (
                        <p className="empty-cart-msg">Tu bolsa está vacía.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                                    <button className="remove-item-btn" onClick={() => handleRemoveFromCart(item._id)}>
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;