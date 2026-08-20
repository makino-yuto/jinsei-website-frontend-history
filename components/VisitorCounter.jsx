import { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'jinsei-push-visitor-id';

// 訪問者ごとに固定IDを1つ発行する(同じ人を二度数えないため)
const getVisitorId = () => {
    try {
        let id = localStorage.getItem(STORAGE_KEY);
        if (!id) {
            id = (crypto.randomUUID && crypto.randomUUID()) ||
                `${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(STORAGE_KEY, id);
        }
        return id;
    } catch {
        return null;
    }
};

const VisitorCounter = () => {
    const [count, setCount] = useState(null);
    const [pushed, setPushed] = useState(false);
    const [busy, setBusy] = useState(false);
    const checked = useRef(false);

    // 既に押した人かどうかだけ先に調べる(押すまで人数は見せない)
    useEffect(() => {
        if (!supabase || checked.current) return;
        checked.current = true;
        const id = getVisitorId();
        if (!id) return;
        let cancelled = false;
        (async () => {
            const { data } = await supabase
                .from('site_pushes')
                .select('visitor_id')
                .eq('visitor_id', id)
                .maybeSingle();
            if (cancelled || !data) return;
            setPushed(true);
            const { count: total } = await supabase
                .from('site_pushes')
                .select('visitor_id', { count: 'exact', head: true });
            if (!cancelled) setCount(total ?? 0);
        })();
        return () => { cancelled = true; };
    }, []);

    const handlePush = async () => {
        if (!supabase || busy || pushed) return;
        const id = getVisitorId();
        if (!id) return;
        setBusy(true);
        // 同じvisitor_idは主キーで弾かれるので二重に数えられない
        await supabase
            .from('site_pushes')
            .upsert({ visitor_id: id }, { onConflict: 'visitor_id', ignoreDuplicates: true });
        const { count: total } = await supabase
            .from('site_pushes')
            .select('visitor_id', { count: 'exact', head: true });
        setCount(total ?? 0);
        setPushed(true);
        setBusy(false);
    };

    return (
        <section id="mystery" className="rugged-section">
            <h2 className="section-title">???</h2>
            <div className="section-content">
                <button
                    type="button"
                    className="rugged-link"
                    onClick={handlePush}
                    disabled={pushed || busy}
                    style={{
                        fontFamily: 'inherit',
                        cursor: pushed ? 'default' : 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        minHeight: '3.9rem',
                        alignItems: 'center'
                    }}
                >
                    <div className="link-content">
                        {pushed && <span className="link-desc">ありがとう。</span>}
                        {pushed && count !== null && (
                            <span
                                style={{
                                    marginTop: '0.4rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontWeight: 700,
                                    fontSize: '1.4rem',
                                    color: '#0f213b'
                                }}
                            >
                                {count.toLocaleString()}
                                <span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '0.35rem', color: '#5b84a6' }}>
                                    人が押した
                                </span>
                            </span>
                        )}
                    </div>
                    <span className="link-arrow" aria-hidden="true">
                        {pushed ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                        )}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default VisitorCounter;
