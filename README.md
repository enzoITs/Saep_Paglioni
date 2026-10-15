# Saep_Paglioni

## Como rodar

1. **Backend (Express + MySQL)** — na raiz do projeto:
   ```bash
   npm install
   npm run dev        # http://localhost:3000
   ```
2. **Frontend (Next.js)** — na pasta `frontend/`:
   ```bash
   cd frontend
   npm install
   npm run dev        # http://localhost:3001
   ```

O Next.js repassa as chamadas `/loja/*` para o backend em `http://localhost:3000`.
Para usar outro endereço, defina a variável `API_URL` ao iniciar o frontend.

## Hospedar no Railway (um serviço só)

Em produção (`npm run build` + `npm start`) o Express serve a API (`/loja/*`) e o site Next.js
na mesma porta. As tabelas são criadas automaticamente a partir de `db/tabelas.sql`.

1. No Railway: **New Project → Deploy from GitHub repo** → escolher este repositório.
2. No mesmo projeto: **+ New → Database → MySQL**.
3. No serviço do repositório, em **Variables**, adicionar:
   ```
   MYSQL_URL=${{MySQL.MYSQL_URL}}
   ```
4. Em **Settings → Networking → Generate Domain** para ter o link público.
