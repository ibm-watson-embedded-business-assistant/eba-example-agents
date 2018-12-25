## External Actions

External actions you can host your agents code anywhere you want. You can use any language, any platform any scaling and HA strategies at your choice. You can host your agents along your application and use unified CI/CD pipeline if you like.

The request payload will be sent to your URL as JWT token in POST body. You can use RSA public key to verify the origin of such requests. Protocol is just the same as for hosted FaaS actions so you can use EBA [node helpers](./NodeHelpers.md).

Please find below the sample agent action code:

```
const fs = require('fs')
const jwt = require('jsonwebtoken')
const express = require('express')
const bodyBarser = require('body-parser')

let app = express()
app.use(bodyBarser.text({type: 'application/jwt'}))

// RSA publick key from Lab
let key = fs.readFileSync(...)

console.log(key)

app.post('/getSomething', (req, res) => {
    let {input} = jwt.verify(req.body, key)
    res.status(200).json({
        success: true,
        result: {
            output: {
                ':Something': { data: 'Some data' }
            }
        }
    })
})

app.listen(5000)
```
