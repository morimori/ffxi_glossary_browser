var win = Ti.UI.currentWindow;

var titleLabel = Ti.UI.createLabel({
  text: 'ヴァナ語辞典',
  textAlign: 'center',
  top: 5,
  width: 'auto',
  height: 'auto',
  font: {fontFamily: 'Helvetica', fontSize: 16, fontWeight: 'bold'},
  color: '#000000'
});

var summaryLabel = Ti.UI.createLabel({
  text: 'FF11用語辞典ブラウザ',
  textAlign: 'center',
  top: 30,
  width: 'auto',
  height: 'auto',
  font: {fontFamily: 'Helvetica', fontSize: 12},
  color: '#444444'
});

var versionLabel = Ti.UI.createLabel({
  text: 'Version ' + Ti.App.version,
  textAlign: 'center',
  top: 45,
  width: 'auto',
  height: 25,
  font: {fontFamily: 'Helvetica', fontSize: 12},
  color: '#444444'
});

var aboutRow = Ti.UI.createTableViewRow({height: 'auto', touchEnabled: false});
aboutRow.add(titleLabel);
aboutRow.add(summaryLabel);
aboutRow.add(versionLabel);

var aboutSection = Ti.UI.createTableViewSection({touchEnabled: false});
aboutSection.add(aboutRow);


var poweredBySection = Ti.UI.createTableViewSection({headerTitle: 'Powered by', touchEnabled: false});
poweredBySection.add(Ti.UI.createTableViewRow({height: 'auto', title: 'FF11用語辞典 ～ ウィンダスの仲間たち版', fontSize: 12}));
poweredBySection.add(Ti.UI.createTableViewRow({height: 'auto', title: 'Titanium Mobile', fontSize: 12}));
poweredBySection.add(Ti.UI.createTableViewRow({height: 'auto', title: 'jQuery', fontSize: 12}));

var tableView = Ti.UI.createTableView({
  data: [aboutSection, poweredBySection],
  style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

win.add(tableView);
