const BASE_URL = 'http://localhost:3000/'

function createNotification(creaseObj){
    const id = creaseObj.id

    chrome.notifications.create(id, {
        type: 'basic',
        iconUrl: creaseObj.icon,
        title: creaseObj.title,
        message: creaseObj.notes
    }, function(id) {});
 
}

function launchAlarmURL(object){
    const tabObj = {};
    tabObj.url = object.url

    chrome.tabs.create( tabObj);
}

function createAlarm(creaseObj) {

    const reminder = new Date(creaseObj.date + " " + creaseObj.time);
    const recurrence = null;

    console.log(reminder);

    switch (creaseObj.recurrence){
        case 'monthly':
            recurrence = 43800;
            break;
        case 'weekly':
            recurrence = 10080;
            break;
        case 'daily':
            recurrence = 1440;
            break;
        default:
            recurrence = 0
    }

    chrome.alarms.create(alarmName, {
      when: reminder, periodInMinutes: recurrence});
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

// function handleCreated(id, bookmarkInfo){
//     console.log(`New bookmark ID: ${id}`);
//     console.log("New bookmark info: ", bookmarkInfo);
//     console.log(`New bookmark URL: ${bookmarkInfo.url}`);
// }

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
        this.tabsSortedByWindow = {};
        this.activeTabIndex = {};
        this.tabIds = {};
        this.name = '';
        this.photo = '';
        this.detachedTabInfo = {
            uniqueId: null
        };
    }
    login() {
        if (user.loggedIn) {
            return;
        }
        chrome.cookies.get({
            url: BASE_URL,
            name: COOKIE_NAME
        }, function (cookie) {
            if (cookie) {
                var date = new Date();
                var currenttime = date.getTime();
                var ifExpire = currenttime - cookie.expirationDate;
                if (ifExpire > 0) {
                    user.loggedIn = true;
                    // user.changeBrowserIcon('images/extension-green-logo.png');
                    // user.sendAllTabsToServer();
                } else {
                    // user.changeBrowserIcon('images/iconpurple.png');
                    user.loggedIn = false;
                }
            } else {
                // user.changeBrowserIcon('images/iconpurple.png');
                user.loggedIn = false;
            }
        });
    }
    logout() {
        chrome.cookies.remove({
            url: BASE_URL,
            name: COOKIE_NAME
        }, function (result) {
            if (result.name === COOKIE_NAME) {
                user.changeBrowserIcon('images/iconpurple.png')
                if (user.loggedIn) {
                    clearPreviousTabData();
                    user.loggedIn = false;
                    for (var window in user.tabsSortedByWindow) {
                        for (var tab in user.tabsSortedByWindow[window]) {
                            var matchedTab = user.tabsSortedByWindow[window][tab];
                            let domain = (matchedTab.url).match(/closeyourtabs.com/gi)
                            if (domain) {
                                chrome.tabs.reload(matchedTab.id);
                            }
                        }
                    }

                }
            } 
        })


    }
}

function createNewUser() {
    user = new User();
    user.login();
}