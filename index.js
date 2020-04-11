let express = require('express');
let pixel = require('node-pixel');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(3000, function () {
    console.log(`server running at http://localhost:3000`);
})

let five = require('johnny-five');
let arduino = new five.Board();
let temperature;


//let light_pin_led;
/* io.on('connection', function (light) {
    light.on('light_status', function () {
        light_pin_led.toggle();
    })
}) */

arduino.on('ready', function () {
    console.log("arduino is running");
    temperature = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 1000
});

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

// LED
var led = new five.Led(8);

// Proximity Sensors
var proximity = new five.Proximity({
    controller: 'HCSR04',
    pin: 12,
    freq: 900
});

// Proximity on Data function
proximity.on("data", function() {
    var cmtr = this.cm;
    var excm = Math.floor(cmtr);
    console.log("Proximity: ");
    console.log("  cm  : ", cmtr + ' ('+excm+')');
    console.log("-----------------");
});

// Proximity on Data Change function
proximity.on("change", function() {
    var cmtr = this.cm;
    var exct = Math.floor(cmtr);   
    // Detect if the distances below 20cm
    if (exct < 10) {
        
        led.on();          
        
    } else {
        led.off();
    }
});

    /* light_pin_led = new five.Led(13);
    light_pin_led.off(); */

temperature.on('data', function () {
    io.sockets.emit('temperature', this.celsius)
});


// Servo motor initiated
var servo = new five.Servo({
    id: "FeedServo", //refer with this id
    pin: 10,
    type: "standard",
    range: [0, 180],
    fps: 100,
    invert: false,
    startAt: 90,
    center: true,
});

servo.sweep();



});
