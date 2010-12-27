var template = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'container.html').read().text;

var Browser = function(id) {
  this.id = id;
  this.window = Ti.UI.createWindow({
    // title: title,
    backgroundColor: 'white',
    orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
  });
  this.window.addEventListener('close', $.proxy(function(event) {
    Ti.API.log(this.window.title + ' CLOSED');
  }, this));
  this.window.addEventListener('focus', $.proxy(function(event) {
    Ti.API.log(this.window.title + ' FOCUSED');
  }, this));
  this.window.addEventListener('blur', $.proxy(function(event) {
    Ti.API.log(this.window.title + ' BLURED');
  }, this));
  var indicator = Ti.UI.createActivityIndicator();
  this.window.setRightNavButton(indicator);
  indicator.show();
  Ti.UI.currentTab.open(this.window, {animated: true});

  this.proxy = Ti.UI.createWebView({url: 'http://wiki.ffo.jp/html/' + id + '.html'});
  this.proxy.addEventListener('load', $.proxy(this._proxyOnLoad, this));
  this.proxy.reload();
};

Browser.prototype = {
  _proxyOnLoad: function(event) {
    var yomi = this.proxy.evalJS('$("#content .title > .yomi").text();');
    var match = yomi.match(/^\((.+)\)$/);
    if (match == null) { Ti.API.log(this.proxy.html); this.proxy.reload(); }
    var read = this.proxy.evalJS('$("#content .title > .yomi").text();').match(/^\((.+)\)$/)[1];
    this.proxy.evalJS('$("#content .title > .yomi").remove();');
    this.window.title = this.proxy.evalJS('$("#content .title").text();');
    this.proxy.evalJS('$("#content .content a.edit").remove();');
    this.proxy.evalJS('$.each($("#content .content a[href]"), function(i,v){ $(v).attr({"onClick": "return clickHook(this, \'' + context + '\');"}); });');
    var browserView = Ti.UI.createWebView({html: template.replace(/<body><\/body>/, '<body>' + this.proxy.evalJS('$("#content .content").html();') + '</body>')});
    this.window.add(browserView);
    var indicator = this.window.getRightNavButton();
    indicator.hide();
    var bookmarkBtn = Ti.UI.createButton({enabled: !dm.isBookmarked(this.id), wordId: this.id, systemButton: Ti.UI.iPhone.SystemButton.BOOKMARKS});
    var win = this.window;
    bookmarkBtn.addEventListener('click', $.proxy(function(event) {
      if (this.enabled) {
        dm.addBookmark(this.wordId);

        var label = Ti.UI.createLabel({text: 'ブックマークしました', color: '#ffffff', font: {fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold'}});
        win.setToolbar([label], {animated: true});
        setTimeout(function() {
          win.setToolbar(null,{animated: true});
        }, 2500);
      }
      this.enabled = !this.enabled;
    }, bookmarkBtn));
    this.window.setRightNavButton(bookmarkBtn);
    dm.updateHistory(this.id, this.window.title, read);
    this.proxy = null;
  } 
};

Ti.App.addEventListener(context + 'LinkClick', function(event) {
  var data = event.url.match(/\/?(\d+)\.html$/);
  var browser = new Browser(data[1]);
});
