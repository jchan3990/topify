const { authEndpoint, client_id, client_secret } = require("../spotify.js");
const redirect_uri = "http://localhost:3000/auth/callback";
const fetch = require('node-fetch');
const express = require("express");
const Parser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(Parser.json())
app.use(Parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

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

app.get('/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokenEndpoint = 'https://accounts.spotify.com/api/token'
    const payload = client_id + ":" + client_secret;
    const encodedPayload = new Buffer.from(payload).toString('base64');
    
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + encodedPayload,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
    })
    const data = await response.json();

    const urlParams = new URLSearchParams({
      access_code: data.access_token,
      refresh_token: data.refresh_token
    })

    return res.redirect('/#' + urlParams.toString());
  } catch(err) {
    res.status(400).send(err);
  }

});

app.get('/refresh_token', async (req, res) => {

  const { refresh_token } = req.query;
  const tokenEndpoint = 'https://accounts.spotify.com/api/token'
  const payload = client_id + ":" + client_secret;
  const encodedPayload = new Buffer.from(payload).toString('base64');
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + encodedPayload,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`
  })
  const data = await response.json();

});

app.get('/logout', (req, res) => {
  req.session=null;
  res.redirect('/');
});
