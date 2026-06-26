import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalPage.css';

const PianoPage = () => {
    const navigate = useNavigate();
    const [videosExpanded, setVideosExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const videos = [
        { id: 'mhej__n5sTY', title: 'ザナルカンドにて/To Zanarkand', date: '2026/06/25' },
        { id: 'U0YUvDhSnFo', title: 'Mr.Children/終わりなき旅', date: '2026/03/07' }
    ];
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 60; // adjust for sticky header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="rugged-page">
            <header className="rugged-header">
                <nav className="rugged-nav">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-home-link">[ HOME ]</a>
                    <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')}>[ VIDEOS ]</a>
                </nav>
            </header>

            <main className="rugged-main">
                <section className="rugged-section">
                    <h2 className="section-title">PIANO</h2>
                    <div className="section-content">
                        <div className="aboutme-text">
                            <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                中学三年の夏に、卒業式の伴奏を弾くために練習開始。<br />
                                そのまま継続し、今日に至る。<br />
                                ミスチルなどをよく弾きます。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="videos" className="rugged-section">
                    <h2 className="section-title">VIDEOS</h2>
                    {videos.length === 0 ? (
                        <div className="section-content">
                            <div className="aboutme-text">
                                <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                    なし
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ position: 'relative', overflow: 'hidden', maxHeight: videosExpanded ? '5000px' : '350px', transition: 'max-height 0.4s ease-in-out' }}>
                                <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: videosExpanded ? '1rem' : '4rem' }}>
                                    {videos.map((v, idx) => (
                                        <div key={idx} className="rugged-card">
                                            <div className="card-header">
                                                <span className="card-period">{v.date}</span>
                                                <h3 className="card-title">{v.title}</h3>
                                            </div>
                                            <div className="video-container">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${v.id}?origin=${window.location.origin}`}
                                                    title={v.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!videosExpanded && videos.length > 2 && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '180px',
                                        background: 'linear-gradient(to bottom, rgba(227, 239, 250, 0), #e3effa)',
                                        pointerEvents: 'none'
                                    }}></div>
                                )}
                            </div>
                            {videos.length > 2 && (
                                <div style={{ textAlign: 'center', marginTop: videosExpanded ? '1rem' : '-2rem', position: 'relative', zIndex: 10 }}>
                                    <button
                                        onClick={() => setVideosExpanded(!videosExpanded)}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #c8def2',
                                            padding: '0.5rem 2rem',
                                            borderRadius: '4px',
                                            color: '#5b84a6',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            fontWeight: 'bold',
                                            transition: 'all 0.2s',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(200, 222, 242, 0.5)'; e.currentTarget.style.color = '#0f213b'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#5b84a6'; }}
                                    >
                                        {videosExpanded ? '∧ 閉じる' : '∨ さらに表示'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>

            <footer className="rugged-footer">
                <p>&copy; 2026 jinsei</p>
            </footer>
        </div>
    );
};

export default PianoPage;
