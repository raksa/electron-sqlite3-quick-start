"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("app.sqlite3");

db.serialize(() => {
    db.run("CREATE TABLE info_table (info TEXT)", e => {
        // console.error(e);
    });

    const stmt = db.prepare("INSERT INTO info_table VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Info " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM info_table", (err, row) => {
        if (err) {
            console.error(err);
        } else {
            console.log(row.id + ": " + row.info);
        }
    });
});

//db.close();