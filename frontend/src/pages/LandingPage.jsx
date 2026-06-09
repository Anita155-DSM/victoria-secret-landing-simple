import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Catalog from '../components/Catalog';
import './LandingPage.css';

const LandingPage = () => {
    const catalogRef = useRef(null);
    
    // 1. Inicializar el carrito desde localStorage para que no se borre al refrescar
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('vs_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false); // Control del modal lateral

    // 2. Guardar en localStorage cada vez que el carrito cambie
    useEffect(() => {
        localStorage.setItem('vs_cart', JSON.stringify(cart));
    }, [cart]);

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Agregar producto o incrementar cantidad
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

        // Evento analítico automático
        console.log(`[Analytics] add_to_cart: ${product.name} | Precio: $${product.price}`);
        
        // En lugar de un alert molesto, abrimos suavemente el carrito para mostrar la UX
        setIsCartOpen(true);
    };

    // Eliminar o decrementar producto del carrito
    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            const item = prevCart.find(i => i._id === productId);
            if (item.quantity > 1) {
                return prevCart.map(i => i._id === productId ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prevCart.filter(i => i._id !== productId);
        });
    };

    // Calcular el precio total
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Simulación del Checkout final (Conversión del embudo)
    const handleCheckout = () => {
        console.log(`[Google Analytics] Evento: purchase | Total Facturado: $${calculateTotal()}`);
        console.log(`[Meta Pixel] Evento: Purchase | Items:`, cart);
        alert('¡Compra simulada con éxito! Eventos de conversión enviados a las herramientas de analítica.');
        setCart([]); // Vaciar carrito
        setIsCartOpen(false);
    };

    // Cantidad total de items para la burbuja del navbar
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="landing-container bg-dark text-light">
            <Helmet>
                <title>Midnight Elegance | Victoria's Secret Exclusivo</title>
                <meta name="description" content="Descubrí Midnight Elegance, la nueva colección de edición limitada." />
            </Helmet>

            <div className="promo-banner">
                <span>🔥 ENVÍO GRATIS + 15% OFF USANDO EL CÓDIGO <strong>MIDNIGHT15</strong> 🔥</span>
            </div>

            <nav className="navbar">
                <div className="logo">VICTORIA'S SECRET</div>
                <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
                    🛍️ Carrito <span className="cart-badge">{totalItems}</span>
                </div>
            </nav>

            <header className="hero-section">
                <h1>Midnight Elegance</h1>
                <p>La sofisticación de la noche, ahora en edición limitada.</p>
                <button className="cta-button" onClick={scrollToCatalog}>
                    Ver Colección
                </button>
            </header>

            <main ref={catalogRef}>
                <h2 className="text-center mt-5">Catálogo Exclusivo</h2>
                <Catalog onAddToCart={handleAddToCart} />
            </main>

            {/* --- MODAL / SIDEBAR DESPLEGABLE DEL CARRITO --- */}
            {isCartOpen && <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>}
            
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h3>Tu Carrito</h3>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>

                <div className="cart-sidebar-content">
                    {cart.length === 0 ? (
                        <p className="empty-cart-msg">El carrito está vacío de elegancia.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                                    <button className="remove-item-btn" onClick={() => handleRemoveFromCart(item._id)}>
                                        Eliminar uno
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
                            Finalizar Compra (Checkout)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;