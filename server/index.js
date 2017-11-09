const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const Mailchimp = require('mailchimp-api-v3')
const app = express()

const API_KEY = '1126b2a001aff8c872f9c6b39c52d0fd-us17'
const LIST_ID = '9c0ad13551'
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.get('/', function(req, res) {
  res.render('index.html');
})

app.post('/subscribe', (req, res) => {
  const { mail } = req.body
  const mailchimp = new Mailchimp(API_KEY)

  mailchimp.post(`lists/${LIST_ID}`, {
    members: [{
      email_address: mail,
      status: 'subscribed'
    }]
  })
  .then(result => {
    return res.send(result);
  })
  .catch(error => {
    return res.send(error)
  });
});

app.listen(PORT, function () {
  console.log('Example app listening!')
})
