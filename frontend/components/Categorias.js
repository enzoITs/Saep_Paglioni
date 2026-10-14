'use client';

import { useEffect, useState } from 'react';
import { api, brl } from '@/lib/api';

export default function Categorias({ versao }) {
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        api('/categoria')
            .then((d) => { setDados(d); setErro(''); })
            .catch((e) => setErro(e.message));
    }, [versao]);

    const max = Math.max(...dados.map((d) => Number(d.total_categoria)), 1);
    const ordenados = [...dados].sort((a, b) => b.total_categoria - a.total_categoria);

    return (
        <div className="card">
            <h2>Valor em estoque por categoria</h2>
            <div className="bars">
                {erro && <div className="empty">{erro}</div>}
                {!erro && !ordenados.length && <div className="empty">Nenhuma categoria.</div>}
                {ordenados.map((d) => (
                    <div key={d.categoria} className="bar-row">
                        <span className="name" title={d.categoria}>{d.categoria}</span>
                        <div className="bar-track">
                            <div className="bar-fill" style={{ width: `${(d.total_categoria / max) * 100}%` }} />
                        </div>
                        <span>{brl(d.total_categoria)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
