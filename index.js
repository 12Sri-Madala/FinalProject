const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
mongoose.connect("mongodb://12Sri:EzAs12Sri@ds121624.mlab.com:21624/crease");

const app = express();
var userBase;
var userBookmarks;
var db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, "client", "dist")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/api", (req, res) => {
 res.send("<h1>API WORKING!</h1>");
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


app.get("/getBookmarks", (req, resp) => {

  userBase.findOne({ userID: req.query.userID }, (err, user) => {
    if (err) return console.log(err);
    if (user === null) {
      resp.send({
        success: false,
        message: "User not found"
      });
      return;
    }
    // console.log(user);
    resp.send({
      success: true,
      data: user.bookmarks
    });
  });
});

async function createBookmark(treeNode){
  const record = new userBookmarks ({

    bookmarkId: treeNode.id,
    url: treeNode.url,
    title: treeNode.title,
    favicon: null,
    notes: '',
    reminderDate: null,
    alarmTimer: null,
  })
  console.log(treeNode)

  await record.save()
 
  if(treeNode.hasOwnProperty('children')){
    var incrementingID = 1
    record.nested=[{
      folderID: incrementingID++,
      status: true,
      nestedBookmarks: []
    }];
 
    for(let i = 0; i < treeNode.children.length; i++){
      const childRecord = await createBookmark(node.children[i]);
      record.nested.nestedBookmarks.push(childRecord)
    }
    await record.save()
  }
  return record
 }

app.post("/postBookmarks", (req, resp) => {
  console.log('====Post Bookmarks:', req.body);
  // console.log(req.userID)
  console.log(req.body.userID)
 userBase.findOne({ userID: req.query.userID }, (err, user) => {
    if (err) return console.log(err);
    if (user === null) {
      console.log(user)
      resp.send({
        success: false,
        message: "User not found"
      });
      return;
    }
  
    createBookmark(req.body)

    console.log('POST RETURN STATEMENT');
    var newBookmark = new userBookmarks({
      url: req.body.url || "google.com",
      title: req.body.title || "some Title",
      favicon: req.body.favicon || "sample favicon",
      notes: req.body.notes || "your notes",
      reminderDate: req.body.reminderDate || "1/1/2000",
      alarmTimer:
        req.body.alarmTimer || "(number of minutes to alarm triggering)"
    });

    newBookmark.save(function(err, bookmark) {
      userBase.bookmarks.push(bookmark);
      userBase.save(function(err, savedUser) {
        // console.log(savedUser)
        if (err) return console.error(err);
        resp.send({
          success: true,
          bookmarkCount: savedUser.bookmarks.length
        });
      });
    });
  });
});

app.put("/bookmarks", (req, resp) => {
  userBase.findOne({ userID: req.query.userID }, (err, user) => {
    if (err) return console.log(err);
    userBookmarks.findOneAndUpdate({ bookmarkID }).then(function(bookmarks) {
      resp.send({
        success: true,
        updatedBookmarks: bookmarks
      });
    });
  });
});

app.delete("/bookmarks", (req, resp) => {
  userBase.findOne({ userID: req.query.userID }, (err, user) => {
    if (err) return console.log(err);
    user.nested.nestedBookmarks
      .findOneAndRemove({ bookmarkID: req.query.bookmarkID })
      .then(function(bookmarks) {
        resp.send({
          success: true,
          updatedBookmarks: bookmarks
        });
      });
  });
});

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {

  console.log("connected to db");

  var bookmarkSchema = new mongoose.Schema({
    bookmarkID: String,
    url: String,
    title: String,
    favicon: String,
    Notes: String,
    reminderDate: Date,
    alarmTimer: String
  });

  bookmarkSchema.add({
    nested: {
      status: Boolean,
      nestedBookmarks: [bookmarkSchema]
    }
  });

  var usersSchema = new mongoose.Schema({
    userID: String,
    createdAt: Date,
    updatedAt: Date,
    bookmarks: [bookmarkSchema]
  });

  userBase = mongoose.model("userBases", usersSchema);
  userBookmarks = mongoose.model("userBookmarks", bookmarkSchema);

});




//   var userTemp = new userBase({
//     userID: "sri.madala19",
//     createdAt: 12 / 3 / 18,
//     updatedAt: 12 / 3 / 18
//   });

//   var bookmarkTemp = new userBookmarks({
//     url: "washingtonpost.com/...",
//     title: "Drones called in to save the Great Wall",
//     favicon: "someURL",
//     Notes:
//       "architects are using drones to repair parts of the crumbling great wall",
//     reminderDate: 12 / 4 / 18,
//     alarmTimer: "(number of minutes to alarm triggering)"
//   });