//Set initial storage value to `none` or current value if it exists
chrome.storage.local.get(
  {'bqSetting': 'none'},
  ((data) => {
    set(data['bqSetting']);
  })
);

//Set Extension Icon Title
chrome.browserAction.setTitle({
  'title': 'Toggle Notifications'
});

// Extension Button On-Click Listener
chrome.browserAction.onClicked.addListener((tab) => {
  // Get initial value (defaulting to none if does not exist)
  chrome.storage.local.get(
    {'bqSetting': 'none'},
    ((data) => {
      if (data['bqSetting'] != 'block')
        set('block');
      else
        set('none');
    })
  );
});

const set = setting => {
  // Update Storage Value
  chrome.storage.local.set({'bqSetting': setting});

  // Disabled Notifications
  if (setting == 'block') {

    // Set Chrome Setting Value
    chrome.contentSettings['notifications'].set({
      'primaryPattern': '<all_urls>',
      'setting': setting
    });

    // Update Extension Icon
    chrome.browserAction.setIcon({
      'path': {
        '38': 'muted-38.png'
      }
    });
  }

  // Enabled Notifications
  else {
    chrome.contentSettings['notifications'].clear({});
    chrome.browserAction.setIcon({
      'path': {
        '38': 'unmuted-38.png'
      }
    });
  }
}
