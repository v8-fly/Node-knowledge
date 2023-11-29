// Create a TCP server with net module
// lowest level netwiorking in node
// http is build over net module
// ssh server build over net
const net = require("net")
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // console.log(data)
    console.log(data.toString("utf-8"))
  })
})
server.listen(3099, "127.0.0.1", () => {
  console.log("Opened Port on", server.address())
})
