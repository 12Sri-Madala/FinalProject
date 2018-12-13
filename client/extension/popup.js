$(document).ready(function() {
  $("#creaseform").submit(function(event) {
    event.preventDefault();
    processForm();
  });
});

// Globals
var url = null;
var title = null;
var favicon = null;
var creaseObj = null;

// Grab href, tab title and favicon for bookmarking

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.getSelected(null, function(tab) {
    var currentURL = document.createElement("a");
    var currentTitle = document.createElement("b");
    var currentFavIcon = document.createElement("IMG");
    currentFavIcon.setAttribute("src", tab.favIconUrl);
    currentFavIcon.setAttribute("width", "25");
    currentFavIcon.setAttribute("height", "25");
    currentFavIcon.setAttribute("alt", "Favicon");
    currentURL.href = tab.url;
    currentURL.innerText = tab.url;
    currentTitle = minimizeTitle(tab.title);
    currentTitle.innerText = tab.title;
    url = tab.url;
    title = tab.title;
    favicon = currentFavIcon.src;
    document.querySelector(".header-icon").append(currentFavIcon);
    document.querySelector(".header-title").append(currentTitle);
  });
});

// Consolidate website title to max 30 letters

function minimizeTitle(string) {
  var newStr = "";
  if (string.length > 30) {
    for (var i = 0; i < 30; i++) {
      newStr += string[i];
    }
    newStr += "..";
    return newStr;
  } else {
    return string;
  }
}

// ID Generator

function idGenerator() {
  var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";

  var id = "";

  for (var i = 0; i < 25; i++) {
    var random = Math.floor(Math.random() * keys.length);
    id += keys[random];
  }
  return id;
}

// Form Submition

function processForm() {
  var formArray = $("#creaseform").serializeArray();

  var returnObj = {};
  for (var i = 0; i < formArray.length; i++) {
    returnObj[formArray[i]["name"]] = formArray[i]["value"];
  }

  returnObj.title = title;
  returnObj.icon = favicon;
  returnObj.url = url;
  creaseObj = returnObj;

        var ajaxConfig = {
          datatype: 'json',
          url: 'http://localhost:8000/auth/addBookmarks',
          method: "Post",
          data: creaseObj,
          success: function (response){
            console.log("Sent saved Bookmark: ", response) // ???
          }
        }

        $.ajax(ajaxConfig)

  console.log("Bookmark/Alarm Data Object:", creaseObj);
  return creaseObj;
}

