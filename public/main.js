let socket = io.connect("http://localhost:3001");
let therm = document.querySelector("#thermometer");
let proxi = document.querySelector("#proximity");
//let button = document.querySelector("#light_button");
//let motorBtn = document.querySelector("#motorBtn");

socket.on('temperature', function (temperature) {
    // console.log(temperature);
    therm.innerHTML = temperature;
});

socket.on('proximity', function (proximity) {
    // console.log(proximity);
    proxi.innerHTML = proximity;
});

//function toggleLight(e) {
//    e.preventDefault();
//    socket.emit("down");
//    console.log('clicked');
//}

function toggleMotor(e) {
    e.preventDefault();
}

//motorBtn.addEventListener("click", toggleMotor);
//button.addEventListener("click", toggleLight);