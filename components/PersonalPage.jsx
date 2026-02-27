import React from 'react';
import { Link } from 'react-router-dom';
import './PersonalPage.css';
import reflexImage from '../assets/thumbnail-reflex.png';
import profileIcon from '../assets/CtwKBnls_400x400.jpg';

const PersonalPage = () => {
  const licenseData = [
    {
      period: '2026/02/16',
      title: '基本情報技術者(FE)',
      type: 'license',
      embedVideo: "https://www.youtube.com/embed/z4AopNHGv3Q"
    },
    {
      period: '2024/07/25',
      title: 'TOEIC® Listening & Reading IPテスト',
      type: 'license',
      desc: '5月中にYouTubeにて更新予定'
    }
  ];

  const careerData = [
    {
      year: '2005',
      period: '2005/01/22',
      title: '愛知県春日井市',
      desc: '誕生'
    },
    {
      year: '2020',
      period: '2020/04/01 - 2023/03/31',
      title: '愛知県立春日井南高等学校',
      desc: ''
    },
    {
      year: '2023',
      period: '2023/04/01 - 2024/03/31',
      title: '浪人',
      desc: ''
    },
    {
      year: '2024',
      period: '2024/04/01 - 2026/03/31',
      title: '静岡大学',
      desc: '情報学部情報科学科'
    },
    {
      year: '2026',
      period: '2026/04/01 - CURRENT',
      title: '電気通信大学',
      desc: '情報理工学域Ⅰ類'
    },
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
          <a href="#links" onClick={(e) => scrollToSection(e, 'links')}>[ LINKS ]</a>
          <a href="#license" onClick={(e) => scrollToSection(e, 'license')}>[ LICENSE ]</a>
          <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>[ WORKS ]</a>
          <span className="nav-break"></span>
          <a href="#aboutme" onClick={(e) => scrollToSection(e, 'aboutme')}>[ ABOUT ME ]</a>
          <a href="#career" onClick={(e) => scrollToSection(e, 'career')}>[ CAREER ]</a>
        </nav>
      </header>

      <main className="rugged-main">
        <section id="links" className="rugged-section">
          <h2 className="section-title">LINKS</h2>
          <div className="section-content">
            <div className="links-grid">
              <a href="https://www.youtube.com/@zinseich" target="_blank" rel="noopener noreferrer" className="rugged-link youtube-icon">
                <div className="link-content">
                  <span className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </span>
                  <span className="link-desc">みんなに見てもらいたいこと。</span>
                </div>
                <span className="link-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
              <a href="https://x.com/yukkuri_asya" target="_blank" rel="noopener noreferrer" className="rugged-link x-icon">
                <div className="link-content">
                  <span className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </span>
                  <span className="link-desc">日々のどうでもいいこと。</span>
                </div>
                <span className="link-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
              <a href="https://note.com/asya1793" target="_blank" rel="noopener noreferrer" className="rugged-link note-icon">
                <div className="link-content">
                  <span className="link-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z" />
                    </svg>
                  </span>
                  <span className="link-desc">長文で発信したいこと。</span>
                </div>
                <span className="link-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section id="license" className="rugged-section">
          <h2 className="section-title">LICENSE</h2>
          <div className="section-content">
            {licenseData.map((item, index) => (
              <div key={index} className="rugged-card">
                <div className="card-header">
                  <span className="card-period">{item.period}</span>
                  <h3 className="card-title">{item.title}</h3>
                </div>
                {item.desc && (
                  <p className="card-desc" style={{ marginBottom: "0.5rem" }}>{item.desc}</p>
                )}
                {item.embedVideo && (
                  <div className="video-container">
                    <iframe
                      src={item.embedVideo}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="works" className="rugged-section">
          <h2 className="section-title">WORKS</h2>
          <div className="section-content">
            <a href="https://reflex.jinsei-makino.com/" target="_blank" rel="noopener noreferrer" className="rugged-card work-card">
              <div className="work-image">
                <img src={reflexImage} alt="Reflex Test" />
              </div>
              <div className="work-info">
                <div className="card-header">
                  <span className="card-period">RELEASE 2026.02.18</span>
                  <h3 className="card-title">反射神経テスト</h3>
                </div>
                <p className="card-desc">シンプルかつ高精度な反射神経テスト。<br />視覚/聴覚を選択可能。</p>
              </div>
            </a>
          </div>
        </section>

        <section id="aboutme" className="rugged-section">
          <h2 className="section-title">ABOUT ME</h2>
          <div className="section-content aboutme-content">
            <div className="aboutme-icon">
              <img src={profileIcon} alt="Profile Icon" />
            </div>
            <div className="aboutme-text">
              <h3 className="aboutme-name" style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f213b", marginTop: 0, marginBottom: "1rem" }}>makino</h3>
              <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                人生名義でYouTube、X、noteなどを運営。<br />
                愛知県春日井市生まれ。<br />
                公立の小・中・高等学校を卒業。<br />
                第一志望に届かず、一年の浪人を経て静岡大学へ進学。<br />
                のちに第一志望であった電気通信大学へ三年次編入学。
              </p>

              <h3 className="section-title" style={{ marginTop: "2.5rem" }}>HOBBY</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <Link to="/piano" className="rugged-link">
                  <div className="link-content">
                    <span className="link-label">ピアノ</span>
                    <span className="link-desc">ミスチルなどをよく弾きます。</span>
                  </div>
                  <span className="link-arrow">
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px' }}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
                <Link to="/bicycle" className="rugged-link">
                  <div className="link-content">
                    <span className="link-label">自転車</span>
                    <span className="link-desc">2028年の富士ヒルクライムでプラチナリング獲得を目標に、日々トレーニング中。</span>
                  </div>
                  <span className="link-arrow">
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px' }}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="career" className="rugged-section">
          <h2 className="section-title">CAREER</h2>
          <div className="section-content">
            <div className="career-list">
              {careerData.map((item, index) => (
                <div key={index} className="career-item">
                  <div className="career-period">{item.period}</div>
                  <div className="career-details">
                    <h3 className="career-title">{item.title}</h3>
                    <p className="career-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
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

export default PersonalPage;
