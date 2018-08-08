const http = require('http');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send({
    "type": "url_verification",
	 "token": "OYK6hu327ChWOP3Wlp9IQiYA",
	 "challenge": "VD5HjwaymQAvwaKG6QvnMyzpIqqE9tIqeRvWYQYLi5JtLA5TYVlI"
  })
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
