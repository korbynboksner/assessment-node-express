const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch(err) {
    next(err);
  }
});



app.listen(3000, function(){
  console.log('App on port 3000');
});
