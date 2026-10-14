'use client';

import { useEffect, useState } from 'react';
import { api, brl, isoLocal, num } from '@/lib/api';
import Tabela from './Tabela';

const colunas = [{ label: 'Produto' }, { label: 'Qtd. saída', num: true }, { label: 'Valor total', num: true }];

export default function RelatorioSaidas({ versao }) {
    const [inicio, setInicio] = useState('');
    const [fim, setFim] = useState('');
    const [periodo, setPeriodo] = useState(null);
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState('');

    // Padrão: últimos 30 dias (definido no cliente para usar o fuso do navegador)
    useEffect(() => {
        const hoje = new Date();
        const mesAtras = new Date(hoje);
        mesAtras.setDate(hoje.getDate() - 30);
        const p = { inicio: isoLocal(mesAtras).slice(0, 10), fim: isoLocal(hoje).slice(0, 10) };
        setInicio(p.inicio);
        setFim(p.fim);
        setPeriodo(p);
    }, []);

    useEffect(() => {
        if (!periodo) return;
        const qs = new URLSearchParams({
            data_inicio: `${periodo.inicio} 00:00:00`,
            data_fim: `${periodo.fim} 23:59:59`,
        });
        api('/maiores_saidas?' + qs)
            .then((d) => { setDados(d); setErro(''); })
            .catch((e) => { setDados([]); setErro(e.message); });
    }, [versao, periodo]);

    function gerar(e) {
        e.preventDefault();
        setPeriodo({ inicio, fim });
    }

    return (
        <section className="card">
            <h2>Maiores saídas por período</h2>
            <form className="row" style={{ alignItems: 'end' }} onSubmit={gerar}>
                <label>Data início <input type="date" required value={inicio} onChange={(e) => setInicio(e.target.value)} /></label>
                <label>Data fim <input type="date" required value={fim} onChange={(e) => setFim(e.target.value)} /></label>
                <button type="submit">Gerar relatório</button>
            </form>
            <div style={{ marginTop: 12 }}>
                <Tabela colunas={colunas} linhas={dados} vazio={erro || 'Nenhuma saída no período.'}>
                    {dados.map((d) => (
                        <tr key={d.nome_produto}>
                            <td>{d.nome_produto}</td>
                            <td className="num">{num(d.quantidade_total_saida)}</td>
                            <td className="num">{brl(d.valor_total_financeiro)}</td>
                        </tr>
                    ))}
                </Tabela>
            </div>
        </section>
    );
}
