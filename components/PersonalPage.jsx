import React from 'react';
import './PersonalPage.css';
import reflexImage from '../assets/thumbnail-reflex.png';

const PersonalPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('profile'); // profile, skills, projects, career

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'license', label: 'License' },
    { id: 'works', label: 'Works' },
    { id: 'career', label: 'Career' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="profile-container fade-in">
            <div className="plain-text-area">
              <p>
                おはようございます。
                <br />
              </p>
            </div>

            <div className="links-section">
              <div className="links-bento-grid">
                {/* Main Link (YouTube) */}
                <a
                  href="https://www.youtube.com/@zinseich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card main-card"
                >
                  <div className="card-icon youtube-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  {/* card-text hidden by CSS */}
                  <div className="card-text">
                    <span className="card-title">YouTube</span>
                    <span className="card-subtitle">人生ちゃんねる</span>
                  </div>
                </a>

                {/* Sub Link (Note) */}
                <a
                  href="https://note.com/asya1793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card sub-card"
                >
                  <div className="card-icon note-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <span className="card-title">note</span>
                  </div>
                </a>

                {/* Sub Link (X) */}
                <a
                  href="https://x.com/yukkuri_asya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card sub-card"
                >
                  <div className="card-icon x-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </div>
                  <div className="card-text">
                    <span className="card-title">X</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );

      case 'license':
        const licenseData = [
          {
            period: '2026/02/16',
            title: '基本情報技術者試験 (FE)',
            type: 'university',
            embedVideo: "https://www.youtube.com/embed/z4AopNHGv3Q"
          }
        ];

        return (
          <div className="timeline-container fade-in">
            {licenseData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className={`timeline-marker ${item.type}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                {index !== licenseData.length - 1 && <div className="timeline-connect" />}

                <div className="timeline-content-wrapper">
                  <div className="timeline-content-card">
                    <span className="timeline-period">{item.period}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    {item.desc && <p className="timeline-desc">{item.desc}</p>}
                  </div>

                  {item.embedVideo && (
                    <div className="timeline-extra-content">
                      <div className="timeline-connector-line"></div>
                      <div className="video-embed-container">
                        <iframe
                          src={item.embedVideo}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'works':
        return (
          <div className="fade-in">
            <a
              href="https://reflex.jinsei-makino.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-image">
                <img src={reflexImage} alt="Reflex Test" />
              </div>
              <div className="project-info">
                <div className="project-header">
                  <h3 className="project-title">反射神経テスト</h3>
                  <span className="project-date">release 2026.02.18</span>
                </div>
                <p className="project-desc">
                  用いたシンプルかつ高精度な反射神経テスト。<br />
                  視覚/聴覚を選択可能。
                </p>
              </div>
            </a>
          </div>
        );

      case 'career':
        const careerData = [
          {
            year: '2026',
            period: '26/04/01 - Current',
            title: '電気通信大学',
            desc: '情報理工学域Ⅰ類',
            type: 'university'
          },
          {
            year: '2024',
            period: '24/04/01 - 26/03/31',
            title: '静岡大学',
            desc: '情報学部情報科学科',
            type: 'university'
          },
          {
            year: '2005',
            period: '2005/01/22',
            title: '愛知県春日井市',
            desc: '生誕',
            type: 'birth'
          },
        ];

        return (
          <div className="timeline-container fade-in">
            {careerData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className={`timeline-marker ${item.type}`}>
                  {item.type === 'university' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  )}
                  {item.type === 'birth' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                </div>
                {index !== careerData.length - 1 && <div className="timeline-connect" />}
                <div className="timeline-content-card">
                  <span className="timeline-period">{item.period}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="personal-page">


      {/* Hamburger Button */}
      <button
        className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <nav className="menu-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigation(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="content-wrapper">
        <header className="header">
          <div className="logo-placeholder">
            <h1 className="logo-text">
              {activeSection === 'profile' && 'Profile'}
              {activeSection === 'license' && 'License'}
              {activeSection === 'works' && 'Works'}
              {activeSection === 'career' && 'Career'}
            </h1>
          </div>
        </header>

        <main className="main-content-area">
          {renderContent()}
        </main>

        <footer className="footer">
          <p>&copy; 2026 Makino Yuto. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PersonalPage;
