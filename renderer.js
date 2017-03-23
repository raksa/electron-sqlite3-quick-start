var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('app.sqlite3');
 
db.serialize(function() {
  db.run("CREATE TABLE info_table (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO info_table VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Info " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM info_table", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
//db.close();