const { Socket } = require("dgram")
const net = require("net")
const { buffer } = require("stream/consumers")
const socket = net.createConnection({ host: "127.0.0.1", port: "3099" }, () => {
  //   const buf f = Buffer.alloc(3)
  //   buff[0] = 3
  //   buff[1] = 33
  //   socket.write(buff)
  socket.write("Simple message comming form a smple sender")
})
