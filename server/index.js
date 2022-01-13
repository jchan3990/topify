const express = require("express");
const Parser = require('body-parser');

const app = express();
const port = 3000;

app.use(Parser.json())
app.use(Parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.get('/login', (req, res) => {
  
})
