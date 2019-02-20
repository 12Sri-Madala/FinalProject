const BASE_URL = 'http://localhost:3000/'

// Chrome Alarm Listener 

chrome.alarms.onAlarm.addListener(function( alarm ) {
    console.log('alarm fired: ', alarm);

    var notificationInfo = JSON.parse(alarm.name);
    var url = notificationInfo.url;

    // Create notification

    var notifID = url + idGenerator();

    chrome.notifications.create( notifID, {
        type: 'basic',
        iconUrl: notificationInfo.icon,
        title: notificationInfo.title,
        message: notificationInfo.notes,
    });

    // Assign URL to notification click

    chrome.notifications.onClicked.addListener( function(notifID){
        chrome.windows.getCurrent(function(currentWindow){
            chrome.notifications.clear(notifID);
            // If they have a current window open, create new tab
            console.log("Current window:", currentWindow);
            debugger;
            if (currentWindow !== undefined) {
                chrome.tabs.create({
                    'url': url
                });
                return;
            } else {
            // If not, create new window
                chrome.windows.create({
                    'url': url,
                    'focused': true
                });
                return;
            }
        });
    });
      
});

function idGenerator() {
    var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
  
    var id = "";
  
    for (var i = 0; i < 10; i++) {
      var random = Math.floor(Math.random() * keys.length);
      id += keys[random];
    }
    return id;
}

function createNotification(creaseObj) {
  const id = creaseObj.id;

  chrome.notifications.create(
    id,
    {
      type: "basic",
      iconUrl: creaseObj.icon,
      title: creaseObj.title,
      message: creaseObj.notes
    },
    function(id) {}
  );

}

function launchAlarmURL(object) {
  const tabObj = {};
  tabObj.url = object.url;

  chrome.tabs.create(tabObj);
}

function createAlarm(creaseObj) {
  const reminder = new Date(creaseObj.date + " " + creaseObj.time);
  const recurrence = null;

  console.log(reminder);

  switch (creaseObj.recurrence) {
    case "monthly":
      recurrence = 43800;
      break;
    case "weekly":
      recurrence = 10080;
      break;
    case "daily":
      recurrence = 1440;
      break;
    default:
      recurrence = 0;
  }

  chrome.alarms.create(alarmName, {
    when: reminder,
    periodInMinutes: recurrence
  });
}

function getBookmarkData() {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    console.log("Hitting dumpBookmarks function", bookmarkTreeNodes);

    const postingCall = {
      method: "POST",
      url: "http://localhost:8000/auth/apiBookmarks",
      data: {
        bookmarks: JSON.stringify(bookmarkTreeNodes)
      }
    };

    $.ajax(postingCall);
  });
}

// Chrome Bookmark Listeners 

chrome.runtime.onInstalled.addListener(getBookmarkData);
chrome.bookmarks.onCreated.addListener(getBookmarkData)
chrome.bookmarks.onRemoved.addListener(getBookmarkData);
chrome.bookmarks.onChanged.addListener(getBookmarkData);
chrome.bookmarks.onMoved.addListener(getBookmarkData);
chrome.bookmarks.onChildrenReordered.addListener(getBookmarkData);
chrome.bookmarks.onImportEnded.addListener(getBookmarkData);



class User {
  constructor() {
    this.loggedIn = false;
    // this.name = '';
  }
  login() {
    if (user.loggedIn) {
      return;
    }
    chrome.cookies.get(
      {
        url: BASE_URL,
        name: COOKIE_NAME
      },
      function(cookie) {
        if (cookie) {
          console.log("Cookie from localhost3000: ", cookie);
          var date = new Date();
          var currenttime = date.getTime();
          var ifExpire = currenttime - cookie.expirationDate;
          if (ifExpire > 0) {
            user.loggedIn = true;
          } else {
            user.loggedIn = false;
          }
        } else {
          user.loggedIn = false;
        }
      }
    );
  }
  logout() {
    chrome.cookies.remove(
      {
        url: BASE_URL,
        name: COOKIE_NAME
      },
      function(result) {
        if (result.name === COOKIE_NAME) {
          if (user.loggedIn) {
            user.loggedIn = false;
            let domain = matchedTab.url.match(/localhost:3000/gi);
            if (domain) {
              chrome.tabs.reload(matchedTab.id);
            }
          }
        }
      }
    );
  }
}

// function createNewUser() {
//     user = new User();
//     user.login();
// }

// chrome.runtime.onStartup.addListener(function (details) {
//     createNewUser();
// });

// chrome.runtime.onInstalled.addListener(function (details) {
//     createNewUser();
// });

// if(!user){
//     createNewUser();
// }
