const net = require('net')
const server = net.createServer()
server.on('connection', handleConnection)

server.listen(9000, function() {
    console.log('server listening to %j', server.address())
})


function handleConnection(socket) {
    const remoteAddress = socket.remoteAddress + ':' + socket.remotePort
    let clientData = []

    console.log('new client connection from %s', remoteAddress)
    socket.setEncoding('utf8')


    socket.on('data', function onConnData(d) {
        console.log('connection data from %s : %j', remoteAddress, d)

        clientData.push(d)
        const str = clientData.join('')
        const sliceContent = str.slice(str.indexOf('\r\n') + 1, 6)

        if(sliceContent === 'hello') {
            socket.write('Olla')
        }
    })

    socket.once('close', function onConnClose() {
        console.log('connection from %s closed', remoteAddress)
    })

    socket.on('error', function onConnError(err) {
        console.log('Connection %s error : %s', remoteAddress, err.message)
    })
}
