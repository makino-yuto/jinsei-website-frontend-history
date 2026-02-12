import React from 'react';
import './PersonalPage.css';

const PersonalPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('links'); // links, profile, qualifications, experience

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'links', label: 'Links' },
    { id: 'profile', label: 'Profile' },
    { id: 'license', label: 'License' },
    { id: 'career', label: 'Career' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'links':
        return (
          <div className="links-container fade-in">
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
              <div className="card-text">
                <span className="card-title">YouTube</span>
                <span className="card-subtitle">人生ちゃんねる</span>
              </div>
            </a>

            {/* Sub Links (Note, X) */}
            <div className="sub-links-row">
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
                  <span className="card-title">Note</span>
                </div>
              </a>

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
                  <span className="card-title">X (Twitter)</span>
                </div>
              </a>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="plain-text-area fade-in">
            <p>
              初めまして、人生です。<br /><br />


            </p>
          </div>
        );
      case 'license':
        return (
          <div className="plain-text-area fade-in">
            <ul className="plain-list">
              <li>なし</li>
            </ul>
          </div>
        );
      case 'career':
        return (
          <div className="plain-text-area fade-in">
            <div className="text-block">
              <p className="year">2024年度 - 202年度</p>
              <p className="detail">静岡大学 / 情報学部情報科学科</p>
            </div>
            <div className="text-block">
              <p className="year">2026年度 - </p>
              <p className="detail">電気通信大学 / 情報理工学域Ⅰ類</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="personal-page">
      {/* Geometric Shapes */}
      <div className="geo-shape shape-1"></div>
      <div className="geo-shape shape-2"></div>
      <div className="geo-shape shape-3"></div>

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
          {/* Logo or Title Placeholder */}
          <div className="logo-placeholder">
            <h1 className="logo-text">
              <h1 className="logo-text">
                {activeSection === 'links' && 'Links'}
                {activeSection === 'profile' && 'Profile'}
                {activeSection === 'license' && 'License'}
                {activeSection === 'career' && 'Career'}
              </h1>
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
