const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DIR = __dirname;
const CONFIG_FILE = path.join(DIR, 'config.json');

// Initialize config file if not present
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({
    posX: 195,
    posY: -52,
    barCount: 30,
    sensitivity: 1.2,
    accentColor: '#05bbfb',
    accentGlow: 'rgba(5, 187, 251, 0.42)',
    accentBadge: '#05bbfb',
    spotifyToken: '',
    spotifyRefreshToken: '',
    spotifyClientId: '',
    spotifyPrefix: 'MAKES EVERYTHING WAY MORE EASY! I AM CURRENTLY LISTENING TO:',
    tickerManualText: 'MAKES EVERYTHING WAY MORE EASY! I AM CURRENTLY LISTENING TO: OVERWATCH 2 CYBER SYNTH MIX',
    tickerSpeed: 18,
    tickerAutoScroll: true,
    audioMode: 'sim'
  }, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // Enable CORS for all local requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoint: GET /api/config
  if (req.method === 'GET' && req.url === '/api/config') {
    fs.readFile(CONFIG_FILE, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data || '{}');
    });
    return;
  }

  // API Endpoint: POST /api/config
  if (req.method === 'POST' && req.url === '/api/config') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        let existing = {};
        try { existing = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); } catch (e) {}
        const merged = { ...existing, ...parsed };
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', config: merged }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(DIR, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
