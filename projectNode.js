const http = require('http');
const fs = require('fs/promises')
const url = require('url');

const port = 3000;

const server = http.createServer(async (req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl);

  const logMessage = `${new Date().toISOString()} - ${method} ${parsedUrl.href}\n`;

  try {
    // Use fs.promises to append the log message to the 'requests.txt' file
    await fs.appendFile('requests.txt', logMessage);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
  } catch (err) {
    console.error('Error writing to requests.txt:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
