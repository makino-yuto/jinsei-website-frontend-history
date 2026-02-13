import React from 'react';
import './PersonalPage.css';

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
    { id: 'projects', label: 'Projects' },
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
        return (
          <div className="fade-in">
            <div className="license-section">
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', marginBottom: '1.5rem' }}>License</h3>
              <div className="license-grid">
                <div className="license-card">
                  <div className="license-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                  </div>
                  <div className="license-info">
                    <span className="license-name">基本情報技術者試験 (FE)</span>
                    <span className="license-date">2026/02/16 - Fundamental Information Technology Engineer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="fade-in">
            <div className="project-card">
              <div className="project-image">
                PROJECT 01
              </div>
              <div className="project-info">
                <h3 className="project-title">My Portfolio</h3>
                <p className="project-desc">
                  This website was built using React and Vite. Designed with a focus on simplicity, high contrast, and modern aesthetics.
                </p>
              </div>
            </div>
          </div>
        );

      case 'career':
        return (
          <div className="timeline-container fade-in">
            <div className="timeline-item">
              <div className="timeline-year">2026 - Current</div>
              <div className="timeline-content">
                電気通信大学 / 情報理工学域Ⅰ類
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024 - 2026</div>
              <div className="timeline-content">
                静岡大学 / 情報学部情報科学科
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="personal-page">
      {/* Big Background Text */}
      <div className="big-bg-text">
        {activeSection === 'links' ? 'CREATOR' : activeSection.toUpperCase()}
      </div>

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
              {activeSection === 'projects' && 'Projects'}
              {activeSection === 'career' && 'Career'}
            </h1>
          </div>
        </header>

        <main className="main-content-area">
          {renderContent()}
        </main>

        <footer className="footer">
          <p>&copy; 2026 yukkuri_asya. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PersonalPage;
