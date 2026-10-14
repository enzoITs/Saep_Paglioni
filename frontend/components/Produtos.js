import { brl, num } from '@/lib/api';
import Tabela from './Tabela';

const colunas = [
    { label: 'ID' }, { label: 'Nome' }, { label: 'Categoria' },
    { label: 'Qtd', num: true }, { label: 'Valor un.', num: true },
];

export default function Produtos({ produtos, erro }) {
    return (
        <div className="card">
            <h2>Produtos</h2>
            <Tabela colunas={colunas} linhas={produtos} vazio={erro || undefined}>
                {produtos.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nome}</td>
                        <td>{p.categoria}</td>
                        <td className="num">{num(p.quantidade)}</td>
                        <td className="num">{brl(p.valor_unidade)}</td>
                    </tr>
                ))}
            </Tabela>
        </div>
    );
}
