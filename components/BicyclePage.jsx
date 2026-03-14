import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../supabaseClient';
import './PersonalPage.css';

const BicyclePage = () => {
    const navigate = useNavigate();
    const [videosExpanded, setVideosExpanded] = useState(false);

    // Calendar State
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");

    const [trainingData, setTrainingData] = useState({});

    useEffect(() => {
        const fetchTraining = async () => {
            if (!supabase) return;
            try {
                const { data, error } = await supabase.from('training_logs').select('*');
                if (error) {
                    console.error("Supabase error:", error);
                    return;
                }
                if (data) {
                    const map = {};
                    data.forEach(item => {
                        map[item.date] = item.content;
                    });
                    setTrainingData(map);
                }
            } catch (err) {
                console.error("Failed to fetch training:", err);
            }
        };
        fetchTraining();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");

    const handleEditClick = () => {
        setEditContent(trainingData[selectedDate] || "");
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const password = prompt("保存する場合はパスワードを入力してください", "");
        if (password === null) return; // キャンセル時

        try {
            const res = await fetch('/api/training', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, selectedDate, editContent })
            });

            if (res.ok) {
                const newData = { ...trainingData };
                if (editContent.trim() === "") {
                    delete newData[selectedDate];
                } else {
                    newData[selectedDate] = editContent;
                }
                setTrainingData(newData);
                setIsEditing(false);
            } else {
                const err = await res.json();
                alert(err.error || "保存に失敗しました。");
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("通信エラーが発生しました。");
        }
    };

    useEffect(() => {
        setIsEditing(false);
    }, [selectedDate]);

    const handlePrevMonth = () => {
        setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const hasTraining = !!trainingData[dateStr];
            const isSelected = dateStr === selectedDate;
            days.push(
                <div
                    key={i}
                    className={`calendar-day ${hasTraining ? 'has-training' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(dateStr)}
                >
                    <span className="day-number">{i}</span>
                    {hasTraining && <span className="training-dot"></span>}
                </div>
            );
        }
        return days;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const powerData = [
        { date: '2025/10/19', FTP: 2.721 },
        { date: '2025/11/21', FTP: 3.369 },
        { date: '2026/02/26', FTP: 3.750 },
    ];

    const peakPowerData = [
        { time: '5 s', W: 665, Wkg: 10.08, date: '2025/12/2' },
        { time: '15 s', W: 586, Wkg: 8.88, date: '2025/12/16' },
        { time: '30 s', W: 373, Wkg: 5.83, date: '2026/1/10' },
        { time: '1 min', W: 348, Wkg: 5.27, date: '2025/12/16' },
        { time: '3 min', W: 266, Wkg: 4.11, date: '2025/12/20' },
        { time: '5 min', W: 262, Wkg: 4.09, date: '2026/2/26' },
        { time: '10 min', W: 258, Wkg: 4.03, date: '2026/2/26' },
        { time: '12 min', W: 257, Wkg: 4.02, date: '2026/2/26' },
        { time: '15 min', W: 255, Wkg: 3.98, date: '2026/2/26' },
        { time: '20 min', W: 252, Wkg: 3.94, date: '2026/2/26' },
        { time: '30 min', W: 210, Wkg: 3.22, date: '2025/12/8' },
        { time: '40 min', W: 205, Wkg: 3.19, date: '2025/12/8' },
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

    const CustomPeakTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px', padding: '10px' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#0f213b' }}>{label}</p>
                    <p style={{ margin: 0, color: '#0f213b' }}>{data.Wkg} W/kg ({data.W} W)</p>
                    <p style={{ margin: 0, color: '#5b84a6', fontSize: '0.8rem' }}>{data.date}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rugged-page">
            <header className="rugged-header">
                <nav className="rugged-nav">
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-home-link">[ HOME ]</a>
                    <a href="#equipment" onClick={(e) => scrollToSection(e, 'equipment')}>[ GEAR ]</a>
                    <a href="#results" onClick={(e) => scrollToSection(e, 'results')}>[ RESULTS ]</a>
                    <span className="nav-break"></span>
                    <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')}>[ VIDEOS ]</a>
                    <a href="#power" onClick={(e) => scrollToSection(e, 'power')}>[ PWR ]</a>
                    <a href="#training" onClick={(e) => scrollToSection(e, 'training')}>[ TRAINING ]</a>
                </nav>
            </header>

            <main className="rugged-main">
                <section className="rugged-section">
                    <h2 className="section-title">BICYCLE</h2>
                    <div className="section-content">
                        <div className="aboutme-text">
                            <p className="biography" style={{ color: "#4f6f8f", lineHeight: "1.8", margin: 0 }}>
                                レース動画に感化され、2025年10月19日からトレーニングを始める。<br />
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
                    <h2 className="section-title">PWR</h2>
                    <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div className="rugged-card chart-wrapper" style={{ height: '320px', padding: '1.5rem 1rem 1rem 0' }}>
                            <h3 style={{ margin: '0 0 1rem 1.5rem', fontSize: '0.9rem', color: '#5b84a6' }}>FTP</h3>
                            <ResponsiveContainer width="100%" height="85%">
                                <LineChart data={powerData} margin={{ top: 30, right: 30, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" />
                                    <XAxis dataKey="date" stroke="#5b84a6" fontSize={12} />
                                    <YAxis stroke="#5b84a6" fontSize={12} domain={['auto', 'auto']} label={{ value: 'W/kg', position: 'top', offset: 15, fill: '#5b84a6', fontSize: 12, dx: 15 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px' }}
                                        labelStyle={{ color: '#0f213b', fontWeight: 'bold' }}
                                        formatter={(value) => [`${value} W/kg`, 'FTP(W/kg)']}
                                    />
                                    <Line type="linear" dataKey="FTP" stroke="#0f213b" strokeWidth={2} activeDot={{ r: 6 }} name="FTP (W/kg)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="rugged-card chart-wrapper" style={{ height: '320px', padding: '1.5rem 1rem 1rem 0' }}>
                            <h3 style={{ margin: '0 0 1rem 1.5rem', fontSize: '0.9rem', color: '#5b84a6' }}>PEAK POWER</h3>
                            <ResponsiveContainer width="100%" height="85%">
                                <LineChart data={peakPowerData} margin={{ top: 30, right: 30, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" />
                                    <XAxis dataKey="time" stroke="#5b84a6" fontSize={12} />
                                    <YAxis stroke="#5b84a6" fontSize={12} domain={[0, 'auto']} label={{ value: 'W/kg', position: 'top', offset: 15, fill: '#5b84a6', fontSize: 12, dx: 15 }} />
                                    <Tooltip content={<CustomPeakTooltip />} />
                                    <Line type="linear" dataKey="Wkg" stroke="#0f213b" strokeWidth={2} activeDot={{ r: 6 }} name="W/kg" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                <section id="training" className="rugged-section">
                    <h2 className="section-title">TRAINING</h2>
                    <div className="section-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        <div className="calendar-container">
                            <div className="calendar-header">
                                <button className="calendar-nav-btn" onClick={handlePrevMonth}>&lt;</button>
                                <span>{calendarDate.getFullYear()}年 {calendarDate.getMonth() + 1}月</span>
                                <button className="calendar-nav-btn" onClick={handleNextMonth}>&gt;</button>
                            </div>
                            <div className="calendar-grid day-headers">
                                <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
                            </div>
                            <div className="calendar-grid">
                                {renderCalendarDays()}
                            </div>
                        </div>

                        <div className="training-details-container">
                            {selectedDate ? (
                                <div className="training-details-card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="training-date" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{selectedDate.replace(/-/g, '/')}</span>
                                        {!isEditing && (
                                            <button
                                                onClick={handleEditClick}
                                                style={{ background: 'none', border: '1px solid #c8def2', borderRadius: '4px', cursor: 'pointer', color: '#5b84a6', padding: '0.2rem 0.6rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                編集
                                            </button>
                                        )}
                                    </div>
                                    <div className="training-desc" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        {isEditing ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                <textarea
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    placeholder="トレーニング内容を入力..."
                                                    style={{ width: '100%', flex: 1, minHeight: '150px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #a8cced', outline: 'none', resize: 'vertical', fontFamily: 'inherit', color: '#0f213b', background: 'rgba(255, 255, 255, 0.9)' }}
                                                />
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                                                    <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: '1px solid #c8def2', color: '#5b84a6', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>キャンセル</button>
                                                    <button onClick={handleSaveClick} style={{ background: '#5b84a6', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>保存</button>
                                                </div>
                                            </div>
                                        ) : (
                                            trainingData[selectedDate] ? (
                                                trainingData[selectedDate].split('\n').map((line, i) => (
                                                    <p key={i} style={{ margin: '0 0 0.5rem 0' }}>{line}</p>
                                                ))
                                            ) : (
                                                <p>この日のトレーニング記録はありません。</p>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="training-details-card empty-state">
                                    カレンダーから日付を選択してください。
                                </div>
                            )}
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
