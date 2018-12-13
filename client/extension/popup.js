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
  returnObj.id = idGenerator();
  creaseObj = returnObj;

  // $(".addBookmark", {
  //   on: {
  //     click: function(){
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
  //     },
  //   }
  // });

  console.log("Bookmark/Alarm Data Object:", creaseObj);
  return returnObj;
}

// Search the bookmarks when entering the search keyword.
$(function() {
  $("#search").change(function() {
    $("#bookmarks").empty();
    dumpBookmarks($("#search").val());
  });
});

// Traverse the bookmark tree, and print the folder and nodes.
// function dumpBookmarks(query) {
//   var bookmarkTreeNodes = chrome.bookmarks.getTree(
//     function(bookmarkTreeNodes) {

//       console.log("Hitting dumpBookmarks function", bookmarkTreeNodes)

//       const postingCall = {
//         method: 'POST',
//         url: 'http://localhost:8000/auth/apiBookmarks',
//         data: {
//           bookmarks: JSON.stringify(bookmarkTreeNodes)
//         }
//       }
//     // should only be run once when the user is logged in, but in the background (no need to interact with the extension)
//     // can we trigger an api call from our website to our extension that happens when the user logs in? 
//       $.ajax(postingCall);

//     });
// }

  
function dumpNode(bookmarkNode, query) {
  if (bookmarkNode.title) {
    if (query && !bookmarkNode.children) {
      if (String(bookmarkNode.title).indexOf(query) == -1) {
        return $("<span></span>");
      }
    }
    var anchor = $("<a>");
    anchor.attr("href", bookmarkNode.url);
    anchor.text(bookmarkNode.title);
    /*
     * When clicking on a bookmark in the extension, a new tab is fired with
     * the bookmark url.
     */
    anchor.click(function() {
      chrome.tabs.create({ url: bookmarkNode.url });
    });
    var span = $("<span>");
    var options = bookmarkNode.children
      ? $('<span>[<a href="#" id="addlink">Add</a>]</span>')
      : $(
          '<span>[<a id="editlink" href="#">Edit</a> <a id="deletelink" ' +
            'href="#">Delete</a>]</span>'
        );
    var edit = bookmarkNode.children
      ? $(
          "<table><tr><td>Name</td><td>" +
            '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
            "</td></tr></table>"
        )
      : $("<input>");
    // Show add and edit links when hover over.
    span
      .hover(
        function() {
          span.append(options);
          $("#deletelink").click(function() {
            $("#deletedialog")
              .empty()
              .dialog({
                autoOpen: false,
                title: "Confirm Deletion",
                resizable: false,
                height: 140,
                modal: true,
                overlay: {
                  backgroundColor: "#000",
                  opacity: 0.5
                },
                buttons: {
                  "Yes, Delete It!": function() {
                    chrome.bookmarks.remove(String(bookmarkNode.id));
                    span.parent().remove();
                    $(this).dialog("destroy");
                  },
                  Cancel: function() {
                    $(this).dialog("destroy");
                  }
                }
              })
              .dialog("open");
          });
          $("#addlink").click(function() {
            $("#adddialog")
              .empty()
              .append(edit)
              .dialog({
                autoOpen: false,
                closeOnEscape: true,
                title: "Add New Bookmark",
                modal: true,
                buttons: {
                  Add: function() {
                    chrome.bookmarks.create({
                      parentId: bookmarkNode.id,
                      title: $("#title").val(),
                      url: $("#url").val()
                    });
                    $("#bookmarks").empty();
                    $(this).dialog("destroy");
                    window.dumpBookmarks();
                  },
                  Cancel: function() {
                    $(this).dialog("destroy");
                  }
                }
              })
              .dialog("open");
          });
          $("#editlink").click(function() {
            edit.val(anchor.text());
            $("#editdialog")
              .empty()
              .append(edit)
              .dialog({
                autoOpen: false,
                closeOnEscape: true,
                title: "Edit Title",
                modal: true,
                show: "slide",
                buttons: {
                  Save: function() {
                    chrome.bookmarks.update(String(bookmarkNode.id), {
                      title: edit.val()
                    });
                    anchor.text(edit.val());
                    options.show();
                    $(this).dialog("destroy");
                  },
                  Cancel: function() {
                    $(this).dialog("destroy");
                  }
                }
              })
              .dialog("open");
          });
          options.fadeIn();
        },
        // unhover
        function() {
          options.remove();
        }
      )
      .append(anchor);
  }
  var li = $(bookmarkNode.title ? "<li>" : "<div>").append(span);
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children, query));
  }
  return li;
}

function findFavicon() {
  $("a[href^='http']").each(function() {
    $(this).append(
      '<img src="https://www.google.com/s2/favicons?domain=' + this.href + '">'
    );
  });
}

document.addEventListener("DOMContentLoaded", function() {
  dumpBookmarks();
});
