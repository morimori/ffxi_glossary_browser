// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');

Ti.include('data_manager.js');

// create tab group
var tabGroup = Ti.UI.createTabGroup();
var searchWin = Ti.UI.createWindow({
  url: 'search.js',
  title:'検索',
  backgroundColor:'#fff',
  orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
var searchTab = Ti.UI.createTab({
  icon: Ti.UI.iPhone.SystemIcon.SEARCH,
  title:'検索',
  window:searchWin
});
tabGroup.addTab(searchTab);

var bookmarkWin = Ti.UI.createWindow({
  url: 'bookmark.js',
  title:'ブックマーク',
  backgroundColor:'#fff',
  orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
var bookmarkTab = Ti.UI.createTab({
  icon: Ti.UI.iPhone.SystemIcon.BOOKMARKS,
  title:'ブックマーク',
  window:bookmarkWin
});

tabGroup.addTab(bookmarkTab);

var historyWin = Ti.UI.createWindow({
  url: 'history.js',
  title:'履歴',
  backgroundColor:'#fff',
  orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
var historyTab = Ti.UI.createTab({
  icon: Ti.UI.iPhone.SystemIcon.HISTORY,
  title:'履歴',
  window:historyWin
});

tabGroup.addTab(historyTab);

var infoWin = Ti.UI.createWindow({
  url: 'info.js',
  title:'このアプリについて',
  backgroundColor:'#fff',
  orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
var infoTab = Ti.UI.createTab({
  title:'About',
  window:infoWin
});

tabGroup.addTab(infoTab);

tabGroup.open();
