'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import Mensagem from './Mensagem';

export default function FormProduto({ categorias, onSalvo }) {
    const [msg, setMsg] = useState(null);

    async function enviar(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const f = Object.fromEntries(new FormData(form));
        try {
            await api('/cadastrar', {
                method: 'POST',
                body: JSON.stringify({ ...f, quantidade: Number(f.quantidade), valor_unidade: Number(f.valor_unidade) }),
            });
            setMsg({ texto: 'Produto cadastrado com sucesso!', ok: true });
            form.reset();
            onSalvo();
        } catch (err) {
            setMsg({ texto: err.message, ok: false });
        }
    }

    return (
        <div className="card">
            <h2>Cadastrar produto</h2>
            <form onSubmit={enviar}>
                <label>Nome <input name="nome" required /></label>
                <div className="row">
                    <label>Quantidade <input name="quantidade" type="number" min="0" required /></label>
                    <label>Valor unitário <input name="valor_unidade" type="number" min="0" step="0.01" required /></label>
                </div>
                <label>Categoria <input name="categoria" list="listaCategorias" required /></label>
                <datalist id="listaCategorias">
                    {categorias.map((c) => <option key={c} value={c} />)}
                </datalist>
                <button type="submit">Cadastrar</button>
                <Mensagem msg={msg} onLimpar={() => setMsg(null)} />
            </form>
        </div>
    );
}
