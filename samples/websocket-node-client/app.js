const _ = require('lodash')
const readline = require('readline')
const eba = require('./eba-client')
const jwt = require('jsonwebtoken')
const fs = require('fs')

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const settings = {
    url: 'https://eba3.ibm.com/',
    key: 'private_key.pem',
    iss: 'https://prepiam.toronto.ca.ibm.com',
    sub: 'sergey.batin@ibm.com',
    name: 'Sergey Batin'
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var client = new eba.Client(settings.url)

client.on('message', console.log)

function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}

console.log('connecting...')

let claims = {
    iss: settings.iss,
    sub: settings.sub,
    name: settings.name
}

let access_token = jwt.sign(claims, fs.readFileSync(settings.key), { algorithm: 'RS256' })

client
    .start({ access_token })
    .then(() => {
        console.log('type your question or hit Ctrl+D to exit')
        interact()
    })
    .catch((ex) => {
        console.error('unable to connect to EBA server:')
        console.error(`${ex}`)
        process.exit(1)
    })

rl.on('close', () => client.stop())
