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

chrome.runtime.onInstalled.addListener(function() {
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
});

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
                    user.changeBrowserIcon('images/extension-green-logo.png');
                    clearPreviousTabData();
                    user.sendAllTabsToServer();
                } else {
                    user.changeBrowserIcon('images/iconpurple.png');
                    user.loggedIn = false;
                }
            } else {
                user.changeBrowserIcon('images/iconpurple.png');
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
    sendAllTabsToServer() {
        for (var window in this.tabsSortedByWindow) {
            for (var tab in this.tabsSortedByWindow[window]) {
                var currentTab = this.tabsSortedByWindow[window][tab];
                var dataForServer = dataObjectForNewTab(currentTab);
                createNewTabRequest(dataForServer, currentTab.index);

            }
        }
    }
    changeBrowserIcon(imagePath) {
        chrome.browserAction.setIcon({
            path: imagePath
        })
    }
}


function createNewUser() {
    user = new User();
    chrome.windows.getAll(function (windows) {
        windows.forEach(function (window) {
            createNewWindow(window.id);
        });
    });
    getAllTabs();
    user.login();
}