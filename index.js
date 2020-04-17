let express = require('express');
let pixel = require('node-pixel');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

http.listen(3001, function () {
    console.log(`server running at http://localhost:3001`);

});

let five = require('johnny-five');
let arduino = new five.Board();
let temperature;

arduino.on('ready', function () {
    console.log("arduino is running");
    temperature = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 1000
});

temperature.on('data', function () {
    io.sockets.emit('temperature', this.celsius)
});

//Neo Pixels Code

var strip = null

arduino.on('ready', function() {
    strip = new pixel.Strip({
        board: arduino,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: 4}, ],
        gamma: 2.8,
    });

    strip.on('ready', function() {
        strip.show();
        strip.color("teal");
    })
});

var led = new five.Led(6);

led.on();

// Proximity Sensors
var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 12,
    freq: 900
});

// LED
var led = new five.Led(8);

// Proximity on Data function
proximity.on("data", function() {
    var cmtr = this.cm;
    var excm = Math.floor(cmtr);
    console.log("Proximity: ");
    console.log("  cm  : ", cmtr + ' ('+excm+')');
    console.log("-----------------");
});

let cmtr = this.cm;
let exct = Math.floor(cmtr);

// Proximity on Data Change function
proximity.on("change", function() {
    // Detect if the distances below 20cm
    if (exct < 10) {
        
        led.on();          
        
    } else {
        led.off();
    }
});

proximity.on("change", function() {
    io.sockets.emit("proximity", this.cm);
})

// Servo motor initiated
var servo = new five.Servo({
    id: "FeedServo", //refer with this id
    pin: 10,
    type: "standard",
    range: [0, 90],
    fps: 200,
    invert: true,
    startAt: 90,
    center: true,
});

servo.sweep();
});
