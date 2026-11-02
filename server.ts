import express from 'express';
import { createServer as createViteServer } from 'vite';

// Local preview server. The shopping cart runs entirely in the browser.
async function startServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
  app.listen(3000, '127.0.0.1', () => {
    console.log('Open http://localhost:3000 to view BrewYard');
  });
}

startServer();
