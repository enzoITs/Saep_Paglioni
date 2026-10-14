import { brl, num } from '@/lib/api';

export default function Kpis({ produtos, totalMovimentacoes }) {
    const unidades = produtos.reduce((s, p) => s + Number(p.quantidade), 0);
    const valor = produtos.reduce((s, p) => s + p.quantidade * p.valor_unidade, 0);

    const itens = [
        ['Produtos cadastrados', num(produtos.length)],
        ['Unidades em estoque', num(unidades)],
        ['Valor total em estoque', brl(valor)],
        ['Movimentações', num(totalMovimentacoes)],
    ];

    return (
        <section className="kpis">
            {itens.map(([label, value]) => (
                <div key={label} className="card kpi">
                    <div className="label">{label}</div>
                    <div className="value">{value}</div>
                </div>
            ))}
        </section>
    );
}
