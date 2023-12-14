const http = require("http")

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hello, World!\n")
})

const port = 3000

// Omitting the hostname parameter or using '0.0.0.0' means listen on all available network interfaces
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on public IP address, listening on port ${port}`)
})
