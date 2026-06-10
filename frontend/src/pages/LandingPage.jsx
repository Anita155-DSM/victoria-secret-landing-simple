import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./LandingPage.css";
import Catalog from "../components/Catalog"

const LandingPage = () => {
  // Estado del carrito y la UI
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("vs_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estados específicos pedidos en el TP (Punto 13)
  const [selectedFragrance, setSelectedFragrance] = useState("Bare Vanilla");
  const [stockLeft, setStockLeft] = useState(12);

  useEffect(() => {
    localStorage.setItem("vs_cart", JSON.stringify(cart));
  }, [cart]);

  // Opciones de fragancias
  const fragrances = [
    {
      name: "Bare Vanilla",
      notes: "Vainilla batida y cachemira suave.",
      img: "/barevanilla.jpg",
    },
    {
      name: "Velvet Petals",
      notes: "Flores deliciosas y glaseado de almendra.",
      img: "/velvetpetals.jpg",
    },
    {
      name: "Romantic",
      notes: "Ciruela exprimida y melón triturado.",
      img: "/romantic.jpg",
    },
  ];

  const currentFragrance = fragrances.find((f) => f.name === selectedFragrance);

  const handleAddToCart = () => {
    const product = {
      _id: selectedFragrance,
      name: `Combo Perfecto: ${selectedFragrance}`,
      price: 52000,
      imageUrl: currentFragrance.img,
      quantity: 1,
    };

    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists)
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...prev, product];
    });

    setStockLeft((prev) => prev - 1);
    console.log(
      `[Meta Pixel] Evento: AddToCart | Combo: ${selectedFragrance} | Valor: $52000 ARS`,
    );
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    console.log(
      `[Google Analytics] Evento: purchase | Total: $${total} ARS | Pasarela: Mercado Pago`,
    );
    alert("¡Redirigiendo a Mercado Pago para compra segura!");
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="landing-container">
      <Helmet>
        <title>El Combo Perfecto | Scent Layering Victoria's Secret</title>
        <meta
          name="description"
          content="Maximizá la duración de tu fragancia con el Combo Perfecto de Victoria's Secret. Llevá crema + body splash con 15% OFF."
        />
      </Helmet>

      <nav className="navbar">
        <div className="logo">VICTORIA'S SECRET</div>
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <i className="bi bi-bag"></i> Bolsa (
          {cart.reduce((sum, item) => sum + item.quantity, 0)})
        </div>
      </nav>

      {/* ACÁ VA TU BANNER DISEÑADO (Reemplazá la ruta por la de tu imagen) */}
      <div className="custom-hero-banner">
        <img
          src=".\public\Banner Ofertas Imperdibles Calzado Collage Gris Oscuro y Rosa (1000 x 400 mm) (1000 x 100 mm).png"
          alt="15% OFF + Envío Gratis"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Barra de Confianza con Íconos de Bootstrap */}
      <div className="trust-badges">
        <div className="badge">
          <span className="badge-icon">
            <i className="bi bi-truck"></i>
          </span>
          <p>Envío Gratis a todo el país</p>
        </div>
        <div className="badge">
          <span className="badge-icon">
            <i className="bi bi-credit-card"></i>
          </span>
          <p>Hasta 6 cuotas sin interés</p>
        </div>
        <div className="badge">
          {/* El ícono de conejito no está en Bootstrap, usamos un corazón o un escudo de check */}
          <span className="badge-icon">
            <i className="bi bi-suit-heart-fill"></i>
          </span>
          <p>100% Cruelty Free</p>
        </div>
        <div className="badge">
          <span className="badge-icon">
            <i className="bi bi-shield-check"></i>
          </span>
          <p>Compra Segura</p>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL: Producto Único (Alineado al Punto 13) */}
      {/* SECCIÓN PRINCIPAL: Producto Único */}
      <main>
        {/* Contenedor Flex solo para el producto */}
        <div className="product-showcase">
          <div className="product-gallery">
            <img
              src={currentFragrance.img}
              alt={currentFragrance.name}
              className="main-product-img"
            />

            {/* Elemento de Video Demostrativo */}
            <div className="video-container">
              <div className="video-placeholder">
                <span> ▶ Reproducir Scent Layering Tutorial</span>
              </div>
            </div>
          </div>

          <div className="product-details">
            <h1>El Combo Perfecto</h1>
            <p className="subtitle">
              Crema Corporal Hidratante (236ml) + Fragrance Mist (250ml)
            </p>

            <div className="price-section">
              <span className="old-price">$61.100</span>
              <span className="new-price">$52.000 ARS</span>
              <span className="discount-tag">-15% OFF</span>
            </div>

            {/* Selector de Fragancia */}
            <div className="fragrance-selector">
              <h3>1. Elegí tu fragancia clásica:</h3>
              <div className="selector-buttons">
                {fragrances.map((f) => (
                  <button
                    key={f.name}
                    className={`fragrance-btn ${selectedFragrance === f.name ? "active" : ""}`}
                    onClick={() => setSelectedFragrance(f.name)}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <p className="notes-desc">
                <strong>Notas:</strong> {currentFragrance.notes}
              </p>
            </div>

            {/* Contador de Stock */}
            <div className="urgency-counter">
              🔥 ¡Apurate! Solo quedan <strong>{stockLeft} combos</strong> en
              stock de esta fragancia.
            </div>

            <button
              className="buy-button"
              onClick={handleAddToCart}
              disabled={stockLeft === 0}
            >
              {stockLeft === 0 ? "Sin Stock" : "Añadir a la Bolsa"}
            </button>

            {/* Reseñas Verificadas */}
            <div className="verified-reviews">
              <div className="stars">⭐⭐⭐⭐⭐ 4.9/5</div>
              <p className="review-text">
                "Compré el de Bare Vanilla y haciendo los dos pasos el perfume
                me dura literal todo el día. ¡Amo!" -{" "}
                <em>Valentina, Córdoba</em> ✓ Compradora verificada
              </p>
            </div>
          </div>
        </div>{" "}
        {/* ACÁ CERRAMOS EL SHOWCASE PARA QUE NO ROMPA LO DE ABAJO */}
        {/* Sección de Embajadoras / Social Proof */}
        {/*ACA CATALOG */}
        <Catalog></Catalog>
        <section className="social-proof-section">
          <h2 className="section-title">Visto en TikTok e Instagram</h2>
          <p className="social-subtitle">
            Nuestras embajadoras ya probaron el Scent Layering. ¡Sumate a la
            tendencia!
          </p>
          <div className="social-grid">
            <div className="social-card">
              <img
                src="https://images.unsplash.com/photo-1515347619252-8d29b861b36a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="TikTok Trend 1"
              />
              <div className="social-overlay">@valen_beauty</div>{" "}
              {/* link tiktok: https://www.tiktok.com/@valenbeauty */}
            </div>
            <div className="social-card">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Instagram Trend 2"
              />
              <div className="social-overlay">@mía.lifestyle</div>
            </div>
            <div className="social-card">
              <img
                src="https://images.unsplash.com/photo-1512413914488-842211516e02?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="TikTok Trend 3"
              />
              <div className="social-overlay">@sofia_makeuptips</div>
            </div>
            <div className="social-card">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Instagram Trend 4"
              />
              <div className="social-overlay">@cami.ugc</div>
            </div>
          </div>
        </section>
        {/* Preguntas Frecuentes - Estrategia SEO */}
        <section className="faq-section">
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h4>¿Por qué comprar la crema y el splash juntos?</h4>
              <p>
                Para aplicar la técnica de Scent Layering. Al superponer las
                capas de hidratación y fragancia, el aroma se adhiere a las
                moléculas de la crema, triplicando su duración en la piel.
              </p>
              <a href="https://www.tiktok.com/@casaamericanapy7/video/7609327204941483272?q=tutorial%20Scent%20Layering%20victoria%20secret&t=1781107260998">
                <button type="button">técnica de Scent Layering</button>
              </a>
            </div>
            <div className="faq-item">
              <h4>¿Cuánto demora el envío?</h4>
              <p>
                Los envíos se despachan en 24hs hábiles. A CABA y GBA llegan en
                el día, y al resto del país entre 3 a 5 días hábiles.
              </p>
            </div>
            <div className="faq-item">
              <h4>¿Son productos originales?</h4>
              <p>
                Sí, somos distribuidores oficiales. Todos nuestros combos
                incluyen el packaging original y estampilla de importación.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Panel del Carrito (Checkout sin fricciones) */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-sidebar-header">
          <h3>Tu Bolsa</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>
        <div className="cart-sidebar-content">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>
                  ${item.price.toLocaleString("es-AR")} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <button className="checkout-btn mp-btn" onClick={handleCheckout}>
              Pagar con Mercado Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
