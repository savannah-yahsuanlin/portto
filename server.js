const express = require('express');
const { conn, seed, Asset } = require('./db');
const app = express();
const path = require('path');
app.use(express.json());

app.use('/public', express.static('public'));
app.use('/dist', express.static('dist'));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/assets', (req, res, next)=> {
  Asset.findAll()
    .then( response => res.send(response))
    .catch(next);
});


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const start = async()=> {
  try {
    await conn.sync({ force: true });
    await seed();
    const port = 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

start();

