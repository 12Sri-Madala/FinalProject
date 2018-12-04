const express = require("express");
const mongoose = require('mongoose')
const { resolve } = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
mongoose.connect('mongodb://12Sri:EzAs12Sri@ds121624.mlab.com:21624/crease')

const app = express();
var userBase
var userBookmarks
var db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/api", (req, res) => {
  res.send("<h1>API WORKING!</h1>");
});

app.get('/bookmarks', (req, resp) => {
    userBase.findOne({ userID: req.query.userID }, (err, user) => {
        if(err) return console.log(err)
        if(user === null){
            resp.send({
                success: false,
                message: 'User not found'
            })
            return 
        }
        console.log(user)
        resp.send({
            success: true,
            data: user.bookmarks
        })
    })
})

app.post('/bookmarks', (req, resp) => {
    userBase.findOne({ userID: req.query.userID }, (err, user) => {
        if(err) return console.log(err)
        if(user === null){
            resp.send({
                success: false,
                message: 'User not found'
            })
            return 
        }
        // console.log(user)
        console.log(req.body)
        var newBookmark = new userBookmarks({
            url: req.body.url || 'google.com',
            title: req.body.title || 'some Title',
            favicon: req.body.favicon ||'sample favicon',
            notes: req.body.notes ||'your notes',
            reminderDate: req.body.reminderDate ||'1/1/2000',
            alarmTimer: req.body.alarmTimer || '(number of minutes to alarm triggering)',
          })

          newBookmark.save(function (err, bookmark) {
            user.bookmarks.push(newBookmark)
            user.save(function (err, savedUser) {
                // console.log(savedUser)
                if(err) return console.error(err);
                resp.send({
                    success: true,
                    bookmarkCount: savedUser.bookmarks.length
                })
            })
        })
    })
})

app.put('/:id/update', (req, resp) => {
  
})

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

app
  .listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
  })
  .on("error", () => {
    console.log(
      `Server listen error, Do you already have a server running on PORT: ${PORT}`
    );
  });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    

var bookmarkSchema = new mongoose.Schema({
    url: String,
    title: String,
    favicon: String,
    Notes: String,
    reminderDate: Date,
    alarmTimer: String,
  });

var usersSchema = new mongoose.Schema({
    userID: String,
    createdAt: Date,
    updatedAt: Date,
    bookmarks: [ bookmarkSchema ]
})

bookmarkSchema.methods.purrr = function(){
  var greeting = this.name
      ? `Purrr My name is ${this.name} Purrrr`
      : `I dont have a name but I'll Purrr anyway, Purrr`
  console.log(greeting);
}
    console.log('connected to db')

userBase = mongoose.model('userBase', usersSchema);
userBookmarks = mongoose.model('Sri', bookmarkSchema);

var userTemp = new userBase({
    userID: 'sri.madala19',
    createdAt: 12/3/18,
    updatedAt: 12/3/18,
})



var bookmarkTemp = new userBookmarks({
  url: 'washingtonpost.com/...',
  title: 'Drones called in to save the Great Wall',
  favicon: 'someURL',
  Notes: 'architects are using drones to repair parts of the crumbling great wall',
  reminderDate: 12/4/18,
  alarmTimer: '(number of minutes to alarm triggering)',
})

});




//do we have to make a new variable every time or can we just make a temp var 
//

// var bookmark2 = new userBookmarks({
//   url: 'facebook.com',

// })

// var bookmark3 = new userBookmarks({
//   url: 'youtube.com',

// })

// chu.purrr()
// chu.save(function (err, chu) {
//     if(err) return console.error(err);
//     chu.purrr();
// })

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })