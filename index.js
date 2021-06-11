const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const secret = "abc123456"
const port = process.env.PORT || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const createToken = (user) => jwt.sign(user, secret, { expiresIn: 300 })

app.get('/', (req, res) => {
  res.send("está funcionando!")
})

app.post('/login', (req, res) => {
  let { email, password } = req?.body || req?.query || req?.params
  console.log(req.body)
  res.send({
    user: { email },
    token: createToken({ email, password})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})