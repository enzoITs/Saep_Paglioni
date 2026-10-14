'use client';

import { useEffect, useState } from 'react';
import { api, num } from '@/lib/api';
import Tabela from './Tabela';

const colunas = [
    { label: 'Produto' }, { label: 'Categoria' }, { label: 'Qtd', num: true },
    { label: '% do máx.', num: true }, { label: 'Status' },
];

export default function Alertas({ versao }) {
    // Valores digitados nos campos; só viram filtro ao clicar em "Filtrar"
    const [limMin, setLimMin] = useState('10');
    const [limMax, setLimMax] = useState('100');
    const [filtro, setFiltro] = useState({ min: 10, max: 100 });
    const [itens, setItens] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        api('/porcentagem', {
            method: 'POST',
            body: JSON.stringify({ limite_minimo: filtro.min, limite_maximo: filtro.max }),
        })
            .then(({ produtos_no_limite }) => { setItens(produtos_no_limite); setErro(''); })
            .catch((e) => { setItens([]); setErro(e.message); });
    }, [versao, filtro]);

    function filtrar(e) {
        e.preventDefault();
        setFiltro({ min: Number(limMin), max: Number(limMax) });
    }

    return (
        <div className="card">
            <h2>Alertas de estoque</h2>
            <form className="row" style={{ alignItems: 'end' }} onSubmit={filtrar}>
                <label>Mínimo <input type="number" min="0" value={limMin} onChange={(e) => setLimMin(e.target.value)} /></label>
                <label>Máximo <input type="number" min="1" value={limMax} onChange={(e) => setLimMax(e.target.value)} /></label>
                <button type="submit">Filtrar</button>
            </form>
            <div style={{ marginTop: 12 }}>
                <Tabela colunas={colunas} linhas={itens} vazio={erro || 'Nenhum produto fora dos limites.'}>
                    {itens.map((p) => {
                        const baixo = p.quantidade <= filtro.min;
                        return (
                            <tr key={p.id}>
                                <td>{p.nome}</td>
                                <td>{p.categoria}</td>
                                <td className="num">{num(p.quantidade)}</td>
                                <td className="num">{num(p.percentual_atingido)}%</td>
                                <td>
                                    <span className={`badge ${baixo ? 'low' : 'high'}`}>
                                        {baixo ? 'Estoque baixo' : 'Acima do máximo'}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </Tabela>
            </div>
        </div>
    );
}
