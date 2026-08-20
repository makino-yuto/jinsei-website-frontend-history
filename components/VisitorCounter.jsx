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
    const registered = useRef(false);

    // アクセスした時点で強制的に1カウント。同じ人は何度来ても増えず、取り消しもできない。
    useEffect(() => {
        if (!supabase || registered.current) return;
        registered.current = true;

        const id = getVisitorId();
        (async () => {
            if (id) {
                await supabase
                    .from('site_pushes')
                    .upsert({ visitor_id: id }, { onConflict: 'visitor_id', ignoreDuplicates: true });
            }
            const { count: total, error } = await supabase
                .from('site_pushes')
                .select('visitor_id', { count: 'exact', head: true });
            if (!error) setCount(total ?? 0);
        })();
    }, []);

    if (count === null) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '0.6rem',
                left: '0.6rem',
                zIndex: 1100,
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.35rem',
                padding: '0.3rem 0.7rem',
                borderRadius: '999px',
                border: '1px solid #c8def2',
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#5b84a6',
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 6px rgba(15, 33, 59, 0.12)',
                pointerEvents: 'none',
                userSelect: 'none'
            }}
        >
            <span>VISITORS</span>
            <span style={{ color: '#0f213b', fontWeight: 'bold', fontSize: '0.85rem' }}>{count}</span>
        </div>
    );
};

export default VisitorCounter;
