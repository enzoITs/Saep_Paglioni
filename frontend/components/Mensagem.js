'use client';

import { useEffect } from 'react';

// Mensagem de retorno do formulário, some sozinha após 4 segundos
export default function Mensagem({ msg, onLimpar }) {
    useEffect(() => {
        if (!msg) return;
        const t = setTimeout(onLimpar, 4000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg]);

    return <div className={`msg ${msg ? (msg.ok ? 'ok' : 'err') : ''}`}>{msg?.texto}</div>;
}
