const http = require('http');

// Create a server instance
const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.url}`);
  let url=req.url;
  let params=url.split('?')[0];
  let params2=url.split('?')[1];
  console.log(`Received params: ${params}`);
  console.log(`Received params2: ${params2}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.end('Hello world!');
});

// Listen on a specific port
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});