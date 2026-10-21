import { useState } from 'react';
import { Link } from 'react-router-dom';
import './PersonalPage.css';
import VisitorCounter from './VisitorCounter';
import reflexImage from '../assets/thumbnail-reflex.png';
import profileIcon from '../assets/profile-icon.png';
import diaryImage from '../assets/diary.png';
import pixImage from '../assets/PIX.png';

// Xのアイコンを unavatar.io 経由で取得する。相手がアイコンを変えれば自動で追従する。
// 取得に失敗したときはXのロゴを出す。
const XAvatar = ({ handle }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    );
  }
  return (
    <img
      className="link-avatar"
      src={`https://unavatar.io/x/${handle}`}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};

const PersonalPage = () => {
  const licenseData = [
    {
      period: '2026.04.19',
      title: 'TOEIC® Listening & Reading 625点',
      type: 'license',
      embedVideo: "https://www.youtube.com/embed/GBfMXbzlba4"
    },
    {
      period: '2026.02.16',
      title: '基本情報技術者(FE)',
      type: 'license',
      embedVideo: "https://www.youtube.com/embed/z4AopNHGv3Q"
    },
    {
      period: '2026.11',
      title: '応用情報技術者 (AP)',
      type: 'license',
      planned: true
    },
    {
      period: '2027.02',
      title: 'データベーススペシャリスト',
      type: 'license',
      planned: true
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
          <a href="#social" onClick={(e) => scrollToSection(e, 'social')}>[ SOCIAL ]</a>
          <a href="#links" onClick={(e) => scrollToSection(e, 'links')}>[ LINKS ]</a>
          <a href="#license" onClick={(e) => scrollToSection(e, 'license')}>[ LICENSE ]</a>
          <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>[ WORKS ]</a>
          <span className="nav-break"></span>
          <a href="#aboutme" onClick={(e) => scrollToSection(e, 'aboutme')}>[ ABOUT ME ]</a>
          <a href="#career" onClick={(e) => scrollToSection(e, 'career')}>[ CAREER ]</a>
          <a href="#mystery" onClick={(e) => scrollToSection(e, 'mystery')}>[ ??? ]</a>
        </nav>
      </header>

      <main className="rugged-main">
        <section id="social" className="rugged-section">
          <h2 className="section-title">SOCIAL</h2>
          <div className="section-content">
            <a href="https://www.youtube.com/@zinseich" target="_blank" rel="noopener noreferrer" className="rugged-link youtube-icon">
              <div className="link-content">
                <span className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
                <span className="link-desc">見てもらいたいこと。</span>
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
            <a href="https://www.instagram.com/jinsei__ch/" target="_blank" rel="noopener noreferrer" className="rugged-link instagram-icon">
              <div className="link-content">
                <span className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                  </svg>
                </span>
                <span className="link-desc">短い動画。</span>
              </div>
              <span className="link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
            <a href="https://note.com/jinsei_makino" target="_blank" rel="noopener noreferrer" className="rugged-link note-icon">
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
            <a href="https://github.com/makino-yuto" target="_blank" rel="noopener noreferrer" className="rugged-link github-icon">
              <div className="link-content">
                <span className="link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                <span className="link-desc">作ったもの。</span>
              </div>
              <span className="link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </section>

        <section id="links" className="rugged-section">
          <h2 className="section-title">LINKS</h2>
          <div className="section-content">
            <a href="https://shiori-02-14.github.io/Homepage/" target="_blank" rel="noopener noreferrer" className="rugged-link avatar-icon">
              <div className="link-content link-content-row">
                <span className="link-icon">
                  <XAvatar handle="shiori_02_14_" />
                </span>
                <span className="link-name">しおり🔖</span>
              </div>
              <span className="link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
            <a href="https://nemut.ai/" target="_blank" rel="noopener noreferrer" className="rugged-link avatar-icon">
              <div className="link-content link-content-row">
                <span className="link-icon">
                  <XAvatar handle="ainemut" />
                </span>
                <span className="link-name">Masahiro</span>
              </div>
              <span className="link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>
          </div>
        </section>

        <section id="license" className="rugged-section">
          <h2 className="section-title">LICENSE</h2>
          <div className="section-content">
            {licenseData.map((item, index) => (
              <div key={index} className={`rugged-card ${item.planned ? 'planned-card' : ''}`}>
                <div className="card-header">
                  <span className="card-period">{item.period}</span>
                  <h3 className="card-title">
                    {item.title}
                    {item.planned && <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#5b84a6', marginLeft: '0.5rem' }}>(受験予定)</span>}
                  </h3>
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
            <a href="https://github.com/makino-yuto/diary_app" target="_blank" rel="noopener noreferrer" className="rugged-card work-card">
              <div className="work-image">
                <img src={diaryImage} alt="まいにち日記" />
              </div>
              <div className="work-info">
                <div className="card-header">
                  <span className="card-period">RELEASE 2026.05.10</span>
                  <h3 className="card-title">まいにち日記</h3>
                </div>
                <p className="card-desc">シンプルな日記アプリ。<br />Androidネイティブ。</p>
              </div>
            </a>
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
            <a href="https://github.com/makino-yuto/PIX" target="_blank" rel="noopener noreferrer" className="rugged-card work-card">
              <div className="work-image">
                <img src={pixImage} alt="PIX" />
              </div>
              <div className="work-info">
                <div className="card-header">
                  <span className="card-period">RELEASE 2025.11.09</span>
                  <h3 className="card-title">PIX</h3>
                </div>
                <p className="card-desc">練習で作ったゲーム。(未完)<br />AI不使用天然のコード。</p>
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
                のちに第一志望であった電気通信大学へ三年次編入学。<br />
                趣味はピアノと自転車。
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
                    <span className="link-desc">
                      2027年の富士ヒルクライムでプラチナリング獲得を目標に、日々トレーニング中。
                    </span>
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

        <VisitorCounter />
      </main>

      <footer className="rugged-footer">
        <p>&copy; 2026 jinsei</p>
      </footer>
    </div>
  );
};

export default PersonalPage;
