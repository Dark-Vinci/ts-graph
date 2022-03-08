const config = require("config");

const db = config.get("db");

export = db;