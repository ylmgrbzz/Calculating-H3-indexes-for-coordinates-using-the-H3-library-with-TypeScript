"use strict";
exports.__esModule = true;
exports.calculateAllH3Index = exports.getH3Index = void 0;
var h3 = require("h3-js");
var fs = require("fs");
var getH3Index = function (lat, lng, resolution) {
    return h3.latLngToCell(lat, lng, resolution);
};
exports.getH3Index = getH3Index;
var calculateAllH3Index = function (filePath) {
    var rawData = fs.readFileSync(filePath);
    var coordinates = JSON.parse(rawData.toString());
    var resolution = 5;
    var h3Indexes = coordinates.map(function (coord) {
        return (0, exports.getH3Index)(coord.lat, coord.lng, resolution);
    });
    // remove duplicates without Set
    var uniqueH3Indexes = h3Indexes.filter(function (h3Index, index) {
        return h3Indexes.indexOf(h3Index) === index;
    });
    console.log("without eliminate duplicate h3 index count:", h3Indexes.length);
    console.log("unique h3 index count:", uniqueH3Indexes.length);
};
exports.calculateAllH3Index = calculateAllH3Index;
(0, exports.calculateAllH3Index)("coordinates.json");
