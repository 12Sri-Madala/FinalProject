function createNotification(object){
    const id = object.id

    chrome.notifications.create(id, {
        type: 'basic',
        iconUrl: 'icon_128.png',
        title: object.title,
        message: object.notes
    }, function(id) {});
 
}

function launchAlarmURL(object){
    const tabObj = {};
    tabObj.url = object.url

    chrome.tabs.create( tabObj, function callback);
}

function createAlarm(object) {

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const recurrence = null;

    if (object.recurrence === 'monthly'){
        recurrence = 43800;
    } else if (object.recurrence === 'weekly'){
        recurrence = 10080;
    } else if (object.recurrence === 'daily'){
        recurrence = 1440;
    } else {
        recurrence = 0;
    }


    chrome.alarms.create(alarmName, {
      delayInMinutes: 1, periodInMinutes: recurrence});
  }