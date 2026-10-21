import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = dirname(__dirname);
const publicDir = join(__dirname, 'public');

// Load a local .env file without requiring a runtime package. Existing shell env wins.
try {
  const envText = readFileSync(join(projectDir, '.env'), 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('\"') && value.endsWith('\"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
} catch {
  // .env is optional; ordinary process environment variables are supported.
}
const PORT = Number(process.env.PORT || 3001);
const LOGIN_EMAIL = process.env.APP_LOGIN_EMAIL || process.env.E2E_EMAIL || 'admin@example.com';
const LOGIN_PASSWORD = process.env.APP_LOGIN_PASSWORD || process.env.E2E_PASSWORD || 'DemoPass123!';
const SESSION_COOKIE = 'assessment_demo_session';
const MAX_BODY_BYTES = 16 * 1024;

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    ...headers
  });
  res.end(body === undefined ? '' : JSON.stringify(body));
}

async function readRequestBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_BODY_BYTES) {
      const err = new Error('Request body too large');
      err.statusCode = 413;
      throw err;
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch {
      const err = new Error('Request body must contain valid JSON');
      err.statusCode = 400;
      throw err;
    }
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw).entries());
  }
  const err = new Error('Unsupported content type');
  err.statusCode = 415;
  throw err;
}

async function serveHtml(res, filename) {
  const html = await readFile(join(publicDir, filename));
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  });
  res.end(html);
}

function hasSession(req) {
  const cookie = String(req.headers.cookie || '');
  return cookie.split(';').some((part) => part.trim() === `${SESSION_COOKIE}=authenticated`);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);

    if (req.method === 'GET' && url.pathname === '/health') {
      return send(res, 200, { status: 'ok' });
    }
    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/login')) {
      return await serveHtml(res, 'login.html');
    }
    if (req.method === 'GET' && url.pathname === '/claims') {
      if (!hasSession(req)) {
        res.writeHead(302, { Location: '/login', 'Cache-Control': 'no-store' });
        return res.end();
      }
      return await serveHtml(res, 'claims.html');
    }
    if (req.method === 'POST' && url.pathname === '/api/auth/login') {
      const body = await readRequestBody(req);
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const password = typeof body.password === 'string' ? body.password : '';
      if (!email || !password) {
        return send(res, 400, { message: 'Email and password are required.' });
      }
      if (email !== LOGIN_EMAIL || password !== LOGIN_PASSWORD) {
        return send(res, 401, { message: 'Invalid email or password.' });
      }
      return send(res, 200, { message: 'Login successful.' }, {
        'Set-Cookie': `${SESSION_COOKIE}=authenticated; HttpOnly; SameSite=Lax; Path=/`
      });
    }
    if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
      return send(res, 204, undefined, {
        'Set-Cookie': `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
      });
    }

    return send(res, 404, { message: 'Not found.' });
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    const message = statusCode < 500 ? error.message : 'Internal server error.';
    return send(res, statusCode, { message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  // This is a local demo app for test practice, not a production authentication service.
  console.log(`Assessment demo app listening at http://127.0.0.1:${PORT}`);
});
