const _ = require('lodash')
const readline = require('readline')
const eba = require('./eba-client')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var client = new eba.Client('https://eba-3.adm01.com/')

client.on('message', console.log)

rl.on('close', () => process.exit(0))

function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}

console.log('connecting...')

client
    .login("expo/login")
    .then(() => {
        console.log('Type your question or hit Ctrl+D to exit')
        interact()
    })
    .catch(() => {
        console.error('unable to connect to EBA server')
        process.exit(1)
    })
