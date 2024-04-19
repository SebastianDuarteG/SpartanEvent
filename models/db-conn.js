"use strict";

const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve("database.db"), { fileMustExist: true });

function all(sql, ...params) {
    return db.prepare(sql).all(params);
}

function get(sql, ...params) {
    return db.prepare(sql).get(params);
}

function run(sql, ...params) {
    return db.prepare(sql).run(...params);
}

function prepare(sql) {
    return db.prepare(sql);
}

module.exports = {
    all,
    get,
    run,
    prepare,
};