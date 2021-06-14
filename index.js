const express = require('express')
const app = express()
const secret = "123abc"
const jwt = require('jsonwebtoken')
const cors = require('cors')
const port = process.env.PORT || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const createToken = (user) => jwt.sign(user, secret, { expiresIn: 300 })

app.get('/', (req, res) => {
  res.send("está funcionando!")
})

app.post('/login', (request, response) => {
  let { email, password } = request?.body || request?.query || request?.params
  
  response.send({
    user: { email },
    token: createToken({ email, password })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})