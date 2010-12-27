var context = 'search';

Ti.include('utils/jquery-wrapper.js', 'browser.js', 'data_manager.js');

var win = Ti.UI.currentWindow;

var searchForm = Ti.UI.createSearchBar({
  showCancel: true,
  height: 44,
  top: 0
});
win.add(searchForm);

var tableView = Ti.UI.createTableView({
  rowHeight: 45,
  top: 44
});
tableView.addEventListener('click', function(event) {
  var browser = new Browser(event.rowData.wordId);
});
win.add(tableView);

function addResultRow(id, title, read) {
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
    text: title,
    font: {fontFamily: 'Helvetica', fontSize: 16},
    color: '#000000'
  });
  rowCanvas.add(titleLabel);

  var readLabel = Ti.UI.createLabel({
    left: 20,
    top: 22,
    width: 260,
    height: 17,
    text: read,
    font: {fontFamily: 'Helvetica', fontSize: 12},
    color: '#888888'
  });
  rowCanvas.add(readLabel);

  var row = Ti.UI.createTableViewRow({
    width: 320,
    height: 44,
    backgroundColor: '#ffffff',
    hasChild: true,
    wordId: id
  });
  row.add(rowCanvas);

  tableView.appendRow(row);
}

searchForm.addEventListener('return', function(event) {
  var indicator = Ti.UI.createActivityIndicator();
  win.setRightNavButton(indicator);
  indicator.show();
  var proxy = Ti.UI.createWebView();
  var callback = function(event) {
    proxy.removeEventListener('load', callback);
    indicator.hide();
    win.setRightNavButton(null);
    var editList = proxy.evalJS('$("#content .editlist").html();');
    if (editList != '') {
      var id = editList.match(/wiki\.cgi\?.*?id=(\d+)/)[1];
      var read = proxy.evalJS('$("#content .title > .yomi").text();').match(/^\((.+)\)$/)[1];
      proxy.evalJS('$("#content .title > .yomi").remove();');
      var title = proxy.evalJS('$("#content .title").text();');
      addResultRow(id, title, read);
      browser.open(id);
    } else {
      var result = proxy.evalJS('$("#content ul").html();');
      if (result == '') { return; }
      $.each(result.replace(/<li>/g, '').replace(/\n/g, '').split('</li>'), function(index, value) {
        var data = value.match(/^<a href="http:\/\/wiki\.ffo\.jp\/html\/(\d+)\.html">([^<]+)<\/a> \/ (.+)$/);
        if (data) { addResultRow(data[1], data[2], data[3]); }
      });
    }
  };
  tableView.data = [];
  proxy.addEventListener('load', callback);
  proxy.url = 'http://wiki.ffo.jp/search.cgi?CCC=愛&Command=Search&qf=' + searchForm.value + '&order=match&ffotype=title&type=title';
  proxy.reload();
  searchForm.blur();
});

searchForm.addEventListener('cancel', function(event) {
  searchForm.blur();
});
