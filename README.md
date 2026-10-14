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
