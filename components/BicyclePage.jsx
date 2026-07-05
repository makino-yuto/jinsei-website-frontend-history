import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../supabaseClient';
import './PersonalPage.css';

const parseTimeToSeconds = (text) => {
    const match = text.match(/Time[:\s]+((?:\d+h\s*)?(?:\d+m\s*)?(?:\d+s\s*)?)/i);
    if (!match || !match[1].trim()) return 0;
    
    let totalSeconds = 0;
    const timeStr = match[1];
    
    const hMatch = timeStr.match(/(\d+)h/i);
    if (hMatch) totalSeconds += parseInt(hMatch[1], 10) * 3600;
    
    const mMatch = timeStr.match(/(\d+)m/i);
    if (mMatch) totalSeconds += parseInt(mMatch[1], 10) * 60;
    
    const sMatch = timeStr.match(/(\d+)s/i);
    if (sMatch) totalSeconds += parseInt(sMatch[1], 10);
    
    return totalSeconds;
};

const formatSeconds = (totalSeconds) => {
    if (totalSeconds === 0) return '0s';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    let result = '';
    if (h > 0) result += `${h}h `;
    if (m > 0 || h > 0) result += `${m}m `;
    result += `${s}s`;
    return result.trim();
};

const getDailyTrainingDataForWeek = (data, targetDate) => {
    const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];
    const d = new Date(targetDate);
    const day = d.getDay(); 
    const sunday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day);
    sunday.setHours(0,0,0,0);

    const result = [];
    let weekSeconds = 0;

    for (let i = 0; i < 7; i++) {
        const curr = new Date(sunday);
        curr.setDate(sunday.getDate() + i);
        const dateStrKey = `${curr.getFullYear()}-${String(curr.getMonth()+1).padStart(2,'0')}-${String(curr.getDate()).padStart(2,'0')}`;
        
        let seconds = 0;
        if (data[dateStrKey]) {
            seconds = parseTimeToSeconds(data[dateStrKey]);
            weekSeconds += seconds;
        }
        
        result.push({
            dayLabel: dayLabels[i],
            dateStr: `${String(curr.getMonth()+1).padStart(2,'0')}/${String(curr.getDate()).padStart(2,'0')}`,
            seconds,
            formattedTime: formatSeconds(seconds)
        });
    }

    const startStr = `${String(sunday.getFullYear()).slice(-2)}/${String(sunday.getMonth()+1).padStart(2,'0')}/${String(sunday.getDate()).padStart(2,'0')}`;
    
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    const endStr = `${String(saturday.getFullYear()).slice(-2)}/${String(saturday.getMonth()+1).padStart(2,'0')}/${String(saturday.getDate()).padStart(2,'0')}`;

    return {
        chartData: result,
        weekRange: `${startStr}〜${endStr}`,
        totalTime: formatSeconds(weekSeconds),
        weekSeconds
    };
};

const getSeasonlyTrainingData = (data, targetDate) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const q = Math.floor(month / 3);
    const startMonth = q * 3;
    const quarterStart = new Date(year, startMonth, 1);
    const quarterEnd = new Date(year, startMonth + 3, 0);

    // Find the first Sunday on or before the start of the quarter
    const firstSunday = new Date(quarterStart);
    firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());
    firstSunday.setHours(0,0,0,0);

    const weeks = [];
    let totalSeconds = 0;
    const currentSunday = new Date(firstSunday);

    while (currentSunday <= quarterEnd) {
        let weekSeconds = 0;
        for (let i = 0; i < 7; i++) {
            const d = new Date(currentSunday);
            d.setDate(currentSunday.getDate() + i);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            if (data[key]) {
                weekSeconds += parseTimeToSeconds(data[key]);
            }
        }

        const weekLabel = `${currentSunday.getMonth()+1}/${currentSunday.getDate()}`;

        weeks.push({
            weekLabel,
            seconds: weekSeconds,
            formattedTime: formatSeconds(weekSeconds)
        });

        totalSeconds += weekSeconds;
        currentSunday.setDate(currentSunday.getDate() + 7);
    }

    const startLabel = `${String(quarterStart.getMonth()+1).padStart(2,'0')}/01`;
    const endLabel = `${String(quarterEnd.getMonth()+1).padStart(2,'0')}/${String(quarterEnd.getDate()).padStart(2,'0')}`;
    const quarterRange = `${year}/${startLabel}〜${year}/${endLabel}`;

    return {
        chartData: weeks,
        quarterRange,
        totalTime: formatSeconds(totalSeconds),
        totalSeconds
    };
};

const BicyclePage = () => {
    const navigate = useNavigate();
    const [videosExpanded, setVideosExpanded] = useState(false);

    // Calendar State
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");

    const [trainingData, setTrainingData] = useState({});
    const [user, setUser] = useState(null);
    const [chartTargetDate, setChartTargetDate] = useState(new Date());
    const [seasonTargetDate, setSeasonTargetDate] = useState(new Date());

    useEffect(() => {
        if (selectedDate) setChartTargetDate(new Date(selectedDate));
    }, [selectedDate]);

    const handlePrevChart = () => setChartTargetDate(prev => {
        const next = new Date(prev);
        next.setDate(next.getDate() - 7);
        return next;
    });
    
    // 現在の週(日曜基準)よりも未来にいかないようにする処理
    const isCurrentOrFutureWeek = () => {
        const now = new Date();
        const currentSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        currentSunday.setHours(0,0,0,0);

        const targetSunday = new Date(chartTargetDate.getFullYear(), chartTargetDate.getMonth(), chartTargetDate.getDate() - chartTargetDate.getDay());
        targetSunday.setHours(0,0,0,0);

        return targetSunday.getTime() >= currentSunday.getTime();
    };

    const handleNextChart = () => {
        if (isCurrentOrFutureWeek()) return;
        setChartTargetDate(prev => {
            const next = new Date(prev);
            next.setDate(next.getDate() + 7);
            return next;
        });
    };

    const handleResetChartToToday = () => {
        setChartTargetDate(new Date());
    };

    const handlePrevSeason = () => setSeasonTargetDate(prev => {
        const next = new Date(prev);
        next.setMonth(next.getMonth() - 3);
        return next;
    });

    const isCurrentOrFutureQuarter = () => {
        const now = new Date();
        const currentQ = Math.floor(now.getMonth() / 3);
        const targetQ = Math.floor(seasonTargetDate.getMonth() / 3);
        return seasonTargetDate.getFullYear() > now.getFullYear() || (seasonTargetDate.getFullYear() === now.getFullYear() && targetQ >= currentQ);
    };

    const handleNextSeason = () => {
        if (isCurrentOrFutureQuarter()) return;
        setSeasonTargetDate(prev => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() + 3);
            return next;
        });
    };

    useEffect(() => {
        if (!supabase) return;

        // 初期セッションの取得
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        getSession();

        // ログイン状態の変化を監視
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

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

    const handleLogin = async () => {
        if (!supabase) return;
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/bicycle'
            }
        });
    };

    const handleLogout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    const handleSaveClick = async () => {
        if (!user) {
            alert("ログインしてください。");
            return;
        }
        if (user.email !== 'yuuto01222005@gmail.com') {
            alert("編集権限がありません。");
            return;
        }

        try {
            const newData = { ...trainingData };
            
            if (editContent.trim() === "") {
                const { error } = await supabase.from('training_logs').delete().eq('date', selectedDate);
                if (error) throw error;
                delete newData[selectedDate];
            } else {
                const { error } = await supabase.from('training_logs').upsert({ date: selectedDate, content: editContent });
                if (error) throw error;
                newData[selectedDate] = editContent;
            }

            setTrainingData(newData);
            setIsEditing(false);
        } catch (err) {
            console.error("Save error:", err);
            alert("保存に失敗しました。");
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

        // 月によってカレンダーの高さが変わらないように42枠（6週分）になるまで埋める
        const remainingDays = 42 - days.length;
        for (let i = 0; i < remainingDays; i++) {
            days.push(<div key={`empty-end-${i}`} className="calendar-day empty"></div>);
        }

        return days;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const powerData = [
        { date: '2025/10/19', FTP: 2.721, timestamp: new Date('2025/10/19').getTime() },
        { date: '2025/11/21', FTP: 3.369, timestamp: new Date('2025/11/21').getTime() },
        { date: '2026/02/26', FTP: 3.750, timestamp: new Date('2026/02/26').getTime() },
        { date: '2026/07/05', FTP: 3.06,  timestamp: new Date('2026/07/05').getTime() },
    ];

    const ftpTicks = [
        new Date('2025/10/01').getTime(),
        new Date('2026/01/01').getTime(),
        new Date('2026/04/01').getTime(),
        new Date('2026/07/01').getTime(),
        new Date('2026/10/01').getTime()
    ];

    const peakPowerData = [
        { time: '5 s', W: 671, Wkg: 10.74, date: '2026/7/4 20:11:12' },
        { time: '15 s', W: 458, Wkg: 7.33, date: '2026/7/4 20:11:12' },
        { time: '30 s', W: 326, Wkg: 5.22, date: '2026/6/26 19:02:31' },
        { time: '1 min', W: 324, Wkg: 5.18, date: '2026/6/26 19:02:31' },
        { time: '3 min', W: 264, Wkg: 4.22, date: '2026/7/4 20:11:12' },
        { time: '5 min', W: 249, Wkg: 3.98, date: '2026/7/4 20:11:12' },
        { time: '10 min', W: 215, Wkg: 3.44, date: '2026/6/29 20:32:00' },
        { time: '12 min', W: 215, Wkg: 3.44, date: '2026/6/29 20:32:00' },
        { time: '15 min', W: 214, Wkg: 3.42, date: '2026/6/29 20:32:00' },
        { time: '20 min', W: 201, Wkg: 3.22, date: '2026/6/29 20:32:00' },
        { time: '30 min', W: 188, Wkg: 3.01, date: '2026/6/29 20:32:00' },
        { time: '40 min', W: 180, Wkg: 2.88, date: '2026/6/29 20:32:00' },
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
                    <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="back-home-link">[ HOME ]</a>
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
                    <div className="section-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="rugged-card chart-wrapper" style={{ height: '320px', padding: '1.5rem 1rem 1rem 0' }}>
                            <h3 style={{ margin: '0 0 1rem 1.5rem', fontSize: '0.9rem', color: '#5b84a6' }}>FTP</h3>
                            <ResponsiveContainer width="100%" height="85%">
                                <LineChart data={powerData} margin={{ top: 30, right: 30, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" />
                                    <XAxis
                                        dataKey="timestamp"
                                        type="number"
                                        domain={[new Date('2025/10/01').getTime(), new Date('2026/10/01').getTime()]}
                                        ticks={ftpTicks}
                                        stroke="#5b84a6"
                                        fontSize={12}
                                        tickFormatter={(tick) => {
                                            const d = new Date(tick);
                                            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                                        }}
                                    />
                                    <YAxis stroke="#5b84a6" fontSize={12} domain={['auto', 'auto']} label={{ value: 'W/kg', position: 'top', offset: 15, fill: '#5b84a6', fontSize: 12, dx: 15 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px' }}
                                        labelStyle={{ color: '#0f213b', fontWeight: 'bold' }}
                                        labelFormatter={(label) => {
                                            const d = new Date(label);
                                            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
                                        }}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className="section-title">TRAINING</h2>
                        {user ? (
                            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #c8def2', color: '#5b84a6', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                ログアウト
                            </button>
                        ) : (
                            <button onClick={handleLogin} style={{ background: '#5b84a6', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                管理者ログイン
                            </button>
                        )}
                    </div>

                    <div className="section-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {(() => {
                            const { chartData, weekRange, totalTime } = getDailyTrainingDataForWeek(trainingData, chartTargetDate);
                            return (
                                <div className="rugged-card chart-wrapper" style={{ padding: '1.5rem', height: '330px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative' }}>
                                        <button className="calendar-nav-btn" onClick={handlePrevChart}>&lt;</button>
                                        <div style={{ textAlign: 'center' }}>
                                            <h3 style={{ margin: 0, fontSize: '1rem', color: '#5b84a6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                Weekly Training Time
                                            </h3>
                                            <p style={{ margin: '0.2rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#0f213b' }}>{totalTime}</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#5b84a6' }}>{weekRange}</p>
                                        </div>
                                        <button 
                                            className="calendar-nav-btn"
                                            onClick={handleNextChart}
                                            disabled={isCurrentOrFutureWeek()}
                                            style={{ opacity: isCurrentOrFutureWeek() ? 0.3 : 1, cursor: isCurrentOrFutureWeek() ? 'default' : 'pointer' }}>
                                            &gt;
                                        </button>
                                    </div>
                                    <ResponsiveContainer width="100%" height="70%">
                                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" vertical={false} />
                                    <XAxis dataKey="dayLabel" stroke="#5b84a6" fontSize={12} tickMargin={10} />
                                    <YAxis 
                                        stroke="#5b84a6" 
                                        fontSize={12} 
                                        domain={[0, 'auto']} 
                                        tickFormatter={(val) => {
                                            const h = Math.floor(val/3600);
                                            return h > 0 ? `${h}h` : `${Math.floor(val/60)}m`;
                                        }}
                                    />
                                    <Tooltip 
                                        cursor={{fill: 'rgba(91, 132, 166, 0.1)'}} 
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px' }} 
                                        formatter={(value, name, props) => [props.payload.formattedTime, 'Time']}
                                        labelFormatter={(label, props) => {
                                            if (props && props.length > 0) return `${label} (${props[0].payload.dateStr})`;
                                            return label;
                                        }}
                                    />
                                    <Bar dataKey="seconds" fill="#5b84a6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    );
                    })()}

                    {(() => {
                        const { chartData, quarterRange, totalTime } = getSeasonlyTrainingData(trainingData, seasonTargetDate);
                        return (
                            <div className="rugged-card chart-wrapper" style={{ padding: '1.5rem', height: '380px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative' }}>
                                    <button className="calendar-nav-btn" onClick={handlePrevSeason}>&lt;</button>
                                    <div style={{ textAlign: 'center' }}>
                                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#5b84a6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            Season Training Time
                                        </h3>
                                        <p style={{ margin: '0.2rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#0f213b' }}>{totalTime}</p>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#5b84a6' }}>{quarterRange}</p>
                                    </div>
                                    <button 
                                        className="calendar-nav-btn"
                                        onClick={handleNextSeason}
                                        disabled={isCurrentOrFutureQuarter()}
                                        style={{ opacity: isCurrentOrFutureQuarter() ? 0.3 : 1, cursor: isCurrentOrFutureQuarter() ? 'default' : 'pointer' }}>
                                        &gt;
                                    </button>
                                </div>
                                <ResponsiveContainer width="100%" height="70%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#c8def2" vertical={false} />
                                        <XAxis dataKey="weekLabel" stroke="#5b84a6" fontSize={10} tickMargin={5} interval={0} angle={-45} textAnchor="end" height={40} />
                                        <YAxis 
                                            stroke="#5b84a6" 
                                            fontSize={12} 
                                            domain={[0, 'auto']} 
                                            tickFormatter={(val) => {
                                                const h = Math.floor(val/3600);
                                                return h > 0 ? `${h}h` : `${Math.floor(val/60)}m`;
                                            }}
                                        />
                                        <Tooltip 
                                            cursor={{fill: 'rgba(91, 132, 166, 0.1)'}} 
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #c8def2', borderRadius: '4px' }} 
                                            formatter={(value, name, props) => [props.payload.formattedTime, 'Time']}
                                            labelFormatter={(label) => `Week of ${label}`}
                                        />
                                        <Bar dataKey="seconds" fill="#5b84a6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        );
                    })()}

                        {/* カレンダー＆詳細エリア */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
                                        {!isEditing && user?.email === 'yuuto01222005@gmail.com' && (
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
                                                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', margin: 0 }}>
                                                    {trainingData[selectedDate]}
                                                </div>
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
