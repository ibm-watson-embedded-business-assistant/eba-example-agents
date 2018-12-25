The request payload will be sent to your URL as JWT token in POST body. You can use RSA public key to verify the origin of such requests. Protocol is just the same as for hosted FaaS actions so you can use EBA helpers package https://www.eba.ai/docs/lab/NodeHelpers.html.

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
