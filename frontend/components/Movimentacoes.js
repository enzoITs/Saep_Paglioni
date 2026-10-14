import { fmtData, num } from '@/lib/api';
import Tabela from './Tabela';

const colunas = [{ label: 'Data' }, { label: 'Produto' }, { label: 'Tipo' }, { label: 'Qtd', num: true }];

export default function Movimentacoes({ movimentacoes, produtos, erro }) {
    const nomes = Object.fromEntries(produtos.map((p) => [p.id, p.nome]));

    return (
        <div className="card">
            <h2>Últimas movimentações</h2>
            <Tabela colunas={colunas} linhas={movimentacoes} vazio={erro || undefined}>
                {movimentacoes.map((m) => (
                    <tr key={m.id}>
                        <td>{fmtData(m.dt)}</td>
                        <td>{nomes[m.id_produtos] ?? `#${m.id_produtos}`}</td>
                        <td><span className={`badge ${m.tipo === 'Entrada' ? 'in' : 'out'}`}>{m.tipo}</span></td>
                        <td className="num">{num(m.quantidade)}</td>
                    </tr>
                ))}
            </Tabela>
        </div>
    );
}
