const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { cookieConfig, dbConfig } = require("./config");
const cookieParser = require("cookie-parser");
// module.exports = app => {
//   app.use('/auth', require('./auth'));
// }
const PORT = process.env.PORT || 8000;

mongoose.connect(
  dbConfig.connect,
  {
    useNewUrlParser: true
  }
);

const app = express();
var userBase;
var userBookmarks;
var userReminders;
var db = mongoose.connection;

db.once("open", function() {
  console.log("connected to db");

  var bookmarkSchema = new mongoose.Schema({
    bookmarkID: Number,
    url: String,
    title: String,
    icon: String,
  });

  var reminderSchema = new mongoose.Schema({
    bookmarkID: Number,
    url: String,
    title: String,
    icon: String,
    notes: String,
    date: String,
    time: String,
    recurrence: String
  })

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
    bookmarks: [bookmarkSchema],
    reminders: [reminderSchema]
  });

  userBase = mongoose.model("userbases", usersSchema);
  userBookmarks = mongoose.model("userBookmarks", bookmarkSchema);
  userReminders = mongoose.model("userReminders", reminderSchema)

  require("./services/passport");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieConfig.secret]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, "client", "dist")));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
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

require("./routes")(app);

app.get("/api", (req, res) => {
  res.send("<h1>API WORKING!</h1>");
});

app
  .listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
  })
  .on("error", e => {
    console.log("Listen Error:", e);
    console.log(
      `Server listen error, Do you already have a server running on PORT: ${PORT}`
    );
  });

function findFavicon(url) {
  if (url === undefined) {
    const faviconURL = `https://www.google.com/s2/favicons?domain=https://google.com`;
    return faviconURL;
  }
  let faviconURL = `https://www.google.com/s2/favicons?domain=${url}`;
  return faviconURL;
}

// add new user endpoint (login to website) {DONE by google Oauth}

// add current bookmarks to one user endpoint (login to web site) {DONE}
// update current bookmarks from bookmark api endpoint (login to website) {Have to incorporate MERGE}

async function addBookmarksToUser(databaseUser, existingBookmarks) {
  var baseFolderID = 0;
  var result = await CreateBookmarks(existingBookmarks);
  databaseUser.bookmarks = result;
  await databaseUser.save();
  console.log(result);

  async function CreateBookmarks(array) {
    const newArray = array.map(async item => {
      if (item.hasOwnProperty("children")) {
        // console.log('INSIDE ',item.children)
        const userBookmarkParent = {
          bookmarkID: item.id,
          url: item.url,
          title: item.title,
          icon: findFavicon(item.url),
          nested: {
            folderID: ++baseFolderID,
            status: true
          }
        };
        userBookmarkParent.nested.nestedBookmarks = await CreateBookmarks(
          item.children
        );

        const record = new userBookmarks(userBookmarkParent);
        //console.log('Inside IF statement (nested bookmark)', record.nested.nestedBookmarks);

        await record.save();
        // record.nested.nestedBookmarks.push(
        return record;
      } else {
        const record = new userBookmarks({
          bookmarkId: item.id,
          url: item.url,
          title: item.title,
          icon: findFavicon(item.url),
        });
        console.log("Post IF statement (not nested)", record);
        await record.save();
        return record;
      }
    });
    for (let i = 0; i < newArray.length; i++) {
      newArray[i] = await newArray[i];
    }
    // console.log(JSON.stringify(newArray))
    return newArray;
  }
}

app.post("/auth/apiBookmarks", (req, resp) => {
  let bookmarks = JSON.parse(req.body.bookmarks);
  console.log("2 =========== POST Bookmarks req.body.bookmarks", req.user);
  var array =
  addBookmarksToUser(req.user, bookmarks).then(() => {
    resp.send({
      success: true
      // message: `Bookmarks added to ${profile.emails[0].value}`
    });
  });
});

app.get("/auth/getBookmarks", (req, res) => {
  console.log("cookies are here", req.user);
  const { user } = req;

  if (!user) {
    return res.status(401).send("Not authorized");
  }

  res.send({
    success: true,
    bookmarks: user.bookmarks,
    reminders: findWithReminders(user.reminders)
  });
});

function findWithReminders(bookmarks, reminders = []) {
  for (let i = 0; i < bookmarks.length; i++) {
    const bm = bookmarks[i];
    if (bm.nested && bm.nested.nestedBookmarks) {
      findWithReminders(bm.nested.nestedBookmarks, reminders);
    }

    if (bm.time) {
      reminders.push({ ...bm.toObject(), nested: null });
    }
  }

  return reminders;
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

  const reminder = await userReminders.create(req.body);

  user.reminders.push(reminder);
  await user.save();

  resp.send({
    success: true,
    message: `Extension Bookmark added to ${user}; their reminder list is now: ${
      user.reminders
    }`
  });
});

// delete a reminder/bookmark {NEED HELP ON STATE IN REACT AND GETTING THE PROPER ITEM AND ITEM.ID}

app.delete("/auth/deleteBookmarks", (req, resp) => {
  const { user: {googleId}, body: { reminder: _id } } = req;

  // console.log("Delete Bookmark called. body Info:", body);
  // console.log("Delete Bookmark called. User Info:", googleId);

  // userReminders.findOne({_id}, (err, reminder) => {
  //   console.log('Reminders:', reminder);
  // });
  
  userBase.findOne({ googleId }, (err, user) => {
      if (err) return console.log(err);
      console.log("Inside findOne function", user);

      userBase.update(
        { _id: _id },
        { $pull }
      )
        // .findOneAndDelete(
        //   { _id: _id })
        // .then( response => {
        //     console.log("Response from find one and delete function",response)
        //   })
        // .catch( err => {
        //   console.log("Error from frind one and delete",err)
        // })
        // .then(function(bookmarks) {
        //   // what is bookmarks here
        //   resp.send({
        //     success: true,
        //     updatedBookmarks: bookmarks
        //   });
        // });
    });
  return resp.send({ success: "Called deleteBookmarks" });

});

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
});

db.on("error", console.error.bind(console, "connection error:"));
