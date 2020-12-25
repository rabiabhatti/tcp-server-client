const net = require('net')

const HOST = '127.0.0.1'
const PORT = 9080

const client = new net.Socket()

setTimeout(function () {
    client.connect(PORT, HOST, function () {
        client.write('*6\r\n$3\r\nSET\r\n$3\r\nkey\r\n$5\r\nvalue\r\n+OK\r\n:1000\r\n$-1\r\n')

        client.on('data', function (data) {
            console.log('Data from the server: ' + data)
        })
    })
}, 1000*3)
