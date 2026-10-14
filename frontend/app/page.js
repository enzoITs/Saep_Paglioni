'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Kpis from '@/components/Kpis';
import Categorias from '@/components/Categorias';
import Alertas from '@/components/Alertas';
import Produtos from '@/components/Produtos';
import Movimentacoes from '@/components/Movimentacoes';
import RelatorioSaidas from '@/components/RelatorioSaidas';
import FormProduto from '@/components/FormProduto';
import FormMovimentacao from '@/components/FormMovimentacao';

export default function Dashboard() {
    const [produtos, setProdutos] = useState([]);
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [erros, setErros] = useState({});
    // Incrementar "versao" faz todos os blocos recarregarem os dados
    const [versao, setVersao] = useState(0);
    const atualizar = useCallback(() => setVersao((v) => v + 1), []);

    useEffect(() => {
        api('/produtos')
            .then((d) => { setProdutos(d); setErros((e) => ({ ...e, produtos: '' })); })
            .catch((e) => { setProdutos([]); setErros((x) => ({ ...x, produtos: e.message })); });
        api('/registros_ordem')
            .then((d) => { setMovimentacoes(d); setErros((e) => ({ ...e, movimentacoes: '' })); })
            .catch((e) => { setMovimentacoes([]); setErros((x) => ({ ...x, movimentacoes: e.message })); });
    }, [versao]);

    const categorias = [...new Set(produtos.map((p) => p.categoria))];

    return (
        <>
            <header>
                <h1>📦 Dashboard de Estoque</h1>
                <button className="secondary" onClick={atualizar}>↻ Atualizar</button>
            </header>

            <main>
                <Kpis produtos={produtos} totalMovimentacoes={movimentacoes.length} />

                <section className="grid">
                    <Categorias versao={versao} />
                    <Alertas versao={versao} />
                </section>

                <section className="grid">
                    <Produtos produtos={produtos} erro={erros.produtos} />
                    <Movimentacoes movimentacoes={movimentacoes} produtos={produtos} erro={erros.movimentacoes} />
                </section>

                <RelatorioSaidas versao={versao} />

                <section className="grid">
                    <FormProduto categorias={categorias} onSalvo={atualizar} />
                    <FormMovimentacao produtos={produtos} onSalvo={atualizar} />
                </section>
            </main>
        </>
    );
}
