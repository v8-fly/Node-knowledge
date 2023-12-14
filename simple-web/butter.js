const { log } = require("node:console")
const http = require("node:http")
const fs = require("node:fs/promises")

class Butter {
  // everytime we initialize Butter object below constructor runs
  constructor() {
    this.server = http.createServer()
    this.routes = {}
    this.server.on("request", (request, response) => {
      // Send a file back to the client
      response.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r")
        const fileStream = fileHandle.createReadStream()
        response.setHeader("Content-Type", mime)
        fileStream.pipe(response)
      }
      response.status = (code) => {
        response.statusCode = code
        return response
      }
      response.json = (jsonData) => {
        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify(jsonData))
      }
      if (
        this.routes[
          request.method.toLowerCase().trim() + request.url.toLowerCase().trim()
        ]
      ) {
        this.routes[
          request.method.toLowerCase().trim() + request.url.toLowerCase().trim()
        ](request, response)
      } else {
        return response.status(404).json({ message: "route not found" })
      }
    })
  }

  route = (method, path, callback) => {
    this.routes[method.toLowerCase() + path.toLowerCase()] = callback
  }
  //every object instansiated with this class will have listen method
  // where we can pass port and callback and make the server listen
  listen = (port, callback) => {
    this.server.listen(port, () => {
      callback()
    })
  }
}

module.exports = Butter
