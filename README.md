## PR-DC cordova-plugin-serialusb

Cordova plugin for Android Serial USB communication. This plugin makes a connection to the external board trivial, for example, you can connect an Arduino board to an Android device and get power, storage, a high-quality touch interface and many possible ways of connecting with the rest of the world (mobile network, WiFi, Bluetooth...).

## Requirements
[Apache Cordova](https://cordova.apache.org/)<br>

This library is tested with
**Cordova Android 9.1.0**

## Installation
From the root folder of your Cordova project, run:
```
cordova plugin add https://github.com/PR-DC/cordova-plugin-serialusb.git
```

## Usage
Thanks to [usb-serial-for-android](https://github.com/mik3y/usb-serial-for-android) library, you can communicate with CDC, FTDI, Arduino and other devices.

Copy `device_filter.xml` document to `www/res/xml`.

Append the following to the project's `config.xml` document within the Android platform-specific configuration. 
```xml
<config-file parent="/manifest/application/activity[@android:name='MainActivity']" target="AndroidManifest.xml">
    <intent-filter>
        <action android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED" />
    </intent-filter>
    <meta-data
      android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED"
      android:resource="@xml/device_filter" />
</config-file>
<resource-file src="www/res/xml/device_filter.xml" target="app/src/main/res/xml/device_filter.xml" />
```

Append following preference to project's `config.xml` document.
```xml
<preference name="AndroidXEnabled" value="true" />
```

Now you can proceed with the app code, request permission to use the serial port to the system:
```js
SerialUSB.requestPermission(function success(), function error());
```
After permission is granted you can open the serial port:
```js
SerialUSB.open(opts, function success(), function error());
```
`opts` is a JSON object with the following properties:

- baudRate: defaults to 9600
- dataBits: defaults to 8
- stopBits: defaults to 1
- parity: defaults to 0
- dtr: defaults to false (it may be needed to be true for some Arduino)
- rts: defaults to false (it may be needed to be true for some modules)
- sleepOnPause: defaults to true. If false, the OTG port will remain open when the app goes to the background (or the screen turns off). Otherwise, the port automatically closes and resumes once the app is brought back to the foreground.

You're now able to read and write:
```js
SerialUSB.write(data, function success(), function error());
SerialUSB.read(function success(buffer), function error());
```
`data` is the string representation to be written to the serial port.
`buffer` is a JavaScript ArrayBuffer containing the data that was just read.

Apart from using `SerialUSB.write()`, you can also use `SerialUSB.writeHex()` to have an easy way to work with **RS232 protocol** driven hardware from your javascript by using **hex-strings**.

In a nutshell, `SerialUSB.writeHex('ff')` would write just a single byte where `SerialUSB.write('ff')` would let java write 2 bytes to the serial port.

Apart from that, `SerialUSB.writeHex()` works the same way as `SerialUSB.write()` does.

Register a callback that will be invoked when the driver reads incoming data from your serial device. The success callback function will receive an ArrayBuffer filled with the data read from serial:
```js
SerialUSB.registerReadCallback(
  function success(data){
    var view = new Uint8Array(data);
    console.log(view);
  },
  function error(){
    new Error("Failed to register read callback");
  });
```

Register a callback that will be invoked when the device is detached:
```js
SerialUSB.detached(
  function(success_message) {
    
  }, function(err) {
    console.log("Device detached!");
  }
);
```

And finally, you can also close the port with:
```js
SerialUSB.close(function success(), function error())
```

## Example with Cordova app and Arduino sketch

An example of connecting Cordova application to Arduino board is available at: https://github.com/PR-DC/PRDC_TestSerialUSB

## Change log
2021.12: [Miloš Petrašinović](https://github.com/PR-DC): renamed to cordova-plugin-serialusb (SerialUSB as in Arduino) and implemented detached event.

2018.02: [Dario Cavada](https://github.com/dariocavada): renamed to cordova-plugin-usbserial and refactory internal to follow cordova naming convention.

2015.10: [Ed. Lafargue](https://github.com/elafargue): Implemented "sleepOnPause" flag in the 'open' options to prevent closing the OTG port when app goes to background.

2014.08: [Zevero](https://github.com/zevero): Option to find device by VID and PID, that let you use "unrecognized" devices.

2014.07: [Hendrik Maus](https://github.com/hendrikmaus): Implemented writeHex for working with RS232 protocol, i.e. javascript can now pass "ff", java turns it into a 1 byte array and writes to the serial port - naturally, java, and the existing write method here, would create a 2 byte array from the input string.

2014.04: [Derek K](https://github.com/etx): Implemented registerReadCallback for evented reading and Android onPause/onResume
         
2014.03: [Ed. Lafargue](https://github.com/elafargue): Implemented read(). The success callback returns a Javascript ArrayBuffer which is the best way to handle binary data in Javascript. It is straightforward to convert this to a string if required - a utility function could be implemented in this plugin.

2013.11: [Xavier Seignard](https://github.com/xseignard): First implementation

## License
The MIT License

Copyright (c) 2021 Miloš Petrašinović PR-DC. https://pr-dc.com

Copyright (c) 2015 Xavier Seignard. http://drangies.fr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
