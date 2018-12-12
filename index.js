
const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const passport = require('passport');
const cors = require("cors");
const cookieSession = require('cookie-session');
const { cookieConfig, dbConfig } = require('./config');
const cookieParser = require('cookie-parser')
module.exports = app => {
  app.use('/auth', require('./auth'));
}
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
    reminderDate: Date, //DateTime?
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
    userName: String,
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
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

// add new user endpoint (login to website) {DONE by google Oauth}

// add current bookmarks to one user endpoint (login to web site) {DONE}
// update current bookmarks from bookmark api endpoint (login to website) {Have to incorporate MERGE}

async function addBookmarksToUser(databaseUser, existingBookmarks){
  var baseFolderID=0;
  var result = await CreateBookmarks(existingBookmarks);
  databaseUser.bookmarks = result;
  await databaseUser.save();
  console.log(result);
  
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
}



app.post("/auth/apiBookmarks", (req, resp) => {

  let bookmarks = JSON.parse(req.body.bookmarks);
  console.log('2 =========== POST Bookmarks req.body.bookmarks',req.user);
    // var array = 
    addBookmarksToUser(req.user, bookmarks)
    .then(() => {
      resp.send({
        success: true,
        // message: `Bookmarks added to ${profile.emails[0].value}`
      })
    })

});
 
app.get("/auth/getBookmarks", (req, res) => {
  console.log("cookies are here" ,req.user);
  const { user } = req;

  if(!user){
    return res.status(401).send('Not authorized');
  }


  res.send({
    success: true,
    bookmarks: filterReminders(user.bookmarks)
  });
});

function filterReminders(bookmarks){
  return bookmarks.filter(bookmark => {

    if(bookmark.nested && Array.isArray(bookmark.nested.nestedBookmarks)){
      bookmark.nested.nestedBookmarks = filterReminders(bookmark.nested.nestedBookmarks);
    }

    return bookmark.reminderDate;
  });
}

// add new bookmark endpoint (extension)

app.post("/auth/addBookmarks", async (req, resp) => {
  const { user } = req;

  if (!user) {
    return resp.status(401).send({
      success: false,
      message: "Not authorized"
    });
  } 
  const bookmark = await userBookmarks.create(req.body)
  const folder = user.bookmarks[0].nested.nestedBookmarks[1];
  
  folder.nested.nestedBookmarks.push(bookmark);
  await user.save();

  resp.send({
    success: true,
    message: `Extension Bookmark added to ${user}; their bookmark list is now: ${user.bookmarks}`
  });
});

// edit current bookmarks endpoint (website) {PROBABLY SOMETHING FOR THE FUTURE, TOO MUCH TO DO FOR THIS}

// app.put("/updateBookmarks", (req, resp) => {
//   userBase.findOne({ googleId }, (err, user) => {
//     if (err) return console.log(err);
//     userBookmarks.findOneAndUpdate({ bookmarkID }).then(function(bookmarks) {
//       resp.send({
//         success: true,
//         updatedBookmarks: bookmarks
//       });
//     });
//   });
// });

// delete a reminder/bookmark {NEED HELP ON STATE IN REACT AND GETTING THE PROPER ITEM AND ITEM.ID}

app.delete("/deleteBookmarks", (req, resp) => {
  const { user } = req;

  console.log('Delete Bookmark called. User Info:', user);

  return res.send({success: 'Called deleteBookmars'});

  userBase.findOne({ googleId }, (err, user) => {
    if (err) return console.log(err);
    user.bookmarks
      .findOneAndRemove({ bookmarkID: req.query.bookmarkID }, (err, delBookmark) => {
        if (err) return console.log(err); // Would this conditional work since it only goes farther down if it doesnt hit this return statement
      })
      .then(function(bookmarks) { // what is bookmarks here
        resp.send({
          success: true,
          updatedBookmarks: bookmarks
        });
      });
      

    user.nested.nestedBookmarks
      .findOneAndRemove({ bookmarkID: req.query.bookmarkID }, (err, delBookmark) => {
        if (err) return console.log(err);
        
      })
      .then(function(bookmarks) { // what is bookmarks here
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
