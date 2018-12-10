const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const passport = require('passport');
const cors = require("cors");
const cookieSession = require('cookie-session');
const { cookieConfig, dbConfig } = require('./config');
const PORT = process.env.PORT || 8000;

mongoose.connect(dbConfig.connect, {
  useNewUrlParser: true
});

const app = express();
var userBase;
var userBookmarks;
var db = mongoose.connection;

db.once("open", function () {

  console.log("connected to db");

  var bookmarkSchema = new mongoose.Schema({
    bookmarkID: Number,
    url: String,
    title: String,
    favicon: String,
    Notes: String,
    reminderDate: Date,
    alarmTimer: String
  });

  bookmarkSchema.add({
    nested: {
      folderID: Number,
      status: Boolean,
      nestedBookmarks: [bookmarkSchema]
    }
  });

  var usersSchema = new mongoose.Schema({
    googleId: String,
    createdAt: Date,
    updatedAt: Date,
    bookmarks: [bookmarkSchema]
  });

  userBase = mongoose.model("userbases", usersSchema);
  userBookmarks = mongoose.model("userBookmarks", bookmarkSchema);

  require('./services/passport');
});

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [cookieConfig.secret]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(resolve(__dirname, "client", "dist")));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

require('./routes')(app);

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

function findFavicon(url){
    if(url === undefined){
      const faviconURL=`https://www.google.com/s2/favicons?domain=https://google.com`
      return faviconURL
    }  
    let faviconURL = `https://www.google.com/s2/favicons?domain=${url}`
    return faviconURL
}

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

// async function createBookmark(treeNode){
//   console.log(treeNode)
  
//   for (i=0; i<treeNode.bookmarks[0][children].length; i++){ // i stands for root directory of bookmark API object
    
//     for (x = 0; x<treeNode.bookmarks[0][children][i][children].length; x++){ // x stands for inner bookmarks from root
//       const record = new userBookmarks ({
//         bookmarkId: treeNode.bookmarks[0][children][i][children][x][id],
//         url: treeNode.bookmarks[0][children][i][children][x][url],
//         title: treeNode.bookmarks[0][children][i][children][x][title],
//         index: treeNode.bookmarks[0][children][i][children][x][index],
//         parentId: treeNode.bookmarks[0][children][i][children][x][parentId],
//         favicon: findFavicon(treeNode.bookmarks[0][children][i][children][x][url]),
//         notes: '',
//         reminderDate: null,
//         alarmTimer: null,
//       })

//       await record.save();
      
//       if(treeNode.bookmarks[0][children][i][children][x].length>1){
//         record.nested=[{
//           folderID: incrementingID++,
//           status: true,
//           nestedBookmarks: []
//         }];

//         const childRecord = await createBookmark(treeNode.children[i]);
//         record.nested.nestedBookmarks.push(childRecord)
//       }
//     }
//   }
 
//     for(let i = 0; i < treeNode.children.length; i++){
//       const childRecord = await createBookmark(treeNode.children[i]);
//       record.nested.nestedBookmarks.push(childRecord)
//     }
//     await record.save()
//   }
  // return record

async function addBookmarksToUser(databaseUser, existingBookmarks){
  var result = await CreateBookmarks(existingBookmarks);
  databaseUser.bookmarks = result;
  await databaseUser.save();
  console.log(result);
  // result[0].then(function(){
  //   console.log('got promise', arguments);
  //   // debugger;
  //   databaseUser.bookmarks = result;
  //   databaseUser.save();
  // })
}

var baseFolderID=0;
async function CreateBookmarks(array){
  const newArray = array.map( async item => {
    if(item.hasOwnProperty('children')){
      // console.log('INSIDE ',item.children)
      const userBookmarkOptions = {
        bookmarkId: item.id,
        url: item.url,
        title: item.title,
        favicon: findFavicon(item.url),
        parentId: item.parentId,
        notes: '',
        reminderDate: null,
        alarmTimer: null,
        nested: {
          folderID: ++baseFolderID,
          status: true,
        }
      };
      userBookmarkOptions.nested.nestedBookmarks = await CreateBookmarks(item.children);

      const record = new userBookmarks(userBookmarkOptions);
      //console.log('Inside IF statement (nested bookmark)', record.nested.nestedBookmarks);

      await record.save();
      // record.nested.nestedBookmarks.push(
      return record;
    } else {
      const record = new userBookmarks ({
        bookmarkId: item.id,
        url: item.url,
        title: item.title,
        favicon: findFavicon(item.url),
        notes: '',
        reminderDate: null,
        alarmTimer: null,      
      })
      console.log('Post IF statement (not nested)', record)
      await record.save();
      return record;
    }
  });
  for (let i = 0; i < newArray.length; i++){
    newArray[i] = await newArray[i];
  }
        // console.log(JSON.stringify(newArray))
  return newArray;
}

// var incrementingFolderID = 1
// function createBookmarks(array){
//   array.map( item => {
//     const record = new userBookmarks ({

//     bookmarkId: item.id,
//     url: item.url,
//     title: item.title,
//     favicon: findFavicon(item.url),
//     notes: '',
//     reminderDate: null,
//     alarmTimer: null,
//   })

//   console.log('Pre IF statement (not nested)', record);

//     if(item.hasOwnProperty('children')){
//       record.nested={
//         folderID: incrementingFolderID++,
//         status: true,
//         nestedBookmarks: []
//       };
//       for (let childIndex=0; childIndex<item.children.length; childIndex++ ){
//         const childRecord = await createBookmarks(item.children[childIndex]);
//         record.nested.nestedBookmarks.push(childRecord)
//       }
//       console.log('Inside IF statement (nested bookmark)', record)
      
//     }
//     return record
//   })
// }

app.post("/addExistingBookmarks", (req, resp) => {
  // console.log('====Post Bookmarks:', req.body);
  console.log("1", req.body.userID)
  let { userID } = req.body;
  let bookmarks = JSON.parse(req.body.bookmarks);
  console.log('2 req.body.bookmarks',bookmarks);

  if(!userID){
    return res.status(422).send('No user id provided');
  } 
  
  userID = userID.toLowerCase();
  
 userBase.findOne({ userID }, (err, user) => {
    console.log("2",user)

    if (err) return console.log(err);
    if (user === null) {
      console.log("3",user)
      resp.send({
        success: false,
        message: "User not found"
      });
      return;
    }
    
    var array = addBookmarksToUser(user, bookmarks)
    .then(() => {
      resp.send({
        succes: true,
        message: `Bookmarks added to ${userID}`
      })
    })
  });
});

app.post('/newBookmark', (req, resp) => {

  // var newBookmark = new userBookmarks({
  //   url: req.body.url || "google.com",
  //   title: req.body.title || "some Title",
  //   favicon: req.body.favicon || findFavicon(),
  //   notes: req.body.notes || "your notes",
  //   reminderDate: req.body.reminderDate || "12/12/2121",
  //   alarmTimer:
  //     req.body.alarmTimer || "(number of minutes to alarm triggering)"
  // });

  // newBookmark.save(function(err, bookmark) {
  //   userBase.bookmarks.push(bookmark);
  //   userBase.save(function(err, savedUser) {
  //     console.log(savedUser)
  //     if (err) return console.error(err);
  //     resp.send({
  //       success: true,
  //       bookmarkCount: savedUser.bookmarks.length
  //     });
  //   });
  // });
})

app.put("/updatebookmarks", (req, resp) => {
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

app.delete("/deletebookmarks", (req, resp) => {
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

var sampleData = [
      {
        dateAdded: 1507836498658,
        dateGroupModified: 1544228099968,
        id: "1",
        index: 0,
        parentId: "0",
        folderId: "1", // Trying to Add
        title: "Bookmarks Bar",
        children: [
              {
                dateAdded: 1544228092591,
                id: "164",
                index: 0,
                parentId: "1",
                title: "52 Of The Most Common Myths and Misconceptions Debunked In One Infographic | IFLScience",
                url: 'http://www.iflscience.com/editors-blog/52-common-myths-and-misconceptions-debunked/',
                favicon: 'url',       // Trying to Add
                Notes: '',            // Trying to Add
                reminderDate: null,   // Trying to Add
                alarmTimer: null      // Trying to Add
              }, 
              {
                dateAdded: 1544228099968,
                id: "165",
                index: 1,
                parentId: "1",
                title: "The Rise of Tech-Enabled Middlemen – Medium",
                url: 'https://medium.com/@epeckham/the-rise-of-tech-enabled-middlemen-5d95a4dc3b82#.m6hhmnjp8',
                favicon: 'url',     // Trying to Add
                Notes: '',          // Trying to Add
                reminderDate: null, // Trying to Add
                alarmTimer: null    // Trying to Add
              }
          ]
      },
      {
        dateAdded: 1507836498658,
        dateGroupModified: 1544228092591,
        id: "2",
        index: 1,
        parentId: "0",
        folderId: "2",    // Trying to Add
        title: "Other Bookmarks",
        children: [
            {
              dateAdded: 1462134914607,
              id: "6",
              index: 0,
              parentId: "2",
              title: "Harry Foundalis - The Bongard Problems",
              url: "http://www.foundalis.com/res/diss_research.html",
              favicon: 'url',       // Trying to Add
              Notes: '',            // Trying to Add
              reminderDate: null,   // Trying to Add
              alarmTimer: null      // Trying to Add
            },
            {
              dateAdded: 1462134914608,
              id: "7",
              index: 1,
              parentId: "2",
              title: "SparkNotes: Crime and Punishment",
              url: "http://www.sparknotes.com/lit/crime/",
              favicon: 'url',       // Trying to Add
              Notes: '',            // Trying to Add
              reminderDate: null,   // Trying to Add
              alarmTimer: null      // Trying to Add
            }
        ]
      }
    ]

