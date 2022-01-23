"use strict";
exports.__esModule = true;
var async_1 = require("./functions/async");
/** Application Layout */
// header, footer, side menu
/** */
(0, async_1.validateArguments)(process.argv).then(function (options) {
    console.log(options);
    (0, async_1.read)("models/".concat(options.model, ".model.ts")).then(function (buf) { return console.log(buf.toLocaleString()); });
}, function (err) { return console.log(err); });
