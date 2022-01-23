"use strict";
exports.__esModule = true;
exports.read = exports.readDirectory = exports.write = exports.validateArguments = exports.argumentsToDictionary = void 0;
var env_1 = require("../env");
var graceful_fs_1 = require("graceful-fs");
var argumentsToDictionary = function (args) {
    var argsDict = {};
    args.slice(2).map(function (arg) { return arg.split(':'); }).forEach(function (arg) {
        var key = arg[0].slice(2);
        var val = arg[1];
        argsDict[key] = val;
    });
    return argsDict;
};
exports.argumentsToDictionary = argumentsToDictionary;
var validateArguments = function (args) {
    return new Promise(function (resolve, reject) {
        (0, exports.readDirectory)('models').then(function (files) {
            var models = files.map(function (f) { return f.split('.')[0]; });
            var argsDict = (0, exports.argumentsToDictionary)(args);
            // conditions
            if (!argsDict['model'])
                reject('Please provide a model name');
            else if (!(models.includes(argsDict['model'])))
                reject("".concat(argsDict['model'], " is not in ").concat(models));
            else
                resolve(argsDict['model']);
        }, function (err) { return reject(err); });
    });
};
exports.validateArguments = validateArguments;
var write = function (filename, data) {
    return new Promise(function (resolve) { return (0, graceful_fs_1.writeFile)("".concat(env_1.PATH, "/").concat(filename), data, function () { return resolve(); }); });
};
exports.write = write;
var readDirectory = function (dirName) {
    return new Promise(function (resolve, reject) {
        (0, graceful_fs_1.readdir)("".concat(env_1.PATH, "/").concat(dirName), {}, function (err, files) {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    });
};
exports.readDirectory = readDirectory;
var read = function (fileName) {
    return new Promise(function (resolve, reject) {
        (0, graceful_fs_1.readFile)("".concat(env_1.PATH, "/").concat(fileName), {}, function (err, file) {
            if (err)
                reject(err);
            else
                resolve(file);
        });
    });
};
exports.read = read;
