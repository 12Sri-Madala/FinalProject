const BASE_URL = 'http://creasetabs.com/'
const COOKIE_NAME = 'connect.sid'

class User {
    constructor() {
        this.loggedIn = false;
        // this.name = '';
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
                console.log(cookie);
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
        });
    }
    logout() {
        chrome.cookies.remove({
            url: BASE_URL,
            name: COOKIE_NAME
        }, function (result) {
            if (result.name === COOKIE_NAME) {
                if (user.loggedIn) {
                    user.loggedIn = false;
                    let domain = (matchedTab.url).match(/creasetabs.com/gi)
                    if (domain) {
                        chrome.tabs.reload(matchedTab.id);
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
