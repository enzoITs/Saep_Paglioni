'use client';

import { useEffect, useState } from 'react';
import { api, isoLocal } from '@/lib/api';
import Mensagem from './Mensagem';

export default function FormMovimentacao({ produtos, onSalvo }) {
    const [dt, setDt] = useState('');
    const [msg, setMsg] = useState(null);

    // Data/hora atual como padrão (definida no cliente para usar o fuso do navegador)
    useEffect(() => { setDt(isoLocal().slice(0, 16)); }, []);

    async function enviar(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const f = Object.fromEntries(new FormData(form));
        try {
            await api('/registro', {
                method: 'POST',
                body: JSON.stringify({
                    ...f,
                    dt: f.dt.replace('T', ' ') + ':00',
                    quantidade: Number(f.quantidade),
                    id_produtos: Number(f.id_produtos),
                }),
            });
            setMsg({ texto: 'Movimentação registrada!', ok: true });
            form.reset();
            setDt(isoLocal().slice(0, 16));
            onSalvo();
        } catch (err) {
            setMsg({ texto: err.message, ok: false });
        }
    }

    return (
        <div className="card">
            <h2>Registrar movimentação</h2>
            <form onSubmit={enviar}>
                <label>Produto
                    <select name="id_produtos" required>
                        {produtos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </label>
                <div className="row">
                    <label>Tipo
                        <select name="tipo" required>
                            <option value="Entrada">Entrada</option>
                            <option value="Saída">Saída</option>
                        </select>
                    </label>
                    <label>Quantidade <input name="quantidade" type="number" min="1" required /></label>
                </div>
                <label>Data e hora <input name="dt" type="datetime-local" required value={dt} onChange={(e) => setDt(e.target.value)} /></label>
                <button type="submit">Registrar</button>
                <Mensagem msg={msg} onLimpar={() => setMsg(null)} />
            </form>
        </div>
    );
}
