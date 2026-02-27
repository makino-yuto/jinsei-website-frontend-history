import React from 'react';
import { Link } from 'react-router-dom';
import './PersonalPage.css';

const BicyclePage = () => {
    return (
        <div className="rugged-page">
            <header className="rugged-header">
                <nav className="rugged-nav">
                    <Link to="/">[ HOME ]</Link>
                </nav>
            </header>

            <main className="rugged-main">
                <section className="rugged-section">
                    <h2 className="section-title">BICYCLE</h2>
                    <div className="section-content">
                        <div className="aboutme-text">
                            <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                2028年の富士ヒルクライムでプラチナリング獲得を目標に、日々トレーニング中。<br />
                                現在、自転車に関する詳細ページを準備中です。
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

export default BicyclePage;
