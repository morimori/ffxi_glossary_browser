var context = 'history';

Ti.include('utils/jquery-wrapper.js', 'browser.js', 'data_manager.js');

var win = Ti.UI.currentWindow;

var tableView = Ti.UI.createTableView({rowHeight: 45, editable: true});
tableView.addEventListener('click', function(event) {
  var browser = new Browser(event.rowData.wordId);
});
tableView.addEventListener('delete', function(event) {
  dm.removeHistory(event.rowData.wordId);
});
win.add(tableView);

var clearBtn = Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.TRASH});
clearBtn.addEventListener('click', function(event) {
  var alertDialog = Titanium.UI.createAlertDialog({
    title: '履歴削除',
    message: '全て削除してよろしいですか？',
    buttonNames: ['はい', 'いいえ']
  });
  alertDialog.addEventListener('click', function(event) {
    if (event.index == 0) {
      dm.clearHistories();
      tableView.data = [];

      var label = Ti.UI.createLabel({text: '履歴を削除しました', color: '#ffffff', font: {fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold'}});
      win.setToolbar([label], {animated: true});
      setTimeout(function() {
        win.setToolbar(null,{animated: true});
      }, 2500);
    }
  });
  alertDialog.show();
});
win.setRightNavButton(clearBtn);

win.addEventListener('focus', function(event) {
  tableView.data = [];
  $.each(dm.histories('last_viewed_at DESC'), function(i,v) {
    var rowCanvas = Ti.UI.createView({
      width: 300,
      height: 44,
      backgroundColor: '#ffffff',
      opaque: 0
    });
  
    var titleLabel = Ti.UI.createLabel({
      left: 20,
      top: 3,
      width: 260,
      height: 21,
      text: v.title,
      font: {fontFamily: 'Helvetica', fontSize: 16},
      color: '#000000'
    });
    rowCanvas.add(titleLabel);
  
    var readLabel = Ti.UI.createLabel({
      left: 20,
      top: 22,
      width: 260,
      height: 17,
      text: v.read,
      font: {fontFamily: 'Helvetica', fontSize: 12},
      color: '#888888'
    });
    rowCanvas.add(readLabel);
  
    var row = Ti.UI.createTableViewRow({
      width: 320,
      height: 44,
      backgroundColor: '#ffffff',
      hasChild: true,
      wordId: v.id
    });
    row.add(rowCanvas);
  
    tableView.appendRow(row);
  });
});
