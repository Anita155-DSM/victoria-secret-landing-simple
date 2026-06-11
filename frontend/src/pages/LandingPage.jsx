import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./LandingPage.css";
// Si ya no querés la grilla debajo porque ahora el selector principal es dinámico,
// podés borrar la importación de Catalog. Por ahora la dejo comentada.
import Catalog from "../components/Catalog";
import Footer from "../components/Footer";

const MERCADO_PAGO_URL = "https://www.mercadopago.com.ar/";

const LandingPage = () => {
  // 1. Estados de la BD y la UI
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guardamos el producto completo seleccionado, no solo el nombre
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockLeft, setStockLeft] = useState(0);

  // 2. Estado del carrito
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("vs_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vs_cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Traer los datos de la Base de Datos al cargar la página
  useEffect(() => {
    fetch("https://victoria-secret-landing-simple.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Filtramos solo los combos por si tenés otros productos
        const combos = data.filter((item) => item.category === "Combos");
        setProducts(combos);

        // Seleccionamos el primer combo por defecto si hay datos
        if (combos.length > 0) {
          setSelectedProduct(combos[0]);
          setStockLeft(combos[0].stock);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error conectando a la BD", err);
        setLoading(false);
      });
  }, []);

  // 4. Funciones del Carrito
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    setCart((prev) => {
      const exists = prev.find((item) => item._id === selectedProduct._id);
      if (exists) {
        return prev.map((item) =>
          item._id === selectedProduct._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...selectedProduct, quantity: 1 }];
    });

    setStockLeft((prev) => prev - 1);
    console.log(
      `[Meta Pixel] Evento: AddToCart | Combo: ${selectedProduct.name} | Valor: $${selectedProduct.price} ARS`,
    );
    setIsCartOpen(true);
  };
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i._id === productId);
      if (!item) return prevCart;

      // Si hay más de uno, restamos uno a la cantidad
      if (item.quantity > 1) {
        return prevCart.map((i) =>
          i._id === productId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      // Si queda solo uno, lo borramos por completo del arreglo
      return prevCart.filter((i) => i._id !== productId);
    });

    // Devolvemos el stock al producto principal si corresponde
    if (selectedProduct && selectedProduct._id === productId) {
      setStockLeft((prev) => prev + 1);
    }

    console.log(`[Meta Pixel] Evento: RemoveFromCart | ID: ${productId}`);
  };

  const handleCheckout = async () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "No se pudo procesar el pago.");
        return;
      }

      console.log(
        `[Google Analytics] Evento: purchase | Total: $${total} ARS | Pasarela: Mercado Pago`,
      );

      setCart([]);
      setIsCartOpen(false);
      window.location.href = MERCADO_PAGO_URL;
    } catch (error) {
      console.error("Error procesando checkout", error);
      alert("No se pudo conectar con el servidor para procesar la compra.");
    }
  };

  // Pantalla de carga mientras espera a Node/MongoDB
  if (loading) {
    return (
      <div
        className="landing-container"
        style={{ textAlign: "center", padding: "100px" }}
      >
        <h2>Cargando la experiencia Victoria's Secret...</h2>
      </div>
    );
  }

  // Si no hay productos en la BD
  if (!products.length || !selectedProduct) {
    return (
      <div
        className="landing-container"
        style={{ textAlign: "center", padding: "100px" }}
      >
        <h2>No se encontraron combos en la base de datos.</h2>
      </div>
    );
  }

  //editamos para que muestre solo los primeros 3 productos de la BD, para que no se vea tan cargada la pagina y se vea mas dinamica, ya que el producto principal es el que se muestra en el banner y el selector de fragancias.
  const getRandomProducts = (list, count) => {
    //return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
    return list.slice(0, count);
  };

  return (
    <div className="landing-container">
      <Helmet>
        <title id="title">El Combo Perfecto | Scent Layering Victoria's Secret</title>
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

      {/* Banner Publicitario */}
      <div className="custom-hero-banner">
        <img
          src="/Banner.webp"
          alt="15% OFF + Envío Gratis"
          width="1920"
          height="400"
          fetchPriority="high"
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

      {/* SECCIÓN PRINCIPAL DINÁMICA (CONECTADA A LA BD) */}
      <main>
        <div className="product-showcase">
          <div className="product-gallery">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="main-product-img"
              width="500"
              height="500"
              fetchPriority="high"
            />

            {/* Elemento de Video Demostrativo de TikTok 
                        <div className="video-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <iframe
                                src="https://www.tiktok.com/embed/v2/7609327204941483272"
                                width="325"
                                height="580"
                                frameBorder="0"
                                allowFullScreen
                                title="Tutorial Scent Layering"
                                style={{ borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                            ></iframe>
                        </div>*/}
          </div>

          <div className="product-details">
            <h1>El Combo Perfecto</h1>
            <p className="subtitle">
              Crema Corporal Hidratante (236ml) + Fragrance Mist (250ml)
            </p>

            <div className="price-section">
              {/* Le sumamos un 15% simulado al precio viejo para mostrar el descuento */}
              <span className="old-price">
                ${(selectedProduct.price * 1.15).toLocaleString("es-AR")}
              </span>
              <span className="new-price">
                ${selectedProduct.price.toLocaleString("es-AR")} ARS
              </span>
              <span className="discount-tag">-15% OFF</span>
            </div>

            {/* Selector de Fragancia Dinámico */}
            <div className="fragrance-selector">
              <h3>1. Elegí tu fragancia clásica:</h3>
              <div className="selector-buttons">
                {getRandomProducts(products, 3).map((productBD) => {
                  // Extraemos el nombre corto (ej: "Bare Vanilla" en vez de "Combo Perfecto: Bare Vanilla")
                  const shortName = productBD.name.replace(
                    "Combo Perfecto: ",
                    "",
                  );

                  return (
                    <button
                      key={productBD._id}
                      className={`fragrance-btn ${selectedProduct._id === productBD._id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedProduct(productBD);
                        setStockLeft(productBD.stock);
                      }}
                    >
                      {shortName}
                    </button>
                  );
                })}
              </div>
              <p className="notes-desc">
                <strong>Descripción:</strong> {selectedProduct.description}
              </p>
            </div>

            {/* Contador de Stock Dinámico */}
            <div className="urgency-counter">
              🔥 ¡Apurate! Solo quedan <strong>{stockLeft} combos</strong> en
              stock de esta fragancia.
            </div>

            <button
              className="buy-button"
              onClick={handleAddToCart}
              disabled={stockLeft <= 0}
            >
              {stockLeft <= 0 ? "Sin Stock" : "Añadir a la Bolsa"}
            </button>

            <section className="social-proof-section">
              <h2 className="section-title">¡Productos Disponibles!</h2>
              <p className="social-subtitle">
                No te quedes sin tu combo perfecto para el Scent Layering.
                ¡Sumate a la tendencia!
              </p>
              <div className="social-grid"></div>
            </section>
          </div>
        </div>
        {/* ACA CATALOG */}
        <Catalog
          onAddToCart={(product) => {
            setCart((prev) => {
              const exists = prev.find((item) => item._id === product._id);
              if (exists)
                return prev.map((item) =>
                  item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                );
              return [...prev, { ...product, quantity: 1 }];
            });
            console.log(
              `[Meta Pixel] Evento: AddToCart | Producto Catálogo: ${product.name}`,
            );
            setIsCartOpen(true);
          }}
        />

        <section className="social-proof-section">
          <h2 className="section-title">Visto en TikTok</h2>
          <p className="social-subtitle">
            Nuestras embajadoras ya probaron el Scent Layering. ¡Sumate a la
            tendencia!
          </p>
          <div className="social-grid">
            {/* Video 1 */}
            <div className="social-card video-card">
              <iframe
                src="https://www.tiktok.com/embed/v2/7600128406205861136?_r=1&_t=ZS-976cqiMq3S0"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                title="TikTok Trend 1"
              ></iframe>
              <div className="social-overlay video-overlay">@juliirampi</div>
            </div>

            {/* Video 2 */}
            <div className="social-card video-card">
              <iframe
                src="https://www.tiktok.com/embed/v2/7518082261435108613?_r=1&_t=ZS-976dISSKTOm"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                title="TikTok Trend 2"
              ></iframe>
              <div className="social-overlay video-overlay">@maleniiittta</div>
            </div>

            {/* Video 3 */}
            <div className="social-card video-card">
              <iframe
                src="https://www.tiktok.com/embed/v2/7531422015098522902?_r=1&_t=ZS-976dZZjLThk"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                title="TikTok Trend 3"
              ></iframe>
              <div className="social-overlay video-overlay">
                @noeliameendezz
              </div>
            </div>

            {/* Video 4 */}
            <div className="social-card video-card">
              <iframe
                src="https://www.tiktok.com/embed/v2/7482968737071533317?_r=1&_t=ZS-976dkl58WMG"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                title="TikTok Trend 4"
              ></iframe>
              <div className="social-overlay video-overlay">@chicavainilla</div>
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
              <br />
              <a
                href="https://www.tiktok.com/@casaamericanapy7/video/7609327204941483272"
                target="_blank"
                rel="noreferrer"
              >
                <button type="button">Ver técnica de Scent Layering</button>
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

      <Footer />

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
              <img
                src={item.imageUrl}
                alt={item.name}
                width="80"
                height="80"
                loading="lazy"
              />
              <div className="cart-item-info" style={{ width: "100%" }}>
                <h4>{item.name}</h4>
                <p>
                  ${item.price.toLocaleString("es-AR")} x {item.quantity}
                </p>
                {/* BOTÓN PARA REMOVER EL PRODUCTO */}
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="remove-item-btn"
                >
                  <i className="bi bi-trash"></i> Quitar de la bolsa
                </button>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <p className="empty-cart-msg">Tu bolsa está vacía.</p>
          )}
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
