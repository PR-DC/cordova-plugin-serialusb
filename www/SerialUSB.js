// cordova-plugin-serialusb - SerialUSB.js
// Author: Milos Petrasinovic <mpetrasinovic@prdc.rs>
// PR-DC, Republic of Serbia
// info@pr-dc.com
// --------------------

var exec = require('cordova/exec');

var SerialUSB = {
    requestPermission: function(opts, successCallback, errorCallback) {
        if (typeof opts === 'function') {  // user did not pass opts
          errorCallback = successCallback;
          successCallback = opts;
          opts = {};
        }
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'requestPermission',
            [{'opts': opts}]
        );
    },
    open: function(opts, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'openSerial',
            [{'opts': opts}]
        );
    },
    write: function(data, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'writeSerial',
            [{'data': data}]
        );
    },
    writeHex: function(hexString, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'writeSerialHex',
            [{'data': hexString}]
        );
    },
    writeBytes: function(buffer, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'writeSerialBytes',
            [{'data': buffer}]
        );
    },
    read: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'readSerial',
            []
        );
    },
    close: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'closeSerial',
            []
        );
    },
    registerReadCallback: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'registerReadCallback',
            []
        );
    },
    detached: function (successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'SerialUSB',
            'detached',
            []
        );
    }

};
module.exports = SerialUSB;

