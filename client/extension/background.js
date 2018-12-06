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

