$(document).ready(function() {
  $("#creaseform").submit(function(event) {
    event.preventDefault();
    $('[type=submit]').attr('disabled', 'disabled');
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
    // chrome.bookmarks.search({

    // })
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
  returnObj.id = idGenerator();
  creaseObj = returnObj;

  var ajaxConfig = {
    datatype: "json",
    url: "https://creasetabs.com/auth/addBookmarks",
    method: "Post",
    data: creaseObj,
    success: function(response) {
      console.log("Sent saved Bookmark: ", response); // ???
    },
    error: function(response){
      $('[type=submit]').removeAttr('disabled');
    }
  };

  $.ajax(ajaxConfig);
  createAlarm(creaseObj);
  return creaseObj;
}

function createAlarm(creaseObj) {

  const reminder = new Date(creaseObj.date + " " + creaseObj.time).getTime();
  let recurrence = null;


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

  if(!recurrence){
    chrome.alarms.create(JSON.stringify(creaseObj), {
      when: reminder});
    return;
  }

  chrome.alarms.create(JSON.stringify(creaseObj), {
    when: reminder, periodInMinutes: recurrence});

}

function findFavicon() {
  $("a[href^='http']").each(function() {
    $(this).append(
      '<img src="https://www.google.com/s2/favicons?domain=' + this.href + '">'
    );
  });
}
