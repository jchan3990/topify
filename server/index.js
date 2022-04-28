const { authEndpoint, client_id, client_secret, cookie_secret, jwt_secret } = require("../spotify.js");
const redirect_uri = "http://localhost:3000/auth/callback";
const fetch = require('node-fetch');
const express = require("express");
const Parser = require("body-parser");
const cors = require('cors');
const session = require('cookie-session');
const csurf = require('csurf');
const jwt = require('jsonwebtoken');
const { json } = require("express/lib/response");

const app = express();
const router = express.Router();
const port = 3000;

app.use(Parser.json())
app.use(Parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.use(
  session({
    name: 'session',
    keys: [cookie_secret],
    maxAge: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: false
  })
);
app.use(csurf());

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

  const errParams = new URLSearchParams({
    error: 'invalid_token'
  });

  const sessionJWTObject = {
    token: data.access_token,
    refresh_token: data.refresh_token
  };

  req.session.jwt = jwt.sign(sessionJWTObject, jwt_secret)
  return res.redirect('/#Dashboard');
});

app.get('/auth/refresh_token', async (req, res) => {

  const { refresh_token } = jwt.decode(req.session.jwt);
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

app.get('/auth/current-session', (req, res) => {

  jwt.verify(req.session.jwt, jwt_secret, (err, decodedToken) => {
    if (err || !decodedToken) {
      res.send(false);
    } else {
      res.send(decodedToken);
    }
  });

});

app.get('/auth/logout', (req, res) => {
  req.session=null;
  return res.redirect('/');
});

app.get('/app/tracks?:time_range', async (req, res) => {
  console.log(req.params.time_range);

  const { refresh_token } = jwt.decode(req.session.jwt);
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

  const { access_token } = data;

  const query_params = new URLSearchParams({
    limit: 10,
    time_range: 'medium_term'
  })

  const t_response = await fetch('https://api.spotify.com/v1/me/top/tracks?' + query_params.toString(), {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  })
  
  const t_data = await t_response.json();
  const tracks = (t_data.items);
  res.send(tracks)

})
