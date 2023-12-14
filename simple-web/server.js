const { log } = require("node:console")
const Butter = require("./butter")

// we are basically calling http.createServer by caling new Butter()
const server = new Butter()
const PORT = 9000

server.listen(PORT, () => {
  log(`webserver is live at http://localhost:${PORT}`)
})

// lets create soemething like
server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html")
})

server.route("get", "/index.css", (req, res) => {
  res.sendFile("./public/index.css", "text/css")
})

server.route("get", "/public/minion.png", (req, res) => {
  res.sendFile("./public/minion.png", "image/x-png")
})

server.route("get", "/script.js", (req, res) => {
  res.sendFile("./public/script.js", "text/javascript")
})

server.route("post", "/login", (req, res) => {
  res.status(400).json({ message: "Bad Login" })
})
