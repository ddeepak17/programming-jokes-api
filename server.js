const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

// Simple template engine
function renderTemplate(content, data = {}) {
    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
}

function loadTemplate(templatePath, data = {}) {
    try {
        const header = fs.readFileSync(path.join(__dirname, 'templates/header.html'), 'utf8');
        const footer = fs.readFileSync(path.join(__dirname, 'templates/footer.html'), 'utf8');
        const content = fs.readFileSync(templatePath, 'utf8');
        
        const fullPage = header + content + footer;
        return renderTemplate(fullPage, data);
    } catch (err) {
        console.error('Error loading template:', err);
        return null;
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Serve static files
    if (req.method === 'GET') {
        if (pathname === '/' || pathname === '/index.html') {
            const content = loadTemplate(path.join(__dirname, 'views/index.html'), { title: 'Jokes App' });
            if (content) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            return;
        }
        
        if (pathname === '/add_joke.html') {
            const content = loadTemplate(path.join(__dirname, 'views/add_joke.html'), { title: 'Add New Joke - Jokes App' });
            if (content) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            return;
        }
    }

    // API endpoints
    if (pathname.startsWith('/api/')) {
        if (pathname.startsWith('/api/jokes')) {
            const jokes = require('./api/jokes');
            jokes.handleRequest(req, res);
            return;
        }
    }

    // Serve other static files (CSS, JS, etc.)
    const staticExtensions = {
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.html': 'text/html'
    };

    const ext = path.extname(pathname);
    if (staticExtensions[ext]) {
        fs.readFile(path.join(__dirname, pathname.substr(1)), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            res.writeHead(200, { 'Content-Type': staticExtensions[ext] });
            res.end(data);
        });
        return;
    }

    // 404 for everything else
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 