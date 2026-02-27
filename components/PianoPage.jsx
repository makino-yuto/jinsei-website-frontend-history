import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalPage.css';

const PianoPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rugged-page">
            <header className="rugged-header">
                <nav className="rugged-nav">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate(-1); }}>[ HOME ]</a>
                </nav>
            </header>

            <main className="rugged-main">
                <section className="rugged-section">
                    <h2 className="section-title">PIANO</h2>
                    <div className="section-content">
                        <div className="aboutme-text">
                            <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                ミスチルなどをよく弾きます。<br />
                                現在、ピアノに関する詳細ページを準備中です。
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="rugged-footer">
                <p>&copy; 2026 jinsei</p>
            </footer>
        </div>
    );
};

export default PianoPage;
