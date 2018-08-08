const http = require('http');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('Hello World!\n');
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
