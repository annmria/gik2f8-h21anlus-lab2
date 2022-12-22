const http = require('http');
const server = http.createServer((req, res) => {
  console.log(http.METHODS);

  const statusCode = 425;
  res.writeHead(statusCode);
  res.end(`Du gjorde ett ${req.method}-anrop till ${req.url}`);
});

server.listen('5000', () =>
  console.log('Server running on http://localhost:5000')
);

/* Denna fil används inte vidare utan är en del av exemplen från lektion 5. All kod som används vidare i applikationen finns i app.js. 
Det är också där ni ska skriva kod för labb 2 */
