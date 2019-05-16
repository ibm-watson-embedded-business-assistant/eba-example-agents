const _ = require('lodash')
const readline = require('readline')
const eba = require('eba-client')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const chalk = require('chalk')

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// to enable programmatic access vist https://eba.ibm.com/assistant#/lab/settings

const settings = {
    // url: 'https://eba-1.adm01.com/',
    // url: 'https://eba-2.adm01.com/',
    // url: 'https://eba-3.adm01.com/',
    url: 'https://eba.ibm.com/',
    key: 'private_key.pem',
    iss: 'https://github.com',
    sub: 'osidorkin',
    name: 'Oleg Sidorkin'
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new eba.Client(settings.url)

client.on('message', message => {
    console.log(message)
})

client.on('log', text => {
    console.log(chalk.cyan(text))
})

function interact() {
    rl.question('', text => {
        client.ask(text)
        _.defer(interact)
    })
}

const claims = {
    iss: settings.iss,
    sub: settings.sub,
    name: settings.name
}

const access_token = jwt.sign(claims, fs.readFileSync(settings.key), { algorithm: 'RS256' })

client
    .start({ access_token })
    .then(() => {
        console.log('type your question or hit Ctrl+D to exit')
        interact()
    })
    .catch(ex => {
        console.error(chalk.red('unable to connect:'))
        console.error(chalk.red(`${ex}`))
        process.exit(1)
    })

rl.on('close', () => client.stop())
