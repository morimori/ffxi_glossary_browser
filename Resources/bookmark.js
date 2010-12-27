var context = 'bookmark';

Ti.include('utils/jquery-wrapper.js', 'browser.js', 'data_manager.js');

var win = Ti.UI.currentWindow;

var tableView = Ti.UI.createTableView({rowHeight: 45, editable: true});
tableView.addEventListener('click', function(event) {
  var browser = new Browser(event.rowData.wordId);
});
tableView.addEventListener('delete', function(event) {
  dm.removeBookmark(event.rowData.wordId);
});
win.add(tableView);

win.addEventListener('focus', function(event) {
  tableView.data = [];
  $.each(dm.bookmarks(), function(i,v) {
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
