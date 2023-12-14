const { log } = require("node:console")
const http = require("node:http")
const fs = require("node:fs/promises")

const server = http.createServer()

server.on("request", async (request, response) => {
  log("server hit", request.url, request.method)
  if (request.url === "/" && request.method === "GET") {
    response.statusCode = 200
    response.setHeader("Content-Type", "text/html")
    const fileHandle = await fs.open("./public/index.html", "r")
    const fileStream = fileHandle.createReadStream()
    fileStream.pipe(response)
    response.end()
    // upload route
    // lets create soemething like
    // server.route("get", "/", (req, res) => {
    //   res.sendFile("./public/index.html", "r")
    // })
  }
  if (request.url === "/index.css" && request.method === "GET") {
    response.setHeader("Content-Type", "text/css")
    response.statusCode = 200
    const fileHandle = await fs.open("./public/index.css", "r")
    const fileStream = fileHandle.createReadStream()
    fileStream.pipe(response)
    response.end()
  }
  if (request.url === "/public/minion.png" && request.method === "GET") {
    response.setHeader("Content-Type", "image/x-png")
    const fileHandle = await fs.open("./public/minion.png", "r")
    const fileStream = fileHandle.createReadStream()
    fileStream.pipe(response)
  }
  if (request.url === "/script.js" && request.method === "GET") {
    response.setHeader("Content-Type", "text/javascript")
    const fileHandle = await fs.open("./public/script.js", "r")
    const fileStream = fileHandle.createReadStream()
    fileStream.pipe(response)
  }
  if (request.url === "/getdataold" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html")
    const fileHandle = await fs.open("./public/new.html", "r")
    const fileStream = fileHandle.createReadStream()
    fileStream.pipe(response)
  }
  if (request.url === "/getdatanew" && request.method === "POST") {
    response.setHeader("Content-Type", "application/json")
    response.statusCode = 200
    const body = {
      message: "loggin you in",
    }
    response.write(JSON.stringify(body))
    response.end()
  }
  if (request.url === "/upload" && request.method === "PUT") {
    const fileHandle = await fs.open("./storage/wallpaper.jpeg", "w")
    const fileStream = fileHandle.createWriteStream()
    request.pipe(fileStream)
    request.on("end", () => {
      response.setHeader("Content-Type", "application/json")
      response.end(JSON.stringify({ message: "File uploaded succesfully" }))
    })
  }
})

server.listen(9001, () => {
  log("webserver is live at http://localhost:9001")
})
