var DataManager = function() {
  this.db = Ti.Database.open('data.db');
  this.db.execute('CREATE TABLE IF NOT EXISTS histories (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, read VARCHAR(255) NOT NULL, last_viewed_at INTEGER NOT NULL, view_count INTEGER NOT NULL);');
  this.db.execute('CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, read VARCHAR(255) NOT NULL, last_viewed_at INTEGER NOT NULL, view_count INTEGER NOT NULL);');
};

DataManager.prototype = {
  histories: function(order) {
    var rs = this.db.execute('SELECT id, title, read, last_viewed_at, view_count FROM histories ORDER BY ' + order);
    var result = [];
    if (rs.rowCount > 0) {
      var record;
      do {
        result.push({
          id:              rs.fieldByName('id'),
          title:           rs.fieldByName('title'),
          read:            rs.fieldByName('read'),
          last_visited_at: rs.fieldByName('last_viewed_at'),
          view_count:      rs.fieldByName('view_count')
        });
      } while (rs.next());
    }
    rs.close();
    return result;
  },
  updateHistory: function(id, title, read) {
    var rs = this.db.execute('SELECT id FROM histories WHERE id = ? LIMIT 1', id);
    if (rs.rowCount == 0) {
      rs.close();
      this.db.execute("INSERT INTO histories VALUES (?, ?, ?, strftime('%s','now'), ?)", id, title, read, 1);
    } else {
      rs.close();
      this.db.execute("UPDATE histories SET last_viewed_at = strftime('%s','now'), view_count = view_count + 1 WHERE id = ?", id);
    }
  },
  removeHistory: function(id) {
    this.db.execute('DELETE FROM histories WHERE id = ?', id);
  },
  clearHistories: function() {
    this.db.execute('DELETE FROM histories');
  },

  bookmarks: function() {
    var rs = this.db.execute('SELECT id, title, read FROM bookmarks ORDER BY title');
    var result = [];
    if (rs.rowCount > 0) {
      var record;
      do {
        result.push({
          id:    rs.fieldByName('id'),
          title: rs.fieldByName('title'),
          read:  rs.fieldByName('read')
        });
      } while (rs.next());
    }
    rs.close();
    return result;
  },
  addBookmark: function(id) {
    this.db.execute('INSERT INTO bookmarks SELECT * FROM histories WHERE id = ?', id);
  },
  removeBookmark: function(id) {
    this.db.execute('DELETE FROM bookmarks WHERE id = ?', id);
  },
  isBookmarked: function(id) {
    var rs = this.db.execute('SELECT id FROM bookmarks WHERE id = ? LIMIT 1', id);
    var count = rs.rowCount;
    rs.close();
    return count == 1;
  }
};

var dm = new DataManager();
