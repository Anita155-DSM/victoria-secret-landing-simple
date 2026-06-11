import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <div className="footer-logo">VICTORIA'S SECRET</div>
                    <p>
                        Crema + splash, elegancia y duración en una sola experiencia de
                        Scent Layering.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>Atención</h4>
                    <p>Lunes a viernes de 9 a 18 hs</p>
                    <p>Envíos a todo el país</p>
                    <p>Compra segura y seguimiento de pedido</p>
                </div>

                <div className="footer-column">
                    <h4>Contacto</h4>
                    <a href="mailto:ventas@victoriassecret.com">ventas@victoriassecret.com</a>
                    <a href="https://wa.me/5491112345678" target="_blank" rel="noreferrer">
                        WhatsApp de ventas
                    </a>
                </div>

                <div className="footer-column">
                    <h4>Seguinos</h4>
                    <div className="footer-social">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                            <i className="bi bi-tiktok"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Victoria's Secret. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;