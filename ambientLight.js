/*
 * index.js
 * Copyright(c) 2016 Ryan Coffman
 * MIT Licensed
 */

const sensor = require('./lib/sensor');

module.exports = function(cb) {
   sensor.readALS(function(err, value, raw) {
      cb(err, {
         rawValue: raw,
         computedValue: value
      });
   });
};
