const net = require('net')

const sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)

    socket.on('data', data => {
        console.log(data.toString(), new Date)

        sockets.forEach(socket => socket.write(data.toString()))
    })

    socket.on('close', () => {
            const index = sockets.indexOf(socket)

            if (index !== -1) {
                sockets.splice(index, 1)
                console.log('Socket removed')
            }
        })
        
    })

//const host = '127.0.0.1'
const host = '192.168.1.101'

server.listen(1337, host, () => console.log('server is up'))