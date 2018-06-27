const _ = require('lodash')
const eba = require('./eba')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var client = new eba.Client('http://localhost:9090')

rl.on('close', () => {
    client.logout()
        .then(() => { process.exit(0) })
        .catch(() => { process.exit(1) })
})

client.on('node-added', (id, node) => {
    if (node.name == 'message' && _.includes(node.tags, 'selected')) {
        const content = node.data.content 

        if (_.isString(content))
            console.log(content)

        if (_.isObject(content)) {
            console.log(content.text)
            console.log(content.name)
            console.log(content.data)
        }
    }
})

function interact() {
    rl.question('', (text) => {
        client.ask(text)
        _.defer(interact)
    })
}

client.login('remote/login')
    .then(() => {
        console.log("Type your question or hit Ctrl+D to exit")
        interact()
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })