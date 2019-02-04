## External Runtime

External actions allow you host your agents code outside of EBA. You can use any language, any platform any scaling and high availability strategies at your choice. You can host your agents along your application and use unified CI/CD pipeline if you like.

The request payload will be sent to your URL as JWT token in POST body. You can use RSA public key to verify the origin of such requests. Protocol is the same as for hosted FaaS actions so you can use EBA [node helpers](./NodeHelpers.md) to parse input and form result.

Please find below the sample agent action code:

```
npm install git+https://github.com/ibm-watson-embedded-business-assistant/eba-node-agent.git
```

```
const fs = require('fs')
const jwt = require('jsonwebtoken')
const express = require('express')
const bodyBarser = require('body-parser')
const eba = require('eba-node-agent')

// RSA public key from EBA Lab
let key = fs.readFileSync('public.pem')

let app = express()
app.use(bodyBarser.text({type: 'application/jwt'}))

app.post('/getSomething', (req, res) => {
    let params = jwt.verify(req.body, key)
    res.json({
        success: true,
        result: new eba.Result().setData(':Something', 42)
    })
})

app.listen(process.env.PORT || 5000)
```
