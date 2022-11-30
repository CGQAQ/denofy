const fs = require("node:fs");
const _ = require("lodash");

const file = fs.readFileSync("package.json", {encoding: "utf-8"});
const json = JSON.parse(file);
const newJson = _.clone(json)

console.log(newJson);