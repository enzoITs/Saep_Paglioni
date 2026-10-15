const path = require('path');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

async function iniciar() {
    // Em produção o próprio Express entrega o site Next.js (frontend/), tudo em um só serviço
    if (process.env.NODE_ENV === 'production') {
        const dir = path.join(__dirname, 'frontend');
        const next = require(require.resolve('next', { paths: [dir] }));
        const nextApp = next({ dev: false, dir });
        await nextApp.prepare();
        const handle = nextApp.getRequestHandler();
        app.use((req, res) => handle(req, res));
    }

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

iniciar();

// Encerra rápido quando o Railway para o container (redeploy)
process.on('SIGTERM', () => process.exit(0));
