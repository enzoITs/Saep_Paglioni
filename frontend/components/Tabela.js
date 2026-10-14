export default function Tabela({ colunas, linhas, vazio = 'Nenhum registro encontrado.', children }) {
    return (
        <div className="table-wrap">
            <table>
                <thead>
                    <tr>
                        {colunas.map((c) => (
                            <th key={c.label} className={c.num ? 'num' : undefined}>{c.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {linhas?.length ? children : (
                        <tr><td colSpan={colunas.length} className="empty">{vazio}</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
