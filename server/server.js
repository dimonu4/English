const fs = require("fs");
const express = require("express");

const app = express();
app.use("/", express.static("./public"));
app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.post("/api/vocabulary/", (req, res) => {
  fs.readFile("./server/db/vocabulary.json", "utf-8", (err, data) => {
    let vocabulary = JSON.parse(data);
    vocabulary.push(req.body);
    fs.writeFile( "./server/db/vocabulary.json", JSON.stringify(vocabulary), (err) => {
        if(err){
          res.send({result: 0});
        }else{
          res.send({result: 1});
        }
      }
    );
  });
});

app.post( "/api/userswords/learning/", ( req, res ) => {
  fs.readFile( "./server/db/users.json", "utf-8", ( err, data ) => {
    let currentUserId = 0; // Later it will be got from local storage
    let users = JSON.parse( data );
    users[currentUserId].learning.push(req.body);
    fs.writeFile( "./server/db/users.json", JSON.stringify(users), (err) => {
      if( err ){
        res.send({result: 0})
      } else {
        res.send({result: 1})
      }
    })
  })
})

app.get("/api/vocabulary/", (req,res)=>{
  fs.readFile('./server/db/vocabulary.json', 'utf-8', (err,data)=>{
    if(err){
      console.log(err);
    } else{
      res.send(data);
    }
  })
})

app.get("/api/userswords/", (req, res) => {
  fs.readFile( './server/db/users.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
})

app.put('/api/userswords/learning', (req, res) => {
  fs.readFile('./server/db/users.json', 'utf-8', (err, data) => {
    if(err) {
      console.log(err)
    } else {
      let currentUserId = 0; // Later it will be got from local storage
      let matchId = req.body;
      let learning = JSON.parse(data)
      let currentWord = learning[currentUserId].learning.find(el => el.id === matchId.id)
      let index = learning[currentUserId].learning.indexOf(currentWord)
      currentWord['WT'] = true;
      learning[currentUserId].learning[index] =  currentWord
      fs.writeFile('./server/db/users.json', JSON.stringify(learning),(err) => {
        if(err) res.send({result: 0})
        else res.send({result: 1})
      })
    }
  })
})