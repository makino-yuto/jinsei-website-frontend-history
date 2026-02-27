import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PersonalPage.css';

const BicyclePage = () => {
    const navigate = useNavigate();
    const [videosExpanded, setVideosExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const powerData = [
        { month: '25/10', FTP: 2.721 },
        { month: '25/11', FTP: 3.369 },
        { month: '25/12', FTP: 3.369 },
        { month: '26/01', FTP: 3.369 },
        { month: '26/02', FTP: 3.750 },
    ];

    const tournaments = [];

    const videos = [
        { id: "9sUUwfLeDj8", title: "最近のヒルクライム練習" },
        { id: "4KOQAiqXXoM", title: "ローラー台でのFTP計測" },
        { id: "d7sJJgeyqUU", title: "レースの振り返り" },
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
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate(-1); }} style={{ position: 'absolute', left: '1.5rem', margin: 0 }}>[ HOME ]</a>
                    <a href="#equipment" onClick={(e) => scrollToSection(e, 'equipment')}>[ GEAR ]</a>
                    <a href="#results" onClick={(e) => scrollToSection(e, 'results')}>[ RESULTS ]</a>
                    <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')}>[ VIDEOS ]</a>
                    <a href="#power" onClick={(e) => scrollToSection(e, 'power')}>[ CURRENT POWER(PWR) ]</a>
                </nav>
            </header>

            <main className="rugged-main">
                <section className="rugged-section">
                    <h2 className="section-title">BICYCLE</h2>
                    <div className="section-content">
                        <div className="aboutme-text">
                            <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                2028年の富士ヒルクライムでプラチナリング獲得を目標に、日々トレーニング中。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="equipment" className="rugged-section">
                    <h2 className="section-title">GEAR</h2>
                    <div className="section-content">
                        <div className="career-list">
                            <div className="career-item">
                                <div className="career-period">2025/10 - CURRENT</div>
                                <div className="career-details">
                                    <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0, marginTop: "0.2rem" }}>
                                        自転車: NESTO LIMIT 2<br />
                                        スマートトレーナー: ThinkRider X2Max
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="results" className="rugged-section">
                    <h2 className="section-title">RESULTS</h2>
                    {tournaments.length === 0 ? (
                        <div className="section-content">
                            <div className="aboutme-text">
                                <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                    なし
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {tournaments.map((t, idx) => (
                                <div key={idx} className="rugged-card">
                                    <div className="card-header">
                                        <span className="card-period">{t.period}</span>
                                        <h3 className="card-title">{t.title}</h3>
                                        <p className="card-desc">{t.desc}</p>
                                    </div>
                                    {t.embedVideo && (
                                        <div className="video-container">
                                            <iframe
                                                src={t.embedVideo}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section id="videos" className="rugged-section">
                    <h2 className="section-title">VIDEOS</h2>
                    <div style={{ position: 'relative', overflow: 'hidden', maxHeight: videosExpanded ? '5000px' : '350px', transition: 'max-height 0.4s ease-in-out' }}>
                        <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: videosExpanded ? '1rem' : '4rem' }}>
                            {videos.map((v, idx) => (
                                <div key={idx} className="video-container" style={{ margin: 0 }}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${v.id}`}
                                        title={v.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                        {!videosExpanded && (
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
                </section>

                <section id="power" className="rugged-section">
                    <h2 className="section-title">CURRENT POWER(PWR)</h2>
                    <div className="section-content" style={{ display: 'block' }}>
                        <div className="rugged-card" style={{ height: '300px', padding: '1.5rem 1rem 1rem 0' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={powerData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" />
                                    <XAxis dataKey="month" stroke="#5b84a6" fontSize={12} />
                                    <YAxis stroke="#5b84a6" fontSize={12} domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px' }}
                                        labelStyle={{ color: '#0f213b', fontWeight: 'bold' }}
                                        formatter={(value) => [`${value} W/kg`, 'FTP(W/kg)']}
                                    />
                                    <Line type="monotone" dataKey="FTP" stroke="#0f213b" strokeWidth={2} activeDot={{ r: 6 }} name="FTP (W/kg)" />
                                </LineChart>
                            </ResponsiveContainer>
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
