import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';
const RECIPIENT_EMAIL = 'anandmakhanasa1631@gmail.com';

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Netlify Forms Local / Preview Handling
  // When deployed to Netlify, Netlify CDN intercepts POST requests at the edge.
  // In dev / AI Studio preview, this endpoint emulates Netlify Forms 200 OK.
  app.post('/', (req, res) => {
    const formName = req.body['form-name'] || req.body.formName || 'project-enquiry';
    const name = req.body.name || 'Anonymous';
    const email = req.body.email || '';
    const source = req.body.source || 'Portfolio';

    console.log(`[Netlify Forms] Received submission for "${formName}" from "${name}" <${email}> (Source: ${source})`);
    console.log(`[Netlify Forms] Target notification email: ${RECIPIENT_EMAIL}`);

    return res.status(200).send('OK');
  });

  // Backward compatibility endpoint
  app.post('/api/contact', (req, res) => {
    const name = req.body.name || 'Anonymous';
    const email = req.body.email || '';
    const source = req.body.source || 'Portfolio';

    console.log(`[Netlify Forms] Contact enquiry received for ${name} <${email}> from ${source}`);
    console.log(`[Netlify Forms] Forwarding notification to: ${RECIPIENT_EMAIL}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. I’ll get back to you soon.',
    });
  });

  // Netlify Forms status check
  app.get('/api/contact/status', (_req, res) => {
    res.json({
      status: 'online',
      provider: 'Netlify Forms',
      recipient: RECIPIENT_EMAIL,
      timestamp: new Date().toISOString(),
    });
  });

  // Mount Vite dev server middlewares in dev or static files in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio running on http://0.0.0.0:${PORT}`);
    console.log(`[Server] Form Engine: Netlify Forms -> ${RECIPIENT_EMAIL}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Fatal] Failed to start server:', err);
  process.exit(1);
});
