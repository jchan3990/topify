const { authEndpoint, client_id, client_secret } = require("../spotify.js");
const redirect_uri = "http://localhost:3000/auth/callback";
const fetch = require('node-fetch');

const express = require("express");
const Parser = require("body-parser");

const app = express();
const port = 3000;

app.use(Parser.json())
app.use(Parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.get('/auth/login', (req, res) => {

  const scope = 'user-read-private%20user-top-read';

  const auth_query_params = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri
  })

  res.redirect(`${authEndpoint}` + auth_query_params.toString());

});

app.get('/auth/callback', (req, res) => {

  const code = req.query.code;
  console.log(code);
  const tokenEndpoint = 'https://accounts.spotify.com/api/token'
  const payload = client_id + ":" + client_secret;
  const encodedPayload = new Buffer.from(payload).toString('base64');
  
  fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + encodedPayload,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

});


