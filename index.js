const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 4000


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const createToken = (user) => jwt.sign(user, process.env.SECRET, { expiresIn: 300 })

app.get('/', (req, res) => {
  res.send("está funcionando!")
})

app.post('/login', (request, response) => {
  let { email, password } = request?.body || request?.query || request?.params

  if (password === "abc123") {
    response.send({
      user: { email },
      token: createToken({ email, password})
    })
  } else {
    response.statusCode(401)
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})