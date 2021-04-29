function handleActivate(tab) {
  browser.cookies.get({
    url: tab.url,
    name: 'XDEBUG_TRIGGER',
  }).then((cookie) => {
    return toggleCookie(cookie, tab.url);
  });
}

function toggleCookie(cookie, url) {
  if (cookie) {
    browser.cookies.remove({
      url: url,
      name: 'XDEBUG_TRIGGER',
    }).then((cookie) => {
      browser.browserAction.setIcon({});
    });
  }
  else {
    browser.cookies.set({
      url: url,
      path: '/',
      name: 'XDEBUG_TRIGGER',
      value: '1',
    }).then((cookie) => {
      browser.browserAction.setIcon({ path: 'bug-48-active.png' });
    }).catch((e) => {
      browser.notifications.create('xdebug_trigger_set', {
        title: 'XDEBUG_TRIGGER Set',
        message: e.message,
        type: "basic"
      });
    });
  }
}

function handleTabSwitch(tabId, changeInfo, tab) {
  browser.cookies.get({
    url: tab.url,
    name: 'XDEBUG_TRIGGER',
  }).then((cookie) => {
    if (cookie) {
      browser.browserAction.setIcon({ path: 'bug-48-active.png' });
    }
    else {
      browser.browserAction.setIcon({});
    }
  });
}

browser.browserAction.onClicked.addListener(handleActivate);
browser.tabs.onUpdated.addListener(handleTabSwitch, {
  urls: [ '*://*.test/*' ],
  properties: [ 'attention' ]
})
