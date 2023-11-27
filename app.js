const http = require("http")

const port = 4080
const hostname = "192.168.29.240"

const server = http.createServer((req, res) => {
  const data = { message: "Hi There Hardik" }

  res.setHeader("Content-Type", "application/json")
  res.setHeader("Connection", "close")
  res.statusCode = 200
  res.end(JSON.stringify(data))
})

server.listen(port, hostname, () => {
  console.log(`Server running on hostname ${hostname} Port ${port}`)
})
